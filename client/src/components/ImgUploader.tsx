import React from 'react'
import { Upload, message, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { IResponseData, IResponseError } from '../services/CommonTypes'

interface IImgUploaderProps {
    value?: string
    onChange: (imgUrl: string) => void
}

interface IImgState {
    showModal: boolean
}

export default class extends React.Component<IImgUploaderProps, IImgState> {
    state: IImgState = {
        showModal: false
    }

    private getUploadContent() {
        if (this.props.value) {
            return null
        } else {
            return (
                <div>
                    <PlusOutlined />
                    <div>点击上传</div>
                </div>
            )
        }
    }

    private getFileList(): any[] {
        if (this.props.value) {
            return [{ uid: this.props.value, name: this.props.value, url: this.props.value }]
        } else {
            return []
        }
    }

    async handleRequest(p: any) {
        let formData = new FormData();
        formData.append(p.filename, p.file);
        const request = new Request(p.action, {
            method: 'post',
            body: formData
        })
        const res: IResponseData<string> | IResponseError = await fetch(request).then(resp => resp.json())
        if (res.err) {
            message.error(res.err)
        } else {
            this.props.onChange(res.data!)
        }
    }

    render() {
        return (
            <div>
                <Upload
                    action="/upload"
                    name="imgfile"
                    accept=".jpg,.png,.gif"
                    listType="picture-card"
                    fileList={this.getFileList()}
                    customRequest={this.handleRequest.bind(this)}
                    onRemove={() => {
                        this.props.onChange("")
                    }}
                    onPreview={() => { 
                        this.setState({
                            showModal: true
                        })
                    }}
                >
                    {this.getUploadContent()}
                </Upload>
                <Modal
                    visible={this.state.showModal}
                    footer={null}
                    onCancel={() => {
                        this.setState({
                            showModal: false
                        })
                    }}
                >
                    <img alt="example" style={{ width: '100%' }} src={this.props.value} />
                </Modal>
            </div>

        )
    }
}