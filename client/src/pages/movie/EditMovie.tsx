import React from 'react'
import { RouteComponentProps } from 'react-router'
import ImgUploader from '../../components/ImgUploader'

interface IParams {
    id: string
}

export default class extends React.Component<RouteComponentProps<IParams>> {
    state = {
        img: ""
    }
    render() {
        return (
            <ImgUploader onChange={newUrl => {
                this.setState({
                    img: newUrl
                })
            }} value={this.state.img} />
        )
    }
}
