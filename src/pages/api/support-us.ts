export const prerender = false;
import type { APIRoute } from 'astro';

import { gql, GraphQLClient } from 'graphql-request';
export const POST: APIRoute = async ({ request }) => {
  const requiredFields = [
    'firstName',
    'lastName',
    'email',
    'streetAddress',
    'city',
    'postalCode',
    'country',
    'iban',
    'contribution',
  ];

  console.log(import.meta.env.TWENTY_GRAPHQL_URL);
  const graphQLClient = new GraphQLClient(import.meta.env.TWENTY_GRAPHQL_URL, {
    headers: {
      Authorization: 'Bearer ' + import.meta.env.TWENTY_AUTH,
      'Content-Type': 'application/json',
    },
  });
  try {
    console.log(request.body);
    const data = await request.formData();
    console.log('Data: ', data);

    // Check if any required fields are missing
    const missingFields = requiredFields.filter((field) => data.get(field) === null);
    if (missingFields.length > 0) {
      return new Response(
        JSON.stringify({
          fields: missingFields,
          message: 'Missing required field(s)',
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
          status: 400,
        },
      );
    }

    const bic = data.get('bic');
    const personData = {
      adresse: {
        addressCity: data.get('city'),
        addressCountry: data.get('country'),
        addressPostcode: data.get('postalCode'),
        addressStreet1: data.get('streetAddress'),
      },
      emails: { primaryEmail: data.get('email') },
      name: { firstName: data.get('firstName'), lastName: data.get('lastName') },
    };

    const fordermitgliedschaftData = {
      fullName: { firstName: data.get('firstName'), lastName: data.get('lastName') },
      iban: data.get('iban'),
      monatlicherForderbeitrag: {
        amountMicros: Number(data.get('contribution') ?? 0) * 1000000,
        currencyCode: 'EUR',
      },
      ...(bic ? { bic } : {}),
      beitrittsdatum: new Date().toJSON(),
    };

    // With the replace method the the quotes from the property keys (from JSON) are removed, because graphql requires them unquoted
    const mutation = gql`
      mutation {
        createPerson(data: ${JSON.stringify(personData).replace(/"([^"]+)":/g, '$1:')}) {
          id
          createdAt
        }
        createFordermitgliedschaft(
          data: ${JSON.stringify(fordermitgliedschaftData).replace(/"([^"]+)":/g, '$1:')}
        ) {
          id
          monatlicherForderbeitrag {
            amountMicros
            currencyCode
          }
        }
      }
    `;
    console.log(mutation);
    //TODO: link the Fordermitgliedschaft with the person
    interface ResponseData {
      createPerson: {
        createdAt: string;
        id: string;
      };
    }
    const response = await graphQLClient.request<ResponseData>(mutation);
    console.log(response);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      console.error(error.message);
    }
    return new Response(
      JSON.stringify({
        message: 'error',
      }),
      { status: 500 },
    );
  }
  // TODO: return failure on failure
  return new Response(
    JSON.stringify({
      message: 'Success!',
    }),
    { status: 200 },
  );
};
