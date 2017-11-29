// 约定：method url delay，各部分以单个空格隔开
// example: 'get /mock/users 1000' : users,
export default (mock, mocks) => mocks.forEach(item => Object.keys(item).forEach(key => {
    let method = key.split(' ')[0];
    const url = key.split(' ')[1];
    const delay = key.split(' ')[2] || 300;
    const result = item[key];
    method = `on${method.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())}`;

    if (typeof result === 'function') {
        mock[method](url).reply(result);
    } else {
        mock[method](url).reply(() => {
            // 加入延迟
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve([200, result]);
                }, delay);
            });
        });
    }
}));
