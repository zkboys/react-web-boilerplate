import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import {virtualize,} from 'react-swipeable-views-utils';

const VirtualizeSwipeableViews = virtualize(SwipeableViews);

const styles = {
    root: {
        padding: '0 50px', // 左右留边,可以显示出左右两侧的小图
    },
    slide: {
        padding: '24px 16px',
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        display: 'flex',
    },
    img: {
        width: '100%',
        display: 'block',
        borderRadius: '5px',
        boxShadow: '0 2.5px 5px #cdd6e9',
        transition: 'transform 300ms',
    },
};

export default class Banner extends React.Component {
    static propTypes = {
        imgs: PropTypes.array,
        auto: PropTypes.bool,
        speed: PropTypes.number,
    };

    static defaultProps = {
        imgs: [],
        speed: 5000,
        auto: true,
    };
    state = {
        index: 0,
    };

    componentDidMount() {
        const {speed, auto} = this.props;

        if (auto) {
            setInterval(() => {
                this.handleChangeIndex(this.state.index + 1);
            }, speed);
        }
    }

    handleChangeIndex = index => {
        this.setState({index});
    };

    render() {
        const {index} = this.state;
        const {imgs} = this.props;
        return (
            <VirtualizeSwipeableViews
                index={index}
                style={styles.root}
                onChangeIndex={this.handleChangeIndex}
                slideRenderer={({index, key}) => {
                    const currentIndex = this.state.index;

                    let imgIndex = index % imgs.length;
                    imgIndex = imgIndex < 0 ? imgIndex + imgs.length : imgIndex; // index 有时候为负数
                    const album = imgs[imgIndex];

                    // 当前显示的slide,不缩放,其他的缩小;
                    const scale = currentIndex === index ? 1 : 0.8;
                    const opacity = currentIndex === index ? 1 : 0.7;

                    return (
                        <img
                            key={key}
                            style={Object.assign(
                                {
                                    opacity,
                                    transform: `scale(${scale})`,
                                },
                                styles.img
                            )}
                            src={album.src}
                            alt={album.alt}
                            onClick={album.onClick}
                        />
                    );
                }}
            />
        );
    }
}