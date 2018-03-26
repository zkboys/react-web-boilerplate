import React, {Component} from 'react';
import FEZipImage from '../../components/image-upload/FEZipImage';

export const PAGE_ROUTE = '/example/fe-zip-image';

export default class FEZIpImage extends Component {

    state = {
        value: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2067123202,1226091689&fm=173&app=25&f=JPEG?w=218&h=146&s=5B2001C75EBB388C71A584F30300C017',
    };

    handleChange = ({base64Data, size, fileName}) => {
        console.log(base64Data, size, fileName);
        this.setState({value: base64Data});
    };

    render() {
        const {value} = this.state;
        return (
            <FEZipImage
                onChange={this.handleChange}
                value={value}
            />
        );
    }
}
