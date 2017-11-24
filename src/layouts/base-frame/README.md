# 基础框架

## 特性

1. 头部固定
1. 菜单固定
1. 菜单可以滚动，并且隐藏滚动条
1. 菜单宽度可拖拽改变大小
1. 菜单可以展开/收起
1. 页面头部title自动获取/可设置
1. 页面头部面包屑自动获取/可设置
1. 页面头部可以隐藏/显示

## 页面头部
```jsx harmony

const {pageHead} = this.props.action;
pageHead.setTitle('自定义title');
pageHead.hide();
pageHead.show();
pageHead.setBreadcrumbs([
    {text: '自定义',icon: 'home',path: '/path'},
    {text: '面包屑',icon: 'home',path: '/path'},
    {text: '导航',icon: 'home',path: '/path'},
])
```
