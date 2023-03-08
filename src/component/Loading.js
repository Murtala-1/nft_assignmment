import React from "react";
import { Spinner } from "reactstrap";

export default function Loading() {
  return (
    <center>
      <Spinner color="primary" size="sm">
        Loading...
      </Spinner>
      <Spinner color="primary" size="sm" type="grow">
        Loading...
      </Spinner>
    </center>
  );
}
