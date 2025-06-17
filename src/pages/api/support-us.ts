export const prerender = false;
import type { APIRoute } from 'astro';

import { gql, GraphQLClient } from 'graphql-request';

const config = {
  SLACK_TOKEN: import.meta.env.SLACK_TOKEN,
  TWENTY_AUTH: import.meta.env.TWENTY_AUTH,
  TWENTY_GRAPHQL_URL: import.meta.env.TWENTY_GRAPHQL_URL,
};
const missingConfig = Object.entries(config).filter(([_, v]) => !v);
if (missingConfig.length > 0) {
  console.error(
    'Missing environment variables:',
    missingConfig.map(([k, _]) => k),
  );
  throw new Error('Missing configuration');
}

export const POST: APIRoute = async ({ request }) => {
  const requiredFields = [
    'agreement',
    'firstName',
    'lastName',
    'email',
    'streetAddress',
    'city',
    'postalCode',
    'country',
    'iban',
    'contribution',
    'nameMention',
    'preferredLanguage',
  ];

  console.log('Config:', config);

  const graphQLClient = new GraphQLClient(config.TWENTY_GRAPHQL_URL, {
    headers: {
      Authorization: `Bearer ${config.TWENTY_AUTH}`,
      'Content-Type': 'application/json',
    },
  });
  try {
    console.log(request.body);
    const data = await request.formData();
    console.log('Data: ', data);

    // send form data to slack
    const dataObj = Object.fromEntries(data.entries());
    const payload = {
      channel: 'C091N6B162E',
      text: JSON.stringify(dataObj, null, 2),
    };
    const slackApiResponse = await fetch('https://slack.com/api/chat.postMessage', {
      body: JSON.stringify(payload),
      headers: {
        Authorization: `Bearer ${config.SLACK_TOKEN}`,
        'Content-Type': 'application/json; charset=utf-8',
      },
      method: 'POST',
    });

    console.log('SlackApiResponse: ', await slackApiResponse.json());

    // Check if any required fields are missing
    const missingFields = requiredFields.filter((field) => data.get(field) === null);
    console.log('Missing fields:', missingFields);
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
      consentNameMention: data.get('nameMention') === 'true',
      emails: { primaryEmail: data.get('email') },
      name: { firstName: data.get('firstName'), lastName: data.get('lastName') },
      preferredLanguage: data.get('preferredLanguage'),
    };
    console.log('Person data:', personData);

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
    console.log('Fördermitgliedschaft data:', fordermitgliedschaftData);

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
  console.log('Success!');
  return new Response(
    JSON.stringify({
      message: 'Success!',
    }),
    { status: 200 },
  );
};
