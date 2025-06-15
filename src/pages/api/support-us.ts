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
      mutation SupportFromMutation(
        $personData: PersonCreateInput
        $fordermitgliedschaftData: FordermitgliedschaftCreateInput
      ) {
        createPerson(data: $personData) {
          id
          createdAt
        }
        createFordermitgliedschaft(data: $fordermitgliedschaftData) {
          id
          createdAt
        }
      }
    `;
    console.log(mutation);
    const variables = {
      fordermitgliedschaftData,
      personData,
    };
    //TODO: link the Fordermitgliedschaft with the person
    interface ResponseData {
      createPerson: {
        createdAt: string;
        id: string;
      };
    }
    const response = await graphQLClient.request<ResponseData>(mutation, variables);
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
