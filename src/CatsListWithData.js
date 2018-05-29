// @flow
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { CATS_SUBSCRIPTION, CATS_LIST_QUERY } from './Queries'
import ListItem from './ListItem'

type Props = {
  cats: CatsType,
}

type CatsType = {
  loading: boolean,
  error: ErrorType,
  allCats: Object,
  subscribeToMore: (config: Object) => void,
}

type ErrorType = {
  message: string,
}

class CatsList extends Component<Props> {
  componentDidMount () {
    this.subscribeCats()
  }

  render () {
    const { cats: { loading, error, allCats } } = this.props

    if (loading) {
      return <p>Loading ...</p>
    }
    if (error) {
      return <p>{error.message}</p>
    }

    return (
      <div className='list'>
        {allCats.edges.map(({ node }) => (
          <ListItem key={node.id} node={node} />
        ))}
      </div>
    )
  }

  subscribeCats = () => {
    this.props.cats.subscribeToMore({
      document: CATS_SUBSCRIPTION,
      updateQuery: (previous, { subscriptionData }) => {
        const updated = subscriptionData.data.newCat
        const node = [
          {
            node: updated,
            __typename: 'CatEdge'
          },
          ...previous.allCats.edges
        ]
        const result = {
          ...previous,
          allCats: {
            __typename: previous.allCats.__typename,
            edges: node
          }
        }
        return result
      }
    })
  }
}

export const CatsListWithData = graphql(CATS_LIST_QUERY, {
  name: 'cats'
})(CatsList)
