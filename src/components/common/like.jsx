import React from "react";

const Like = props => {
  let heartClass = "fa fa-heart";
  if (props.liked) {
    return (
      <i
        class={heartClass}
        style={{ cursor: "pointer" }}
        aria-hidden="true"
        onClick={props.onClick}
      />
    );
  } else {
    heartClass += "-o";
    return (
      <i
        class={heartClass}
        style={{ cursor: "pointer" }}
        aria-hidden="true"
        onClick={props.onClick}
      />
    );
  }
};

export default Like;
