import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_PROJECT_DATASET,
  useCdn: false, // 동적인 데이터가 주로 들어있으니 false
  apiVersion: '2023-10-07', // use current date (YYYY-MM-DD) to target the latest API version
  token: process.env.SANITY_SECRET_TOKEN, // 데이터를 읽기만 하면 token X, 데이터 수정한다면 token 명시
});
