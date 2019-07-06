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
    console.log(errors);
    this.setState({errors});

    if (errors) return;
    //call server
    //const userName = this.username.current.value;
    console.log('Submitted');
  };

  handleChange = ({currentTarget: input}) => {
    const account = {...this.state.account};
    account[input.name] = input.value;
    this.setState({account});
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
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
