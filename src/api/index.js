// 这个文件可以考虑用脚本生成
// 这里都是类，不可直接使用，需要实例化之后使用
import System from './system';
import User from './user';

export const allApiClass = {
    System,
    User,
};

export default {
    system: new System(),
    User: new User(),
};
