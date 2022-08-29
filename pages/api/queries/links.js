import { gql } from "@apollo/client";
import client from "../../../apollo-client";

export const CREATE_NEW_LINK = gql`mutation($link: String!, $description: String!) {
  post(
    url: $link, description: $description) {
    id
  }
}`;

export async function getPortionOfLinks(take, skip) {
  const { data } = await client.query({
    query: gql`
    query {
      feed(take: ${take || 10}, skip: ${skip || 0}) {
        count
        links {
          id
          description
          url
          postedBy {
            id
            name
          }
          votes {
            id
            user {
              id
              name
            }
          }
        }
      }
    }
    `
  });

  return {
    count: data.feed.count,
    links: data.feed.links,
  };
}