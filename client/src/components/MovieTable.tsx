import React from 'react'
import { IMovieState } from '../redux/reducers/MovieReducer'
import { Table, Switch } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { IMovie } from '../services/MovieServices'
import defaultposterImg from '../assets/defaultposter.jpg'
import { SwitchType } from '../services/CommonTypes'

export interface IMovieTableEvents {
    /**
     * 完成加载之后的事件
     */
    onLoad: () => void,
    onSwitchChange: (type: SwitchType, newState: boolean, id: string) => void,
}

export default class extends React.Component<IMovieTableEvents & IMovieState> {
    componentDidMount() {
        this.props.onLoad?.();
    }

    private getColumns(): ColumnProps<IMovie>[] {
        return [{
            title: '封面',
            dataIndex: 'poster',
            render(poster: string) {
                if (poster) {
                    return <img className="table-poster" src={poster} />
                } else {
                    return <img className="table-poster" src={defaultposterImg} />
                }
            }
        }, {
            title: '名称',
            dataIndex: 'name',
        }, {
            title: '地区',
            dataIndex: 'areas',
            render(text: string[]) {
                return text.join(', ')
            }
        }, {
            title: '类型',
            dataIndex: 'types',
            render(text: string[]) {
                return text.join(', ')
            }
        }, {
            title: "时长",
            dataIndex: "timeLong",
            render(timeLong: string) {
                return timeLong + '分钟'
            }
        }, {
            title: '正在热映',
            dataIndex: 'isHot',
            render: (isHot: boolean, record: IMovie) => {
                return <Switch checked={isHot} onChange={(nweVal) => {
                    this.props.onSwitchChange(SwitchType.isHot, nweVal, record._id!)
                }} />
            }
        }, {
            title: '即将上映',
            dataIndex: 'isComing',
            render: (isComing: boolean, record: IMovie) => {
                return <Switch checked={isComing} onChange={(nweVal) => {
                    this.props.onSwitchChange(SwitchType.isComing, nweVal, record._id!)
                }} />
            }
        }, {
            title: '经典影片',
            dataIndex: 'isClassic',
            render: (isClassic: boolean, record: IMovie) => {
                return <Switch checked={isClassic} onChange={(nweVal) => {
                    this.props.onSwitchChange(SwitchType.isClassic, nweVal, record._id!)
                }} />
            }
        }]
    }

    render() {
        return (
            <Table rowKey="_id" dataSource={this.props.data} columns={this.getColumns()} />
        )
    }
}