export default {
    'get /mock/test-ajax/array 1000': [123],
    'get /mock/test-ajax/object': {name: 123},
    'get /mock/test-ajax/function': (config) => {
        const {
            pageSize,
            pageNum,
        } = config.params;

        return new Promise((resolve) => {
            resolve([200, {
                pageNum,
                pageSize,
                total: 888,
                list: [123],
            }]);
        });
    },

    'put /mock/test-ajax/array': ['put'],
    'post /mock/test-ajax/object': {name: 123},
    'post /mock/test-ajax/function': (config) => {
        const {
            pageSize,
            pageNum,
        } = config.params;

        return new Promise((resolve) => {
            resolve([200, {
                pageNum,
                pageSize,
                total: 888,
                list: [123],
            }]);
        });
    },
};
