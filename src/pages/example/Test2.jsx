import React, {Component} from 'react';
import './Test2.css';

export const PAGE_ROUTE = '/test/2';


export default class Test2 extends Component {
    state = {};

    componentWillMount() {

    }

    componentDidMount() {

    }

    render() {
        const dataSource = [
            {
                id: '1',
                time: {
                    year: '2018',
                },
                event: '理财大事记',
            },
            {
                id: '2',
                time: {
                    year: '2018',
                    monthDay: '10.18',
                },
                event: (
                    <div style={{color: 'blue'}}>
                        <div>开通自动转入80天</div>
                        <div>已赚取10000.00元</div>
                    </div>
                ),
            },
            {
                id: '3',
                time: {
                    year: '2018',
                    monthDay: '10.04',
                },
                event: (
                    <div>
                        <div>首次自动转入余额宝1000.00元</div>
                        <div>进入随富宝</div>
                    </div>
                ),
            },
            {
                id: '333',
                time: {
                    year: '2018',
                    monthDay: '10.04',
                },
                event: '额外添加',
            },
            {
                id: '33',
                time: {
                    year: '2018',
                    monthDay: '10.04',
                },
                event: (
                    <div>
                        <div>首次自动转入余额宝1000.00元</div>
                        <div>进入随富宝</div>
                    </div>
                ),
            },
            {
                id: '4',
                event: '一路随行',
            },
        ];
        return (
            <div>
                <table className="container">
                    <tbody>
                    {dataSource.map((item, index) => {
                        const {id, time = {}, event} = item;
                        const {year, monthDay} = time;
                        // 第一行，头部行
                        if (index === 0) {
                            return (
                                <tr key={id}>
                                    <td className="title-time time-col">
                                        {year}年 △

                                        <div className="icon-circle first-one"/>
                                        <div className="line-down first-one"/>
                                    </td>
                                    <td className="title-event">
                                        {event}
                                    </td>
                                </tr>
                            );
                        }
                        // 最后一行，尾部行
                        if (index === dataSource.length - 1) {
                            return (
                                <tr key={id}>
                                    <td className="time-col">
                                        &nbsp;
                                        <div className="line-up last-one"/>
                                        <div className="icon-circle last-one">GO</div>
                                    </td>
                                    <td>{event}</td>
                                </tr>
                            );
                        }
                        // 中间部分
                        return (
                            <tr key={id}>
                                <td className="time-col">
                                    <div className="time-year">{year}</div>
                                    <div className="time-month-day">{monthDay}</div>
                                    <div className="line-up"/>
                                    <div className="icon-circle common-circle"/>
                                    <div className={index === dataSource.length - 2 ? 'line-down last-one' : 'line-down'}/>
                                </td>
                                <td>
                                    {event}
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}

