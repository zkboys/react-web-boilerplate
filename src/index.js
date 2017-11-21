import React from 'react';
import ReactDOM from 'react-dom';
import './polyfill';
import App from './App';
import './index.less';

if (process.env.NODE_ENV === 'development'
  || process.env.NODE_ENV === 'dev'
  || process.env.REACT_APP_BUILD_ENV === 'preview'
) {
  // dev 模式开启mock
  require('./mock/index');

  console.log('current mode is debug, mock is enabled');
}


ReactDOM.render(<App/>, document.getElementById('root'));
