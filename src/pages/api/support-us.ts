export const prerender = false;
import type { APIRoute } from 'astro';

import { gql, GraphQLClient } from 'graphql-request';
export const POST: APIRoute = async ({ request }) => {
  const requiredFields = [
    'first-name',
    'last-name',
    'email',
    'street',
    'city',
    'post-code',
    'country',
    'iban',
    'amount',
  ];

  const graphQLClient = new GraphQLClient(import.meta.env.TWENTY_GRAPHQL_URL, {
    headers: {
      Authorization: 'Bearer ' + import.meta.env.TWENTY_AUTH,
      'Content-Type': 'application/json',
    },
  });
  try {
    const data = await request.formData();

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

    const person = {
      adresse: { addressCity: 'a', addressPostcode: 'b', addressState: 'c', addressStreet1: 'd' },
      emails: { primaryEmail: data.get('email') },
      name: { firstName: data.get('first-name'), lastName: data.get('last-name') },
    };
    const bic = data.get('bic');
    const personData = {
      adresse: {
        addressCity: data.get('city'),
        addressCountry: data.get('country'),
        addressPostcode: data.get('post-code'),
        addressStreet1: data.get('street'),
      },
      emails: { primaryEmail: data.get('email') },
      name: { firstName: data.get('first-name'), lastName: data.get('last-name') },
    };

    const fordermitgliedschaftData = {
      fullName: { firstName: data.get('first-name'), lastName: data.get('last-name') },
      iban: data.get('iban'),
      monatlicherForderbeitrag: {
        amountMicros: Number(data.get('amount') ?? 0) * 1000000,
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
