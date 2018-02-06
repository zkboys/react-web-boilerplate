function checkPermissions(a, b, target, error) {
    return a === b ? target : error;
}

const target = 'ok';
const error = 'error';

describe('test CheckPermissions', () => {
    it('Correct string permission authentication', () => {
        expect(checkPermissions('user', 'user', target, error)).toEqual('ok');
    });
    it('Correct string permission authentication', () => {
        expect(checkPermissions('user', 'NULL', target, error)).toEqual('error');
    });
});
