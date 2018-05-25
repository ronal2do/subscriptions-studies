import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { CATS_SUBSCRIPTION, CATS_LIST_QUERY } from './Queries'

class CatsList extends Component {
  componentDidMount() {
    this.subscribeCats()
  }

  render() {
    const { cats: { loading, error, allCats } } = this.props

    if (loading) {
      return <p>Loading ...</p>
    }
    if (error) {
      return <p>{error.message}</p>
    }

    return (
      <ul>
        {allCats.edges.map(({ node }) => <li key={node.id}>{node.name}</li>)}
      </ul>
    )
  }

  subscribeCats = () => {
    this.props.cats.subscribeToMore({
      document: CATS_SUBSCRIPTION,
      updateQuery: (previous, { subscription }) => {
        const updated = subscription.cats.newCat
        const node = [
          { 
            node: updated, 
            __typename: "CatEdge", 
          },
          ...previous.allCats.edges,
        ]
        const result = {
          ...previous,
          allCats: {
             __typename: previous.allCats.__typename,
            edges: node,
          },
        }
        console.log('result', result)
        return result
      },
    })
  }
}

export const CatsListWithData =  graphql(CATS_LIST_QUERY, {
  name: 'cats',
})(CatsList)