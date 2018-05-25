import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

import { split } from 'apollo-client-preset'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

const httpLink = new HttpLink({ uri: `http://localhost:8080` })

const wsLink = new WebSocketLink({
  uri: `ws://localhost:8080`,
  options: {
    reconnect: true,
  }
})

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})