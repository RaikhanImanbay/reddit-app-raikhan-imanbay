import { gql } from "@apollo/client";

export const CREATE_NEW_USER = gql`mutation($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
    }
  }`;

export const SIGN_IN_USER = gql`mutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}`;