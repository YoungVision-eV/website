import { gql, GraphQLClient } from 'graphql-request';

export interface FoundraisingProgress {
  amount: number;
  count: number;
}

interface ResponseData {
  fordermitglieder: {
    sumMonatlicherForderbeitragAmountMicros: number;
    totalCount: number;
  };
}

export async function getFoundraisingProgress(): Promise<FoundraisingProgress> {
  const graphQLClient = new GraphQLClient('https://twenty.youngvision.work/graphql', {
    headers: {
      Authorization: import.meta.env.TWENTY_AUTH,
      'Content-Type': 'application/json',
    },
  });
  const query = gql`
    {
      fordermitglieder(filter: { austrittdatum: { is: NULL } }) {
        totalCount
        sumMonatlicherForderbeitragAmountMicros
      }
    }
  `;
  const data = await graphQLClient.request<ResponseData>(query);
  return {
    amount: data.fordermitglieder.sumMonatlicherForderbeitragAmountMicros / 1000000,
    count: data.fordermitglieder.totalCount,
  };
}
