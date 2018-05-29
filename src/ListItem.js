// @flow
import React, { Component } from 'react'

type Props = {
  node: NodeType,
}

type NodeType = {
  name: string,
  id: string,
  avatarUrl: string,
}

export default class ListItem extends Component<Props> {
  render () {
    const { node: { name, id, avatarUrl } } = this.props
    return (
      <div
        className='card'
        key={id}
        style={{ backgroundImage: `url(${avatarUrl})` }}
      >
        <div className='card-container'>
          <p className='card-title'>{name}</p>
        </div>
      </div>
    )
  }
}
