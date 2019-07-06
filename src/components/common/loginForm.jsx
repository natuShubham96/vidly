import React, {Component} from 'react';
import Input from './input';
class LoginForm extends Component {
  state = {
    account: {username: '', password: ''},
    errors: {},
  };
  username = React.createRef();

  //   componentDidMount() {
  //     this.username.current.focus();
  //   }

  validate = () => {
    const errors = {};

    const {username, password} = this.state.account;
    if (username.trim() === '') errors.username = 'Username is required.';
    if (password.trim() === '') errors.password = 'Password is required.';

    // if (errors === {}) return null;
    // else return errors;

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({errors: errors || {}});

    if (errors) return;
    //call server
    //const userName = this.username.current.value;
    console.log('Submitted');
  };

  validateProperty = ({name, value}) => {
    if (name === 'username') {
      if (value === '') return 'Username is required.';
      //...
    }
    if (name === 'password') {
      if (value === '') return 'Password is required.';
      //...
    }
  };

  handleChange = ({currentTarget: input}) => {
    const errors = {...this.state.errors};
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = {...this.state.account};
    account[input.name] = input.value;
    this.setState({account, errors});
  };

  render() {
    return (
      <div>
        <h1>LOGIN</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            autoFocus={true}
            name="username"
            label="Username"
            type="text"
            value={this.state.account.username}
            onChange={this.handleChange}
            id="username"
            aria="emailHelp"
            error={this.state.errors.username}
          />
          <Input
            autoFocus={false}
            name="password"
            label="Password"
            type="password"
            value={this.state.account.password}
            onChange={this.handleChange}
            id="password"
            aria="passwordHelp"
            error={this.state.errors.password}
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
