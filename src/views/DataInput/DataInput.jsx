import React, { Component } from 'react';
import { Upload, Icon, message, Steps, Button, Input } from 'antd';
import moment from 'moment';
import API from '../../api/service'
import { CONFIG } from '../../config'
import ControlForm from './ControlForm'

const { Step } = Steps;
const { Dragger } = Upload;

export default class DataInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      fileList: [],
      batchNum: '',
      postFlag: false,
      stepStatus: [false, false, false]
    };
  }
  steps = () => [
    {
      title: `First:${
        this.state.fileList.length > 0
          ? this.state.fileList[0].name
          : 'Select your files and add a batch number'
        }`,
        rule: () => {
        return this.state.fileList.length > 0 && this.state.batchNum;;
      },
      content: (
        <div>
          <Dragger {...this.upload_props}>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
          </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibit from
              uploading company data or other band files
          </p>
          </Dragger>
          <Input
            size="large"
            placeholder="Please enter batch numberlarge size"
            value={this.state.batchNum}
            onChange={e => {
              this.setState({ batchNum: e.target.value });
            }}
          />
        </div>
      )
    },
    {
      title: 'Second:Adding descriptions to the data',
      rule: () => {
        if (this.refs.ControlForm) {
          this.refs.ControlForm.validateFields((err, vals) => {
            console.log(err)
            console.log(vals)
            return !err
          })
        }
        return false
      },
      content: (
        <div>
          <h3>
            You have to add descriptions to the data, which are essential for statistics.
          </h3>
          <p>
            Q:Input error data?
          </p>
          <p>
            A:Enter the &lt;BasicData&gt; page, use batch number to delete misleading data, and then re-import
          </p>
          <ControlForm ref='ControlForm' />
        </div>
      )
    },
    {
      title: 'Post Data',
      content: (
        <h2>To complete the two steps,click Done button to upload file</h2>
      ),
      rule: () => {
        return this.state.postFlag;
      }
    }
  ];
  upload_props = {
    name: 'file',
    multiple: false,
    beforeUpload: (file, fileList) => {
      let batchNum = `${moment().format('YYYYMMDDhhmmss')}-${file.name}`;
      this.setState({ fileList, batchNum });
      return false;
    },
    accept: CONFIG.FILE_ACCEPT.join(','),
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };
  next() {
    // 验证
    let newArr = [...this.state.stepStatus]
    newArr[this.state.current] = this.steps()[this.state.current].rule() && true
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    // 验证
    let newArr = [...this.state.stepStatus]
    newArr[this.state.current] = this.steps()[this.state.current].rule() && true
    const current = this.state.current - 1;
    this.setState({ current });
  }
  submit = () => {
    // 验证
    if (!this.state.batchNum) {
      message.warn('check your batch number')
      return
    }
    if (!this.state.fileList.length > 0) {
      message.warn('upload a file')
    }
    const formData = new FormData();
    formData.append('batchNum', this.state.batchNum)
    this.state.fileList.forEach((file) => {   // fileList 是要上传的文件数组
      formData.append('files', file);
    });

    API.uploadXLSX(formData).then(res => {
      if (res.data.success) {
        this.setState({ postFlag: true })
      }
    })
  };
  render() {
    const { current } = this.state;
    const steps = this.steps();
    return (
      <div className="DataInput">
        <div className="DataInput-inner">
          <Steps current={current}>
            {steps.map((item, index) => (
              <Step
                key={item.title}
                status={this.state.stepStatus[index] ? 'finish' : 'error'}
                title={item.title}
              />
            ))}
          </Steps>
          <div className="steps-content">{steps[current].content}</div>
          <div className="steps-action">
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => this.next()}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button type="primary" onClick={this.submit}>
                Done
              </Button>
            )}
            {current > 0 && (
              <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                Previous
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
}
