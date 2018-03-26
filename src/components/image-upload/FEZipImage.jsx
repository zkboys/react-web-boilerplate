import React, {Component} from 'react';
import {compressImageFile} from './image-utils';
import './FEZipImage.less';


export default class FEZIpImage extends Component {
    static defaultProps = {
        accept: 'image/*',
        onChange: () => true,
        beforeCompress: () => true,
        afterCompress: () => true,
        activeClassName: 'image-upload-btn-active'
    };

    handleChange = () => {
        const {onChange, beforeCompress, afterCompress} = this.props;
        const fileSelectorEl = this.fileSelectorInput;

        if (fileSelectorEl && fileSelectorEl.files && fileSelectorEl.files.length) {
            const files = fileSelectorEl.files;

            beforeCompress();

            compressImageFile(files[0], {size: 300 * 1000})
                .then(({base64Data, size, fileName}) => {
                    onChange({base64Data, size, fileName});
                    afterCompress();
                })
                .catch(() => {
                    afterCompress();
                });

        }
        fileSelectorEl.value = '';
    };

    render() {

        const {
            className,
            style,
            onChange,
            beforeCompress,
            afterCompress,
            accept,
            value,
            activeClassName,
            ...others
        } = this.props;

        return (
            <div
                style={{...style, backgroundImage: `url(${value})`}}
                className={`image-upload-btn ${className}`}
                {...others}
            >
                <input
                    ref={(input) => this.fileSelectorInput = input}
                    type="file"
                    accept={accept}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}
