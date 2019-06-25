import React, { Component } from "react";
import { getMovies } from "./services/fakeMovieService";
import Like from "./components/common/like";
import Pagination from "./components/common/pagination";
import { paginate } from "./utils/paginate";
import ListGroup from "./components/common/listGroup";
import { getGenres } from "./services/fakeGenreService";

class Movies extends Component {
  state = {
    genres: [],
    movies: [],
    currentPage: 1,
    pageSize: 4,
    itemSize: 0,
    genreid: null
  };

  componentDidMount() {
    const genres = [{ name: "All Genres" }, ...getGenres()];
    this.setState({ genres, movies: getMovies() });
  }

  _onDelete = title => {
    const movies = this.state.movies.filter(movie => movie.title !== title);
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleFilter = genreid => {
    this.setState({ genreid, currentPage: 1 });
  };

  _renderTable = () => {
    const {
      currentPage,
      pageSize,
      movies: allMovies,
      genreid,
      itemSize: size
    } = this.state;

    const filteredMovies = genreid
      ? allMovies.filter(m => m.genre._id === genreid)
      : allMovies;

    const itemSize = filteredMovies.length;

    if (itemSize !== size) this.setState({ itemSize });

    const movies = paginate(filteredMovies, currentPage, pageSize);

    return (
      <table className="table">
        <thead>
          <th>Title</th>
          <th>Genre</th>
          <th>Stock</th>
          <th>Rate</th>
          <th />
          <th />
        </thead>
        <tbody>
          {movies.map(movie => {
            return (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    liked={movie.liked}
                    onClick={() => this.handleLike(movie)}
                  />
                </td>
                <td>
                  <button
                    onClick={() => this._onDelete(movie.title)}
                    className="btn btn-danger m-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };
  render() {
    const { itemSize, pageSize, currentPage, movies: allMovies } = this.state;

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
            <div>There are {itemSize} movies in your database</div>
            {this._renderTable()}
            <Pagination
              itemSize={itemSize}
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
