import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

configure({ adapter: new Adapter() })

describe('<App />', () => {
  const wrapper = shallow(<App />)

  it('should render App', () => {
    const wrapper = shallow(<App />, {
      context: {},
      disableLifecycleMethods: true
    })
    // console.log(wrapper.debug())
  })

  it('should contain 1 h2 element', () => {
    expect(wrapper.find('h2').length).toBe(1)
  })
  it('should contain 1 h2 exist', () => {
    expect(wrapper.find('.App-header').exists()).toBe(true)
  })
  it('should contain 1 h2 do not exist', () => {
    expect(wrapper.find('.App-heade').exists()).toBe(false)
  })
  it('should contain 2 children on App', () => {
    expect(wrapper.find('.App').children().length).toBe(2)
  })
  it('should contain a title', () => {
    expect(wrapper.find('h2').text()).toBe('Welcome to React')
  })
  it('should contain a logo', () => {
    expect(wrapper.find('img[src="logo.svg"]').exists()).toBe(true)
  })
  it('should contain a logo contains a alt ', () => {
    expect(wrapper.find({ alt: 'logo' }).exists()).toBe(true)
  })
  it('should contain a Apollo', () => {
    expect(wrapper.find('Apollo(CatsList)').exists()).toBe(true)
  })
  it('Matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
