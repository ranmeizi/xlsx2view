import React, { Component } from 'react'

export default class HomePage extends Component {
  componentWillMount() {
    console.log('我是home，我要mount了')
  }
  componentDidMount() {
    console.log('我是home，我mount了')
  }
  componentWillUnmount() {
    console.log('不管用啊')
  }
  render() {
    return (
      <div>
        我是一个主页
      </div>
    )
  }
}
