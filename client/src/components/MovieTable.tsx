import React from 'react'
import { IMovieState } from '../redux/reducers/MovieReducer'
import { Table, Switch, Button, message, Popconfirm, Input } from 'antd'
import { ColumnProps, TablePaginationConfig } from 'antd/lib/table'
import { IMovie } from '../services/MovieServices'
import defaultposterImg from '../assets/defaultposter.jpg'
import { SwitchType } from '../services/CommonTypes'
import { NavLink } from 'react-router-dom'
import { PaginationConfig } from 'antd/lib/pagination'
import { SearchOutlined } from '@ant-design/icons';

export interface IMovieTableEvents {
    /**
     * 完成加载之后的事件
     */
    onLoad: () => void,
    onSwitchChange: (type: SwitchType, newState: boolean, id: string) => void,
    onDelete: (id: string) => Promise<void>
    onChange: (newPage: number) => void
    onKeyChange: (key: string) => void
    onSearch: () => void
}

export default class extends React.Component<IMovieTableEvents & IMovieState> {
    componentDidMount() {
        this.props.onLoad?.();
    }

    private getFilterDropDown(p: object) {
        return (
            <div style={{ padding: 8 }}>
                <Input style={{ width: 188, marginBottom: 8, display: 'block' }} value={this.props.condition.key} 
                onChange={e => this.props.onKeyChange(e.target.value)} 
                onPressEnter={this.props.onSearch}/>
                <Button type="primary" icon={<SearchOutlined />} size="small" style={{ width: 90, marginRight: 8 }} onClick={this.props.onSearch}>查询</Button>
                <Button size="small" style={{ width: 90 }} onClick={()=>{
                    this.props.onKeyChange('')
                    this.props.onSearch()
                }}>重置</Button>
            </div>
        )
    }

    private getColumns(): ColumnProps<IMovie>[] {
        return [{
            title: '封面',
            dataIndex: 'poster',
            render(poster: string) {
                if (poster) {
                    return <img className="table-poster" src={poster} alt='' />
                } else {
                    return <img className="table-poster" src={defaultposterImg} alt='' />
                }
            }
        }, {
            title: '名称',
            dataIndex: 'name',
            filterDropdown: this.getFilterDropDown.bind(this),
            filterIcon: <SearchOutlined />
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
        }, {
            title: '操作',
            dataIndex: '_id',
            render: (id: string) => {
                return (
                    <div>
                        <NavLink to={"/movie/edit/" + id} style={{ marginRight: 10 }}>
                            <Button type="primary" >编辑</Button>
                        </NavLink>
                        <Popconfirm title='确定要删除吗？' onConfirm={async () => {
                            await this.props.onDelete(id)
                            message.success('删除成功')
                        }} okText="确定" cancelText="取消">
                            <Button type="primary" danger>删除</Button>
                        </Popconfirm>
                    </div>
                )
            }
        }]
    }

    getPageConfig(): false | TablePaginationConfig {
        if (this.props.total === 0) {
            return false;
        }
        return {
            current: this.props.condition.page,
            pageSize: this.props.condition.limit,
            total: this.props.total
        }
    }

    handleChange(pagination: PaginationConfig) {
        this.props.onChange(pagination.current!)
    }

    render() {
        return (
            <Table
                rowKey="_id"
                dataSource={this.props.data}
                columns={this.getColumns()}
                pagination={this.getPageConfig()}
                onChange={this.handleChange.bind(this)}
                loading={this.props.isLoading}
            />
        )
    }
}