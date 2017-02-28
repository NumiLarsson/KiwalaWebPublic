import React, { Component } from 'react';
import { connect } from 'react-redux';
import Api from '../../api/Api';
import { setEmail, setPassword, setPassword2, toggleRegister, logout, finishLogin} from '../../actions/login';
import './styles/loginscreen.css';

class Login extends Component {
    
    constructor() {
        super();
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.setPassword2 = this.setPassword2.bind(this);
        this.loginWithEmail = this.loginWithEmail.bind(this);
        this.loginWithFacebook = this.loginWithFacebook.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.logout = this.logout.bind(this);
        this.registerWithEmail = this.registerWithEmail.bind(this);
        this.validate = this.validate.bind(this);
    }

    setEmail(event) {
        this.props.setEmail(event.target.value);
    }

    setPassword(event) {
        this.props.setPassword(event.target.value);
    }

    setPassword2(event) {
        this.props.setPassword2(event.target.value);
    }

    loginWithEmail() {
        Api.auth.loginWithEmail(this.props.email, this.props.password)
        .then(() => {
            this.props.finishLogin();
        })
        .catch(err => {
            console.log(err);
        })
    }

    loginWithFacebook() {
        Api.auth.loginWithFacebookPopup()
        .then(() => {
            this.props.finishLogin();
        })
        .catch(err => {
            console.log(err);
        })
    }

    registerWithEmail() {
        let {passed, message} = this.validate();
        
        if (passed) {
            Api.auth.createUser(this.props.email, this.props.password)
            .then(() => {
                this.props.finishLogin();
            })
            .catch(err => {
                console.log(err);
            })
        } else {
            console.log(message);
        }
    }

    validate() {
        let message = '';
        
        if(this.props.password.length < 6) {
            message = 'The password is too short, minimum 6 characters';
            return {passed: false, message};
        } else if(this.props.password !== this.props.password2) {
            message = 'The passwords are not equal';
            return {passed: false, message};
        } else {
            return {passed: true, message};
        }
    }

    submitForm(e) {
        e.preventDefault();
        if (this.props.register) {
            this.registerWithEmail();
        } else {
            this.loginWithEmail();
        }
    }

    logout() {
        this.props.logout();
    }

    render() {
        // If user is logged in
        if(this.props.user && !this.props.user.isAnonymous) {
            return (
                <div className="login-screen">
                    <div className="login-screen__content">
                        <button className="login-screen__button red" type="button" onClick={this.logout}><i className="material-icons">person</i><span>Logout</span></button>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="login-screen">
                    <div className="login-screen__content">
                        <button type="button" className="login-screen__button login-screen__button--with-facebook" onClick={this.loginWithFacebook}>Login with Facebook</button>
                        <span className="login-screen--separate">OR</span>
                        <form onSubmit={this.submitForm}>
                            <input className="login-screen__input login-screen--separate" required type="email" placeholder="Email address" onChange={this.setEmail}/>
                            <input className="login-screen__input login-screen--separate" required type="password" placeholder="Password" onChange={this.setPassword}/>
                            {this.props.register && <input className="login-screen__input login-screen--separate" required type="password" placeholder="Password again" onChange={this.setPassword2}/>}
                            <button 
                                className="login-screen__button login-screen--separate" 
                                type="submit">
                                    <i className="material-icons">person</i><span>{!this.props.register ? 'Login' : 'Register'}</span>
                            </button>
                        </form>
                        <div className='login-screen--separate'><button className="login-screen__button--flat" onClick={this.props.toggleRegister}>{!this.props.register ? 'Register' : 'Login'}</button></div>
                    </div>
                </div>
            )
        }
    }
}

//Maps the state in our store to the props property of the Example object.
const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        email: state.login.email,
        password: state.login.password,
        password2: state.login.password2,
        register: state.login.register     
    }
}

//Wrapping the action creators in a dispatch call and allowing us to 
//access them through the props property of the Example object. 
const mapDispatchToProps = {
    logout,
    setEmail,
    setPassword,
    setPassword2,
    toggleRegister,
    finishLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);