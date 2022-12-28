import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
  const [tok, setToken] = useState([]);

  useEffect(() => {
    setToken(localStorage.getItem("tokens"));
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => (tok ? <Component {...props} /> : <Redirect to="/" />)}
    />
  );
}

export default PrivateRoute;
