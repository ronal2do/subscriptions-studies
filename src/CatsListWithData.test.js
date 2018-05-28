import React from 'react'
import ReactDOM from 'react-dom'
import { CatsListWithData } from './CatsListWithData'
import { configure, mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

configure({ adapter: new Adapter() })

describe('<CatsListWithData  />', () => {
  const wrapper = shallow(<CatsListWithData />)

  it('should render CatsListWithData', () => {
    console.log(wrapper.debug())
  })

  it('calls componentDidMount', () => {
    jest.spyOn(CatsListWithData.prototype, 'componentDidMount')
    expect(CatsListWithData.prototype.componentDidMount.mock.calls.length).toBe(
      1
    )
  })

  it('Matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
