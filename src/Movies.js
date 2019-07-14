import React, {Component} from 'react';
import {getMovies, saveMovie} from './services/fakeMovieService';
import MovieTable from './components/movieTable';
import Pagination from './components/common/pagination';
import {paginate} from './utils/paginate';
import ListGroup from './components/common/listGroup';
import {getGenres} from './services/fakeGenreService';
import queryString from 'query-string';
import _ from 'lodash';
import SearchBox from './components/common/searchBox';

class Movies extends Component {
  state = {
    genres: [],
    movies: [],
    currentPage: 1,
    pageSize: 4,
    itemSize: 0,
    searchQuery: null,
    genreid: null,
    sortColumn: {path: 'title', order: 'asc'},
  };

  componentDidMount () {
    const genres = [{name: 'All Genres'}, ...getGenres ()];
    this.setState ({genres, movies: getMovies ()});
    const result = queryString.parse (this.props.location.search);
    if (!_.isEmpty (result)) {
      let id = '';
      if (result.genre === 'comedy') id = '5b21ca3eeb7f6fbccd471814';
      if (result.genre === 'thriller') id = '5b21ca3eeb7f6fbccd471820';
      if (result.genre === 'Action') id = '5b21ca3eeb7f6fbccd471818';
      const film = {
        title: result.title,
        genre: {_id: id, name: result.genre},
        numberInStock: result.numberInStock,
        dailyRentalRate: result.dailyRentalRate,
      };
      saveMovie (film);
    }
  }

  componentWillUnmount () {
    console.log ('unmounted');
  }
  getPagedData = (
    allMovies,
    sortColumn,
    size,
    currentPage,
    pageSize,
    genreid,
    searchQuery
  ) => {
    let filteredMovies = allMovies;
    if (searchQuery) {
      filteredMovies = allMovies.filter (m =>
        m.title.toLowerCase ().startsWith (searchQuery.toLowerCase ())
      );
    } else if (genreid) {
      filteredMovies = genreid
        ? allMovies.filter (m => m.genre._id === genreid)
        : allMovies;
    }

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
    this.setState ({genreid, searchQuery: '', currentPage: 1});
  };

  handleSort = sortColumn => {
    this.setState ({sortColumn});
  };

  handleNewMovie = () => {
    this.props.history.push ('/movies/new');
  };

  handleSearch = query => {
    this.setState ({searchQuery: query, genreid: null, currentPage: 1});
  };

  render () {
    const {
      itemSize: size,
      pageSize,
      currentPage,
      movies: allMovies,
      genreid,
      sortColumn,
      searchQuery,
    } = this.state;

    const pagedData = this.getPagedData (
      allMovies,
      sortColumn,
      size,
      currentPage,
      pageSize,
      genreid,
      searchQuery
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
              style={{marginBottom: 20}}
            >
              New Movie
            </button>
            <div>There are {size} movies in your database</div>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
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
