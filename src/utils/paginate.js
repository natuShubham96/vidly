import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
  // _(items) converts items array into lodash wrapper
  //.slice(startIndex) slices the wrapper from starrtIndex
  //.value() converts the wrapper back into an array
}
