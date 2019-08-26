import React, { Component } from 'react'
import { Col, Row, Input, Select, DatePicker, Form } from 'antd'
import moment from 'moment'

const { Option } = Select

const optList = { '0': 'Sunday', '1': 'Monday', '2': 'Tuesday', '3': 'Wednesday', '4': 'Thursday', '5': 'Friday', '6': 'Saturday' }
const formItemLayout = {
  labelCol: {
    offset: 4,
    span: 6
  },
  wrapperCol: {
    span: 6
  },
};

class ControlForm extends Component {
  FieldData = [
    // 比赛日期
    {
      id: 'game_date',
      label: 'Game Date',
      initialValue: moment(),
      attr: {
        onChange: (value) => {
          // 修改weekday的值
          this.props.form.setFieldsValue({ 'weekday':optList[value.day()]})
          console.log(value)
        }
      },
      type: 'DatePicker'
    },
    // 比赛对阵
    {
      id: 'opposition',
      label: 'Opposition',
      initialValue: null,
      type: 'Input',
      rules: [{ pattern: /.*/ }, {
        required: true,
        message: 'opposition is null',
      }]
    },
    // 星期
    {
      id: 'weekday',
      label: 'Weekday',
      initialValue: 'Monday',
      type: 'Select',
      optList: optList,
    },
    {
      id: 'days_since_prev_game',
      label: 'Days Since Prev Game',
      initialValue: '0',
      type: 'Input',
    },
    {
      id: 'no_of_groups',
      label: 'No. of Groups',
      initialValue: '0',
      type: 'Input',
    },
    {
      id: 'group_adults',
      label: 'Group Adults',
      initialValue: '0',
      type: 'Input',
    },
    {
      id: 'group_children',
      label: 'Group Children',
      initialValue: '0',
      type: 'Input',
    },
    {
      id: 'group_tickets_revenuen',
      label: 'Group Tickets Revenuen',
      initialValue: '0',
      type: 'Input',
      attr: {
        addonBefore: '￡'
      }
    },
    {
      id: 'eventbrite_add_ons',
      label: 'Eventbrite Add-ons',
      initialValue: '0',
      type: 'Input',
      attr: {
        addonBefore: '￡'
      }
    },
    {
      id: 'group_add_ons_food',
      label: 'Group Add-ons/Food',
      initialValue: '0',
      type: 'Input',
      attr: {
        addonBefore: '￡'
      }
    },
    {
      id: 'other_add_ons_food',
      label: 'Other Add-ons/Food',
      initialValue: '0',
      type: 'Input',
      attr: {
        addonBefore: '￡'
      }
    },
    {
      id: 'spare_comps_printed',
      label: 'Spare Comps Printed',
      initialValue: '0',
      type: 'Input'
    },
    {
      id: 'comparable_game_date',
      label: 'Comparable Game Date',
      initialValue: moment(),
      type: 'DatePicker'
    }
  ]

  renderFieldItem(item) {
    switch (item.type) {
      case 'Input': return <Input />
      case 'Select': return <Select>
        {
          Object.entries(item.optList).map(arr => <Option value={arr[0]}>{arr[1]}</Option>)
        }
      </Select>
      case 'DatePicker': return <DatePicker {...item.attr}/>
      default: return <Input />
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        {
          this.FieldData.map(item => {
            return <Form.Item label={item.label}>
              {getFieldDecorator(item.id, { rules: item.rules, initialValue: item.initialValue })(
                this.renderFieldItem(item)
              )}
            </Form.Item>
          })
        }
      </Form>
    )
  }
}
export default Form.create({ name: 'ControlForm' })(ControlForm);