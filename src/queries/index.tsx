import { gql } from "@apollo/client";

export const GET_COUNTRIES = gql`
  query ListCountry {
    countries{
      name
      native
      capital
      emoji
      currency
      languages {
        code
        name
      }
    }
  }
`;


export const SEARCH_COUNTRY = gql`
  query ListCountrySearch($filter: CountryFilterInput) {
    countries(filter: $filter) {
      name
      native
      capital
      emoji
      currency
      languages {
        code
        name
      }
    }
  }
`