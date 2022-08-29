import { gql } from "@apollo/client";

 export const VOTE_LINK= gql`mutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
    }
  }`;
  