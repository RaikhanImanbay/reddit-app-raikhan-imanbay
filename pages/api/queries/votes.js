import { gql } from "@apollo/client";

 export const VOTE_LINK= gql`mutation($link: String!) {
    vote(linkId: $linkId) {
      id
    }
  }`;
  