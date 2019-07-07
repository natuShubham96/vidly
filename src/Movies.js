import React, {Component} from 'react';
import {getMovies} from './services/fakeMovieService';
import MovieTable from './components/movieTable';
import Pagination from './components/common/pagination';
import {paginate} from './utils/paginate';
import ListGroup from './components/common/listGroup';
import {getGenres} from './services/fakeGenreService';
import _ from 'lodash';

class Movies extends Component {
  state = {
    genres: [],
    movies: [],
    currentPage: 1,
    pageSize: 4,
    itemSize: 0,
    genreid: null,
    sortColumn: {path: 'title', order: 'asc'},
  };

  componentDidMount () {
    const genres = [{name: 'All Genres'}, ...getGenres ()];
    this.setState ({genres, movies: getMovies ()});
  }

  getPagedData = (
    allMovies,
    sortColumn,
    size,
    currentPage,
    pageSize,
    genreid
  ) => {
    const filteredMovies = genreid
      ? allMovies.filter (m => m.genre._id === genreid)
      : allMovies;

    const sortedOrder = _.orderBy (
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );
    const itemSize = filteredMovies.length;

    if (itemSize !== size) this.setState ({itemSize});

    const movies = paginate (sortedOrder, currentPage, pageSize);

    return {pagedMovies: movies};
  };

  handleDelete = title => {
    const movies = this.state.movies.filter (movie => movie.title !== title);
    this.setState ({movies});
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf (movie);
    movies[index] = {...movies[index]};
    movies[index].liked = !movies[index].liked;
    this.setState ({movies});
  };

  handlePageChange = page => {
    this.setState ({currentPage: page});
  };

  handleFilter = genreid => {
    this.setState ({genreid, currentPage: 1});
  };

  handleSort = sortColumn => {
    this.setState ({sortColumn});
  };

  handleNewMovie = () => {
    this.props.history.push ('/movies/new');
  };

  render () {
    const {
      itemSize: size,
      pageSize,
      currentPage,
      movies: allMovies,
      genreid,
      sortColumn,
    } = this.state;

    const pagedData = this.getPagedData (
      allMovies,
      sortColumn,
      size,
      currentPage,
      pageSize,
      genreid
    );

    if (allMovies.length === 0) {
      return <div>There are no movies in your database</div>;
    } else {
      return (
        <div className="row">
          <div className="col-3">
            <ListGroup
              Genres={this.state.genres}
              selectedItemId={this.state.genreid}
              onFilter={this.handleFilter}
            />
          </div>
          <div className="col">
            <button
              className="btn btn-primary m-2"
              onClick={this.handleNewMovie}
            >
              New Movie
            </button>
            <div>There are {size} movies in your database</div>
            <MovieTable
              onSort={this.handleSort}
              movies={pagedData.pagedMovies}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              sortColumn={sortColumn}
            />
            <Pagination
              itemSize={size}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      );
    }
  }
}

export default Movies;
