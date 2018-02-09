import Nightmare from 'nightmare';
// https://github.com/segmentio/nightmare

describe('Login', () => {
    let page;
    beforeEach(() => {
        page = Nightmare({show: true}); // 显示浏览器
        page.goto('http://localhost:8000/login');
    });

    it('登录失败，显示"用户名或密码错误"', async () => {
        const text = await page.type('#userName', 'mockuser')
            .type('#password', 'wrong_password')
            .click('button[type="submit"]')
            .wait(3000) // 等待三秒钟
            .evaluate(() => document.body.innerHTML)
            .end();
        expect(text).toContain('用户名或密码错误');
    });

    it('登录成功，跳转到首页', async () => {
        const text = await page.type('#userName', 'test')
            .type('#password', '111')
            .click('button[type="submit"]')
            .wait('.no-print')
            .evaluate(() => document.body.innerHTML)
            .end();

        expect(text).toContain('<h1>React Web</h1>');
    });
});
