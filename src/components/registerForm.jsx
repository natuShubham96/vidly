import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';

class RegisterForm extends Form {
  state = {
    data: {username: '', password: '', name: ''},
    errors: '',
  };
  schema = {
    username: Joi.string()
      .email()
      .required()
      .label('Username'),
    password: Joi.string()
      .min(5)
      .required()
      .label('Password'),
    name: Joi.string()
      .required()
      .label('Name'),
  };

  doSubmit = () => {
    //call server
    //const userName = this.username.current.value;
    console.log('Submitted');
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput(
            'username',
            'Username',
            'username',
            'usernameHelp',
            true,
            'email'
          )}
          {this.renderInput(
            'password',
            'Password',
            'password',
            'passwordHelp',
            false
          )}
          {this.renderInput('name', 'Name', 'name', 'nameHelp', false)}
          {this.renderButton('Register')}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
