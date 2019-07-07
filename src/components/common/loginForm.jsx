import React, {Component} from 'react';
import Joi from 'joi-browser';
import Input from './input';
import Form from './form';

class LoginForm extends Form {
  schema = {
    username: Joi.string()
      .required()
      .label('Username'),
    password: Joi.string()
      .required()
      .label('Password'),
  };
  state = {
    data: {username: '', password: ''},
    errors: {},
  };
  username = React.createRef();

  //   componentDidMount() {
  //     this.username.current.focus();
  //   }

  doSubmit = () => {
    //call server
    //const userName = this.username.current.value;
    console.log('Submitted');
  };

  render() {
    return (
      <div>
        <h1>LOGIN</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput(
            'username',
            'Username',
            'username',
            'usernameHelp',
            true
          )}
          {this.renderInput(
            'password',
            'Password',
            'password',
            'passwordHelp',
            false,
            'password'
          )}
          {this.renderButton('Login')}
        </form>
      </div>
    );
  }
}

export default LoginForm;
