export default [
    {key: 'top1', icon: 'fa-file-code-o', text: '顶部菜单1'},
    {key: 'top11', parentKey: 'top1', icon: 'fa-file-code-o', text: '子菜单1', path: '/sub1'},
    {key: 'top2', icon: 'fa-file-code-o', text: '顶部菜单2'},
    {key: 'top21', parentKey: 'top2', icon: 'fa-file-code-o', text: '子菜单2', path: '/sub2'},

    {key: 'example', text: 'Example', icon: 'fa-file-code-o', path: ''},

    {key: 'dashboard', parentKey: 'example', text: 'Dashboard', icon: 'dashboard', order: 10009},
    {key: 'dashboard/analysis', parentKey: 'dashboard', text: '分析页', path: '/dashboard/analysis'},
    {key: 'dashboard/monitor', parentKey: 'dashboard', text: '监控页', path: '/dashboard/monitor'},
    {key: 'dashboard/workplace', parentKey: 'dashboard', text: '工作台', path: '/dashboard/workplace'},

    {key: 'frame', parentKey: 'example', text: 'iframe页面', icon: 'dashboard', order: 10008},
    {key: 'frame-baidu', parentKey: 'frame', text: '百度', url: 'http://www.baidu.com'},
    {key: 'frame-antd', parentKey: 'frame', text: 'antd design', url: 'https://ant.design/'},
    {key: 'frame-antd-pro', parentKey: 'frame', text: 'antd design pro', url: 'https://preview.pro.ant.design/'},

    {key: 'user', parentKey: 'example', text: '人员管理', icon: 'fa-users', order: 10007},
    {key: 'user-search', parentKey: 'user', text: '人员查询', icon: 'fa-search', path: '/users'},


    {
        key: 'example-tab-with-route',
        parentKey: 'example',
        text: '路由标签页很长的一个菜单名字',
        icon: 'fa-users',
        path: '/example/tab-with-route/tab/:activeKey',
        order: 1001,
    },
    {
        key: 'example-table-cell',
        parentKey: 'example',
        text: '可编辑单元格',
        icon: 'fa-users',
        path: '',
        order: 1000,
    },
    {
        key: 'example-table-cell-cell',
        parentKey: 'example-table-cell',
        text: '单独单元格编辑',
        icon: 'fa-users',
        path: '/example/editable-cell/cell',
    },
    {
        key: 'example-table-cell-cell-row',
        parentKey: 'example-table-cell',
        text: '整行可编辑',
        icon: 'fa-users',
        path: '/example/editable-cell/row',
    },
    {
        key: 'zk-axios',
        parentKey: 'example',
        text: 'ajax请求封装',
        icon: 'fa-users',
        path: '/example/zk-axios',
    },

    {
        key: 'example-menus-promise',
        parentKey: 'example',
        text: '菜单&权限',
        icon: 'fa-users',
        path: '/organization/menus',
    },
    {
        key: 'example-form-layout',
        parentKey: 'example',
        text: '表单布局',
        icon: 'fa-users',
        path: '/form/layout',
    },
    {
        key: 'example-css-module',
        parentKey: 'example',
        text: 'css module',
        icon: 'fa-users',
        path: '/example/css',
    },
    {
        key: 'example-users',
        parentKey: 'example',
        text: '用户管理',
        icon: 'fa-users',
        path: '/example/users',
    },
    {
        key: 'example-crop-image',
        parentKey: 'example',
        text: '图片裁剪',
        icon: 'fa-users',
        path: '/example/crop-image',
    },
    {
        key: 'example-zip-file',
        parentKey: 'example',
        text: '图片压缩',
        icon: 'fa-users',
        path: '/example/zip-file',
    },
    {
        key: 'example-sync-tree',
        parentKey: 'example',
        text: '树',
        icon: 'fa-users',
        path: '/example/sync-tree',
    },
    {
        key: 'example-test',
        parentKey: 'example',
        text: '测试',
        icon: 'fa-users',
        path: '/example/test',
    },
    {
        key: 'example-test222',
        parentKey: 'example',
        text: '测试2',
        icon: 'fa-users',
        path: '/example/test2',
    },
    {
        key: 'example-promise-ajax',
        parentKey: 'example',
        text: 'promise-ajax',
        icon: 'fa-th-list',
        path: '/example/promise-ajax',
    },
    {
        key: 'example-actions',
        parentKey: 'example',
        text: 'actions',
        icon: 'fa-th-list',
        path: '/example/actions',
    },
    {
        key: 'example-font-icon',
        parentKey: 'example',
        text: 'font-icon',
        icon: 'fa-th-list',
        path: '/example/font-icon',
    },
    {
        key: 'example-iframe',
        parentKey: 'example',
        text: '测试iframe',
        icon: 'fa-th-list',
        path: '/example/iframe-test',
        url: 'http://image.baidu.com/',
    },
    {
        key: 'example-iframe2',
        parentKey: 'example',
        text: '测试iframe2',
        icon: 'fa-th-list',
        path: '/example/iframe-test2',
        url: 'https://vuex.vuejs.org/en/',
    },
    {
        key: 'example-iframe3',
        parentKey: 'example',
        text: '测试iframe3',
        icon: 'fa-th-list',
        path: '/example/iframe-test3',
        url: 'https://vuex.vuejs.org/',
    },
    {
        key: 'example-text-menu',
        parentKey: 'example',
        text: '一级菜单',
        icon: 'fa-th-list',
        path: '',
    },
    {
        key: 'example-text-menu12',
        parentKey: 'example-text-menu',
        text: '二级菜单1',
        icon: 'fa-th-list',
        path: '/test/menu/12',
    },
    {
        key: 'example-text-menu13',
        parentKey: 'example-text-menu',
        text: '二级菜单2',
        icon: 'fa-th-list',
        path: '',
    },
    {
        key: 'example-text-menu131',
        parentKey: 'example-text-menu13',
        text: '三级菜单1',
        icon: 'fa-th-list',
        path: '/test/menu/131',
    },
    {
        key: 'example-text-menu132',
        parentKey: 'example-text-menu13',
        text: '三级菜单2',
        icon: 'fa-th-list',
        path: '/test/menu/132',
    },
];
