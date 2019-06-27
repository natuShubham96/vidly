import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = column => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc")
      return <i class="fa fa-sort-asc" aria-hidden="true" />;
    else return <i class="fa fa-sort-desc" aria-hidden="true" />;
  };

  render() {
    return (
      <thead>
        {this.props.columns.map(column => (
          <th
            className="clickable"
            key={column.path || column.key}
            onClick={() => this.raiseSort(column.path)}
          >
            {column.label} {this.renderSortIcon(column)}
          </th>
        ))}
      </thead>
    );
  }
}

export default TableHeader;
