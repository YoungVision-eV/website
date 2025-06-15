export const prerender = false;
import type { APIRoute } from 'astro';

import { gql, GraphQLClient } from 'graphql-request';
export const POST: APIRoute = async ({ request }) => {
  // TODO: use env variable for url to twenty graphql
  const graphQLClient = new GraphQLClient(import.meta.env.TWENTY_GRAPHQL_URL, {
    headers: {
      Authorization: 'Bearer ' + import.meta.env.TWENTY_AUTH,
      'Content-Type': 'application/json',
    },
  });
  try {
    const data = await request.formData();
    const person = {
      adresse: { addressCity: 'a', addressPostcode: 'b', addressState: 'c', addressStreet1: 'd' },
      emails: { primaryEmail: data.get('email') },
      name: { firstName: data.get('first-name'), lastName: data.get('last-name') },
    };
    const mutation = gql`
      mutation {
        createPerson(data: {
          adresse: { addressCity: "${data.get('city')}", addressPostcode: "${data.get('post-code')}", addressCountry: "${data.get('country')}", addressStreet1: "${data.get('street')}" },
          emails: { primaryEmail: "${data.get('email')}" },
          name: { firstName: "${data.get('first-name')}", lastName: "${data.get('last-name')}" },
        }) {
          id
          createdAt
        }
        createFordermitgliedschaft(
          data: {
            fullName: { firstName: "${data.get('first-name')}", lastName: "${data.get('last-name')}" },
            monatlicherForderbeitrag: { amountMicros: ${Number(data.get('amount') ?? 0) * 1000000}, currencyCode: "EUR" },
            iban: "${data.get('iban')}",
            bic: "${data.get('bic')}",
            beitrittsdatum: "${new Date().toJSON()}",
          }
        ) {
          id
          monatlicherForderbeitrag {
            amountMicros
            currencyCode
          }
        }
      }
    `;
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
  }
  // TODO: return failure on failure
  return new Response(
    JSON.stringify({
      message: 'Success!',
    }),
    { status: 200 },
  );
};
