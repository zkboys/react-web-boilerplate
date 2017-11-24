import {getActionsAndReducers} from 'zk-redux';
import pageInitState from '../pages/page-init-state';

// models key 即对应 $action中的key
const models = {
    menu: require('./menu'), // this.props.$action.menu
    pageHead: require('./page-head'),
    side: require('./side'),
    global: require('./global'),
};

// 这里需要指定同步数据的key，对应meta中的sync字段，对应的是reducers中的数据
const syncKeys = [
    'settings',
    'side',
    'menu',
];

export default getActionsAndReducers({models, syncKeys, pageInitState});
