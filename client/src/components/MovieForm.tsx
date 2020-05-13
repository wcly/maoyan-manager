import React from 'react'
import { FormInstance } from 'antd/lib/form';
import { Form, Input, Button, Checkbox, InputNumber, Switch, message } from 'antd'
import ImgUploader from './ImgUploader';
import { IMovie } from '../services/MovieServices';
import { withRouter, RouteComponentProps } from 'react-router';

interface IFormProp extends RouteComponentProps {
    onSubmit: (movie: IMovie) => Promise<string>
}

const AllAreas: { label: string, value: string }[] = [
    { label: "中国大陆", value: "中国大陆" },
    { label: "美国", value: "美国" },
    { label: "中国台湾", value: "中国台湾" },
    { label: "中国香港", value: "中国香港" }
]

const AllTypes: { label: string, value: string }[] = [
    { label: "喜剧", value: "喜剧" },
    { label: "灾难", value: "灾难" },
    { label: "动作", value: "动作" },
    { label: "爱情", value: "爱情" }
]

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 19, offset: 1 },
};

class MovieForm extends React.Component<IFormProp> {
    formRef = React.createRef<FormInstance>();

    handleSubmit = async (values: any) => {
        const result = await this.props.onSubmit(values as IMovie)
        if(result){
            message.error(result)
        }else{
            message.success('处理成功', 1, ()=>{
                this.props.history.push('/movie')
            })
        }
    };

    handleError = (errors: any) => {
        console.log(errors)
    }

    render() {
        return (
            <Form
                {...layout}
                ref={this.formRef}
                style={{ width: 400 }}
                onFinish={this.handleSubmit}
                onFinishFailed={this.handleError}
                initialValues={{ isClassic: false, isComing: false, isHot: false }}>
                <Form.Item name="name" label="电影名称" rules={[{ required: true, message: '请填写电影名称' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="poster" label="封面图">
                    <ImgUploader />
                </Form.Item>
                <Form.Item name="areas" label="地区" rules={[{ required: true, message: '请选择地区' }]}>
                    <Checkbox.Group options={AllAreas} />
                </Form.Item>
                <Form.Item name="types" label="类型" rules={[{ required: true, message: '请选择类型' }]}>
                    <Checkbox.Group options={AllTypes} />
                </Form.Item>
                <Form.Item name="timeLong" label="时长" rules={[{ required: true, message: '请填写时长' }]}>
                    <InputNumber min={1} step={10} />
                </Form.Item>
                <Form.Item name="isHot" label="正在热映" valuePropName="checked">
                    <Switch />
                </Form.Item>
                <Form.Item name="isComing" label="即将上映" valuePropName="checked">
                    <Switch />
                </Form.Item>
                <Form.Item name="isClassic" label="经典影片" valuePropName="checked">
                    <Switch />
                </Form.Item>
                <Form.Item name="description" label="描述">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item labelCol={{ span: 0 }} wrapperCol={{ span: 19, offset: 5 }}>
                    <Button type="primary" htmlType="submit">提交</Button>
                </Form.Item>
            </Form>
        )
    }
}

export default withRouter(MovieForm)