import React, {Component} from 'react';
import {compressImageFile} from './image-utils';

export const PAGE_ROUTE = '/example/fe-zip-image';

export default class FEZIpImage extends Component {
    state = {
        images: [],
        loading: false,
    };

    componentWillMount() {

    }

    componentDidMount() {

    }

    handleChange = (e) => {
        const images = [...this.state.images];
        if (!e.target.files) return;
        this.setState({loading: true});

        compressImageFile(e.target.files[0], {size: 300 * 1000})
            .then(({base64Data, size, fileName}) => {
                images.push(<span><img src={base64Data} alt={fileName}/> data size: {size / 1000} K</span>);
                this.setState({images, loading: false});
            })
            .catch(() => {
                this.setState({loading: false});
            });
    };

    render() {
        const {images, loading} = this.state;
        return (
            <div>
                <p>图片等比压缩、固定大小压缩、获取zip中图片并处理等功能</p>
                <input type="file" accept="image/*" onChange={this.handleChange}/>
                {loading ? '处理中。。。' : '处理完成'}
                {images.map((item, index) => <div key={index}>{item}</div>)}
            </div>
        );
    }
}
