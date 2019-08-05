import React, { Component } from 'react'

export default class DataInput extends Component {
  componentWillMount() {
    console.log('我是data，我要mount了')
  }
  componentDidMount() {
    console.log('我是data，我mount了')
  }
  componentWillUnmount() {
    console.log('不管用啊')
  }
  render() {
    return (
      <div>
        我是一个数据输入页
      </div>
    )
  }
}
