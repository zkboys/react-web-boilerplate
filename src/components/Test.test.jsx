import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Test from './Test';

describe('Shallow Rendering', function () {
    it('App\'s title should be Test', function () {
        const renderer = new ShallowRenderer();
        renderer.render(<Test/>);

        const result = renderer.getRenderOutput();
        expect(result.type).toBe('div');
        expect(result.props.children).toEqual(<h1>Test</h1>);
        expect(result.props.children.props.children).toEqual('Test');
    });
});
