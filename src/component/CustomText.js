import React from "react";

export default function CustomText(props) {
  return (
    <div>
      <span className="fw-bold">{props.label}</span>
      <span> {props.value}</span>
    </div>
  );
}
