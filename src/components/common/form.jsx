import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";

class Form extends Component {
  state = {
    data: "",
    errors: ""
  };
  validate = () => {
    const options = { abortEarly: false };
    const result = Joi.validate(this.state.data, this.schema, options);

    const errors = {};
    if (!result.error) return null;

    for (var item of result.error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
    // console.log(result);
    // const errors = {};

    // const {username, password} = this.state.data;
    // if (username.trim() === '') errors.username = 'Username is required.';
    // if (password.trim() === '') errors.password = 'Password is required.';

    // // if (errors === {}) return null;
    // // else return errors;

    // return Object.keys(errors).length === 0 ? null : errors;
  };
  validateProperty = ({ name, value }) => {
    // if (name === 'username') {
    //   if (value === '') return 'Username is required.';
    //   //...
    // }
    // if (name === 'password') {
    //   if (value === '') return 'Password is required.';
    //   //...
    // }

    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });

    if (errors) return;

    this.doSubmit();
  };
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };
  renderButton = label => {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  };
  renderInput = (name, label, id, aria, autoFocus, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        autoFocus={autoFocus}
        name={name}
        label={label}
        type={type}
        value={data[name]}
        onChange={this.handleChange}
        id={id}
        aria={aria}
        error={errors[name]}
      />
    );
  };
}

export default Form;
