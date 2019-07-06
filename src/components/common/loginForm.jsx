import React, {Component} from 'react';
import Input from './input';
class LoginForm extends Component {
  state = {
    account: {username: '', password: ''},
  };
  username = React.createRef();

  //   componentDidMount() {
  //     this.username.current.focus();
  //   }

  handleSubmit = e => {
    e.preventDefault();

    //call server
    const userName = this.username.current.value;
    console.log('Submitted', userName);
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
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
