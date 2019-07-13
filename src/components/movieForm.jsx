import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import queryString from 'query-string';
import _ from 'lodash';

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

  componentDidMount() {
    const result = queryString.parse(this.props.location.search);
    if (!_.isEmpty(result)) {
      const data = {
        title: result.title,
        genre: result.genre,
        numberinstock: result.numberinstock,
        rate: result.dailyRentalRate,
      };
      this.setState({data});
    }
  }

  doSubmit = () => {
    //call server
    //const userName = this.username.current.value;
    const {title, genre, numberinstock, rate} = this.state.data;
    this.props.history.push(
      `/movies?title=${title}&genre=${genre}&numberInStock=${numberinstock}&dailyRentalRate=${rate}`
    );
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput(
            'title',
            'Title',
            'title',
            'titleHelp',
            true,
            'text'
          )}
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
