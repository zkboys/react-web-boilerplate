import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import moment from "moment/moment";
import 'moment/locale/zh-cn';
import * as storage from 'zk-utils/lib/storage';
import * as zkRedux from 'zk-redux';
import handleSuccess from './commons/handle-success';
import {getCurrentLoginUser} from './commons';
import handleError from './commons/handle-error';
import {configureStore} from './models';
import './polyfill';
import App from './App';
import './index.less';

if (process.env.NODE_ENV === 'development'
    || process.env.NODE_ENV === 'dev'
    || process.env.REACT_APP_BUILD_ENV === 'preview'
) {
    // dev 模式开启mock
    require('./mock/index');

    console.log('current mode is development, mock is enabled');
}

// moment国际化为中国
moment.locale('zh-cn');

const currentLoginUser = getCurrentLoginUser();

// 初始化存储 设置存储前缀，用于区分不同用户的数据
storage.init({keyPrefix: currentLoginUser && currentLoginUser.id});

// 初始化redux
zkRedux.init({storage, handleError, handleSuccess});

// models store
const store = configureStore();

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));


