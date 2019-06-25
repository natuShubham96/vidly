import React, { Component } from "react";

class ListGroup extends Component {
  render() {
    const {
      onFilter,
      Genres,
      textProperty,
      valueProperty,
      selectedItemId
    } = this.props;
    return (
      <ul className="list-group">
        {Genres.map(genre => (
          <li
            className={
              genre._id === selectedItemId
                ? "list-group-item active"
                : "list-group-item"
            }
            key={genre._id}
            onClick={() => {
              onFilter(genre[valueProperty]);
            }}
          >
            {genre[textProperty]}
          </li>
        ))}
      </ul>
    );
  }
}

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup;
