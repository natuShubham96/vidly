import React, { Component } from "react";

class LoginForm extends Component {
  username = React.createRef();

  //   componentDidMount() {
  //     this.username.current.focus();
  //   }

  handleSubmit = e => {
    e.preventDefault();

    //call server
    const userName = this.username.current.value;
    console.log("Submitted", userName);
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
