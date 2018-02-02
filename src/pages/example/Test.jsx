import React from 'react';
import {Button} from 'antd';
import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import gql from 'graphql-tag';

const client = new ApolloClient({
    link: new HttpLink({uri: '/graphql'}),
    cache: new InMemoryCache()
});

export const PAGE_ROUTE = '/test';

function getViewportSize(w) {
    //使用指定的窗口， 如果不带参数则使用当前窗口
    w = w || window;

    //除了IE8及更早的版本以外，其他浏览器都能用
    if (w.innerWidth != null)
        return {w: w.innerWidth, h: w.innerHeight};

    //对标准模式下的IE（或任意浏览器）
    const d = w.document;
    if (document.compatMode === 'CSS1Compat')
        return {w: d.documentElement.clientWidth, h: d.documentElement.clientHeight};

    //对怪异模式下的浏览器
    return {w: d.body.clientWidth, h: d.body.clientHeight};
}


function isScrollToPageBottom(threshold = 20) {
    //文档高度
    const documentHeight = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight,
        document.body.scrollHeight
    );
    const viewPortHeight = getViewportSize().h;
    const scrollHeight = window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop || 0;

    return documentHeight - viewPortHeight - scrollHeight < threshold;
}

export default class Test extends React.Component {
    state = {
        users: [],
    };

    componentDidMount() {
        // this.handleSearch();

        document.addEventListener('scroll', (e) => {
            console.log(isScrollToPageBottom());
            if(isScrollToPageBottom(50)) { // 还有50像素就滚动到底部是

            }
        });
    }

    handleSearch = () => {
        const query = gql(`
            query getTest {
              users {
                name
                nameLabel
                age
                job
              }
            }
        `);
        client.query({query}).then(({data: {users}}) => {
            console.log(users);
            this.setState({users});
        }).catch(error => {
            console.log(Object.keys(error));
            console.log(error.graphQLErrors);
            console.log(error.networkError);
            console.log(error.message);
            console.log(error.extraInfo);
        });
    };

    render() {
        const {users} = this.state;
        return (
            <div>
                {users.map((item, index) => {
                    return (
                        <div key={`${index}`}>{item.name}</div>
                    );
                })}
                <div>
                    <Button onClick={this.handleSearch}>获取用户</Button>
                </div>
                <div style={{height: 3000, background: 'green'}}/>
            </div>
        );
    }
}
