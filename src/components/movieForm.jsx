import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';

class MovieForm extends Form {
  state = {
    data: {title: '', genre: '', numberinstock: '', rate: ''},
    errors: {},
  };
  schema = {
    title: Joi.string()
      .required()
      .label('Title'),
    genre: Joi.string()
      .required()
      .label('Genre'),
    numberinstock: Joi.number()
      .integer()
      .required()
      .min(0)
      .label('Number In Stock'),
    rate: Joi.number()
      .required()
      .max(10)
      .label('Daily Rental Rate'),
  };

  doSubmit = () => {
    //call server
    //const userName = this.username.current.value;
    this.props.history.push('/movies');
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title', 'title', 'titleHelp', true)}
          {this.renderInput('genre', 'Genre', 'genre', 'genreHelp', false)}
          {this.renderInput(
            'numberinstock',
            'Number In Stock',
            'stock',
            'stockeHelp',
            false,
            'number'
          )}
          {this.renderInput(
            'rate',
            'Rate',
            'rate',
            'rateHelp',
            false,
            'number'
          )}
          {this.renderButton('Save')}
        </form>
      </div>
    );
  }
}

export default MovieForm;
