import React from 'react'
import ReactDOM from 'react-dom'
import ListItem from './ListItem'
import { configure, mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

configure({ adapter: new Adapter() })

describe('<ListItem node={node} />', () => {
  const node = {
    name: 'my Title',
    id: '1',
    avatarUrl: 'https://pbs.twimg.com/profile_images/821713465245102080/mMtKIMax.jpg'
  }
  const wrapper = shallow(<ListItem node={node} />)

  it('should render ListItem', () => {
    // console.log(wrapper.debug())
  })

  it('should contain card classes', () => {
    expect(wrapper.find('.card').length).toBe(1)
    expect(wrapper.find('.card-container').length).toBe(1)
    expect(wrapper.find('.card-title').length).toBe(1)
  })

  it('should render props node', () => {
    expect(wrapper.instance().props.node).toBe(node)
  })

  it('should render props correct value value', () => {
    const tree = mount(<ListItem node={node} />)
    expect(tree.find('.card-title').text()).toBe('my Title')
    // expect(tree.find('style')).toBe({
    //   backgroundImage: `url(${node.avatarUrl})`
    // })

    tree.unmount()
  })

  it('Matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
