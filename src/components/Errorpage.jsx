import { useRouteError } from "react-router-dom";

import React from 'react'

const Errorpage = () => {
  const error  = useRouteError();
  return (
    <main className="errorpage">
      <h1>Oop!! </h1>
      <p>An Error Occured while rendering this components</p>
      <p>
        <i>{error.status || error.statusText} </i>
        <i>{error.data || error.message} </i>
      </p>
    </main>
  );
}

export default Errorpage
