import React, {Component} from 'react';

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
          <div className="form-group">
            <label for="username">Username</label>
            <input
              autoFocus
              name="username"
              value={this.state.account.username}
              onChange={this.handleChange}
              ref={this.username}
              type="text"
              className="form-control"
              id="username"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              name="password"
              value={this.state.account.password}
              onChange={this.handleChange}
              className="form-control"
              id="password"
              aria-describedby="passwordHelp"
            />
          </div>
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
