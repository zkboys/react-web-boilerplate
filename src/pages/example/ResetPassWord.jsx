import React from 'react';
import RouterPager from '../../component/RouterPager'
import {connect} from 'react-redux';
import style from './ResetPassWord.scss';
import fetch from 'sx-fetch'

@fetch.inject()
@connect()
export default class ResetPassWord extends RouterPager {
    state = {
        urlflag: '1',
        timeflag: true,
        flag: true,
        timers: '获取验证码',
        valueInputPhone: '',
        valueInputSms: '',
        valueInputPwd: '',
        valueInputImgCode: ''
    };

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    //图形验证码
    /* getImgCode(){
     this.props.$fetch.get(`/massage/sendImgCode`).then((result)=>{
         this.props.setKeyValue("imageValid",result);
             },(error)=> {
         error.message && toast(error.message);
         });
     }*/

    //获得手机验证码
    getTime(i) {
        if (!this.getSmsCode()) {
            return
        }
        this.setState({timeflag: false})
        let timmer = setInterval(() => {
            this.setState({flag: false, timers: i-- + '"'});
            if (i === -1) {
                clearInterval(timmer);
                this.setState({timers: "重新获取", timeflag: true, flag: true});
            }
        }, 1000);
    }

    getSmsCode() {
        if (!this.state.valueInputPhone) {
            this.props.toast.info('请输入手机号');
            return false
        }
        if (!/^1[34578]\d{9}$/.test(this.state.valueInputPhone)) {
            this.props.toast.info('请输入合法的手机号');
            return false;
        }
        // 发送验证码
        /*this.props.$fetch.get(`/massage/sendPhoneCode/`,{
            type:type,
            mblNo:this.state.valueInputPhone,
        }).then((result)=> {
            this.props.setKeyValue('phoneValidCode',result);
        },(error)=> {
            error.message && toast(error.message);
        })*/
        return true
    }

    handlePhoneChange = (e) => {
        const value = e.target.value;
        this.setState({valueInputPhone: value});
    };

    handleImgCodeChange = (e) => {
        const value = e.target.value;
        this.setState({valueInputImgCode: value});
    };

    handleSmsChange = (e) => {
        const value = e.target.value;
        this.setState({valueInputSms: value});
    };

    handlePwdChange = (e) => {
        const value = e.target.value;
        this.setState({valueInputPwd: value});
    };

    // 重置密码按钮点击提交
    handleSubmit = () => {
        const {
            valueInputPhone,
            valueInputImgCode,
            valueInputSms,
            valueInputPwd,
        } = this.state;

        // TODO 进行 图片验证码 的验证

        const params = {
            userId: 11, // TODO userId 在哪儿？
            mblNo: valueInputPhone,
            smsCd: valueInputSms,
            password1: valueInputPwd,
            password2: valueInputPwd, // TODO 页面设计只有一个密码，这里有新密码和重复密码，如何传值？
            pwdType: 1, // TODO 密码类型 1：登录面面 2：交易面面，如何区分？
            osType: 11, // TODO 操作系统是什么鬼？如何赋值？
        };


        // TODO 这里的请求地址有两个 登录密码 和 交易密码 如何区分？
        this.props.$fetch.get(`/ptm/my/pwd/resetLoginPwd`, params)
            .then((result) => {

            }, (error) => {

            })
    };

    render() {

        let submitBtnDisabled = false;

        // 如果手机号没数据，按钮禁用
        if (!this.state.valueInputPhone) {
            submitBtnDisabled = true;
        }

        // 如果图片验证码没输入，按钮禁用
        if (!this.state.valueInputImgCode) {
            submitBtnDisabled = true;
        }

        return (
            <div className={style.content}>
                <div className={this.state.valueInputPhone ? style.inputHasValue : style.inputDiv}>
                    <input
                        value={this.state.valueInputPhone}
                        onChange={this.handlePhoneChange}
                        placeholder="请输入本人手机号"/>
                </div>
                <div className={style.inputDiv}>
                    <input
                        value={this.state.valueInputImgCode}
                        onChange={this.handleImgCodeChange}
                        placeholder="图片验证码"/>
                    <div className={style.getCode}>
                        2joro
                    </div>
                </div>
                <div className={style.inputDiv}>
                    <input
                        value={this.state.valueInputSms}
                        onChange={this.handleSmsChange}
                        placeholder="短信验证码"/>
                    <div className={this.state.flag ? style.getMessCode : style.getMessNumber}
                         onClick={() => {
                             this.state.timeflag ? this.getTime(59) : ''
                         }}>
                        {this.state.timers}
                    </div>
                </div>
                <div className={style.clear}/>
                <div className={style.inputDiv}>
                    <input
                        value={this.state.valueInputPwd}
                        onChange={this.handlePwdChange}
                        placeholder="设置密码：6-12位数字+字母组合"/>
                </div>
                <div
                    className={submitBtnDisabled ? style.btnDisabled : style.resetBtn}
                    onClick={submitBtnDisabled ? () => null : this.handleSubmit}
                >
                    重置密码
                </div>
            </div>
        )
    }
}

