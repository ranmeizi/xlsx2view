import React, { Component } from 'react';
import { Upload, Icon, message, Steps, Input, Button } from 'antd';
import moment from 'moment';
import API from '../../api/service'
import { CONFIG } from '../../config'

const { Step } = Steps;
const { Dragger } = Upload;

export default class DataInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      fileList: [],
      batchNum: '',
      actionPromise: null
    };
  }
  steps = () => [
    {
      title: `First:${
        this.state.fileList.length > 0
          ? this.state.fileList[0].name
          : 'Select your files'
        }`,
      role: () => {
        return this.state.fileList.length > 0;
      },
      content: (
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
      )
    },
    {
      title: `Second:${
        this.state.batchNum ? this.state.batchNum : 'add a batch number'
        }`,
      role: () => {
        return this.state.batchNum;
      },
      content: (
        <div>
          <h3>
            When you import data, you need to set a batch number for this batch
            of data.
          </h3>
          <h3>
            The batch number defaults to time + file name, which can also be
            customized, but do not repeat
          </h3>
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
      title: 'Post Data',
      content: (
        <h2>To complete the two steps,click Done button to upload file</h2>
      ),
      role: () => {
        return false;
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
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
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

    })
  };
  render() {
    const { current } = this.state;
    const steps = this.steps();
    return (
      <div className="DataInput">
        <div className="DataInput-inner">
          <Steps current={current}>
            {steps.map(item => (
              <Step
                key={item.title}
                status={item.role() ? 'finish' : 'error'}
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
