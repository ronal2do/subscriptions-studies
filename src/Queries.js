import gql from 'graphql-tag'

export const CATS_LIST_QUERY = gql`
query allcats{
  allCats {
    edges {
      node {
        id
        name
        createdAt
        avatarUrl
      }
    }
  }
}
`

export const CATS_SUBSCRIPTION = gql`
  subscription newCat {
    newCat {
      id
      name
      nickName
      description
      createdAt
      avatarUrl
      age
    }
  }
`
