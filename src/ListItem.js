import React, { Component } from 'react'

export default class ListItem extends Component {
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
