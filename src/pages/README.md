# pages
存放各个与路由连接的页面

## 如何判断页面是如何进入的

使用Link进行页面跳转时，添加 `state: {from: 'xxx'}`;

使用`history.push`、`history.replace`方式跳转时，添加 `state: {from: 'xxx'}`;

系统菜单`state: {from: 'menu'}`
相关代码如下
```
<Menu.Item key={key}>
    <Link to={{
        pathname: path,
        state: {from: 'menu'}
    }}>
        {title}
    </Link>
</Menu.Item>
```

通过action类型、from标记进行判断（好像只能部分区分）
```
const {action} = this.props.history;
const {from} = this.props.location.state;
console.log(action, from);
if (action === 'PUSH') { // POP REPLACE
    if (from === 'menu') {
        // 菜单点击进入的
    }
}

if (action === 'POP') { // POP REPLACE
    if (from === 'menu') {
        // 两种情况：1. 刷新页面 2.点击浏览器的前进后退按钮
    }
}
```
