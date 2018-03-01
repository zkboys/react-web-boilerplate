export default [
    {key: 'top1', icon: 'fa-file-code-o', text: '顶部菜单1'},
    {key: 'top11', parentKey: 'top1', icon: 'fa-file-code-o', text: '子菜单1', path: '/sub1'},
    {key: 'top2', icon: 'fa-file-code-o', text: '顶部菜单2'},
    {key: 'top21', parentKey: 'top2', icon: 'fa-file-code-o', text: '子菜单2', path: '/sub2'},

    {key: 'example', text: 'Example', icon: 'fa-file-code-o', path: ''},

    {key: 'animation-table', parentKey: 'example', text: '表格', icon: 'table', path: '/example/zk-table'},
    {key: 'table-drag-column', parentKey: 'example', text: '表头可拖拽', icon: 'table', path: '/example/table-drag-column'},
    {key: 'table-drag-row', parentKey: 'example', text: '行拖拽排序', icon: 'table', path: '/example/table-drag-row'},
    {key: 'page-generator', parentKey: 'example', text: '页面生成工具', icon: 'table', path: '/example/page-generator', order: 10010},

    {key: 'dashboard', parentKey: 'example', text: 'Dashboard', icon: 'dashboard', order: 10009},
    {key: 'dashboard/analysis', parentKey: 'dashboard', text: '分析页', path: '/dashboard/analysis'},
    {key: 'dashboard/monitor', parentKey: 'dashboard', text: '监控页', path: '/dashboard/monitor'},
    {key: 'dashboard/workplace', parentKey: 'dashboard', text: '工作台', path: '/dashboard/workplace'},

    {key: 'frame', parentKey: 'example', text: 'iframe页面', icon: 'fa-external-link', order: 10008},
    {key: 'frame-baidu', parentKey: 'frame', text: '百度', url: 'http://www.baidu.com'},
    {key: 'frame-antd', parentKey: 'frame', text: 'antd design', url: 'https://ant.design/'},
    {key: 'frame-antd-pro', parentKey: 'frame', text: 'antd design pro', url: 'https://preview.pro.ant.design/'},

    {key: 'user', parentKey: 'example', text: '人员管理', icon: 'fa-users', order: 10007},
    {key: 'user-search', parentKey: 'user', text: '人员查询', path: '/users'},


    {
        key: 'example-tab-with-route',
        parentKey: 'example',
        text: '路由标签页很长的一个菜单名字',
        icon: 'fa-users',
        path: '/example/tab-with-route/tab/:activeKey',
        order: 1001,
    },
];
