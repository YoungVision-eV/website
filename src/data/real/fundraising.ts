import { gql, GraphQLClient } from 'graphql-request';

export interface FoundraisingProgress {
  amount: number;
  count: number;
}

interface ResponseData {
  fordermitgliedschaften: {
    sumMonatlicherForderbeitragAmountMicros: number;
    totalCount: number;
  };
}

export async function getFoundraisingProgress(): Promise<FoundraisingProgress> {
  const graphQLClient = new GraphQLClient('https://twenty.youngvision.work/graphql', {
    headers: {
      Authorization: 'Bearer ' + import.meta.env.TWENTY_AUTH,
      'Content-Type': 'application/json',
    },
  });
  //TODO: also count foredermigliedschften that end in the futer
  const query = gql`
    {
      fordermitgliedschaften(filter: { austrittdatum: { is: NULL } }) {
        totalCount
        sumMonatlicherForderbeitragAmountMicros
      }
    }
  `;
  const data = await graphQLClient.request<ResponseData>(query);
  console.log(data);
  return {
    amount: data.fordermitgliedschaften.sumMonatlicherForderbeitragAmountMicros / 1000000,
    count: data.fordermitgliedschaften.totalCount,
  };
}
