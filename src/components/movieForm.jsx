import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import queryString from 'query-string';
import _ from 'lodash';
import {getGenres} from '../services/fakeGenreService';
import {getMovie, saveMovie} from '../services/fakeMovieService';

class MovieForm extends Form {
  state = {
    data: {title: '', genreId: '', numberInStock: '', dailyRentalRate: ''},
    genres: [],
    errors: {},
  };
  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label('Title'),
    genreId: Joi.string()
      .required()
      .label('Genre'),
    numberInStock: Joi.number()
      .integer()
      .required()
      .min(0)
      .max(100)
      .label('Number In Stock'),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label('Daily Rental Rate'),
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({genres});

    const movieId = this.props.match.params.id;
    if (movieId === 'new') return; //we don't want to populate form with existing movie object

    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace('/not-found'); // return is used, to stop rest of the code from executing

    this.setState({data: this.mapToViewModel(movie)});
    //const result = queryString.parse(this.props.location.search);
    // if (!_.isEmpty(result)) {
    //   const data = {
    //     title: result.title,
    //     genre: result.genre,
    //     numberinstock: result.numberinstock,
    //     rate: result.dailyRentalRate,
    //   };
    //   this.setState({data});
    // }
  }

  mapToViewModel = movie => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  doSubmit = () => {
    //call server
    //const userName = this.username.current.value;
    saveMovie(this.state.data);
    this.props.history.push('/movies');
    // const {title, genre, numberinstock, rate} = this.state.data;
    // this.props.history.push(
    //   `/movies?title=${title}&genre=${genre}&numberInStock=${numberinstock}&dailyRentalRate=${rate}`
    //);
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
          {this.renderSelect('genreId', 'Genre', this.state.genres)}
          {this.renderInput(
            'numberInStock',
            'Number In Stock',
            'stock',
            'stockeHelp',
            false,
            'number'
          )}
          {this.renderInput(
            'dailyRentalRate',
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
