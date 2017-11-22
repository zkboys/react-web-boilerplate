import MockAdapter from 'axios-mock-adapter';
import {mockInstance} from '../commons/axios';
import simplify from './simplify';

const mock = new MockAdapter(mockInstance);

simplify(mock, [
    require('./mock-menu'),
    require('./mock-test-ajax'),
    require('./mock-user')
]);



