import MockAdapter from 'axios-mock-adapter';
import {mockInstance} from '../commons/axios';
import mockMenu from './mock-menu';
import mockUser from './mock-user';

const mock = new MockAdapter(mockInstance);

mockMenu(mock);
mockUser(mock);
