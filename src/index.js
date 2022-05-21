import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "./layouts/Admin";
import AuthLayout from "./layouts/Auth.js";
import Page from "./views/examples/Page";
import Search from "./views/examples/Search";

function isLoggedIn() {
  if (localStorage.getItem("email")) {
    return true;
  } else return false;
}
function Listing() {
  if (localStorage.getItem("password")) {
    console.log("token")
    return true;
  } else {
    console.log("no token")
    return false
  }
}

ReactDOM.render(
  <BrowserRouter>
    <Switch>
    
      <Route
        path="/admin/Page"
        render={(props) =>
          isLoggedIn() ? <AdminLayout {...props} /> : <AuthLayout {...props} />
        }
      />
       <Route
        path="/admin/Form"
        render={(props) =>
          isLoggedIn() ? <AdminLayout {...props} /> : <AuthLayout {...props} />
        }
      />
      <Route
        path="/auth"
        render={(props) =>
          isLoggedIn() ? <AdminLayout {...props} /> : <AuthLayout {...props} />
        }
      />
      <Route
        path="/admin/Search"
        render={(props) =>
          Listing() ? <Search {...props} /> : <Page {...props} />
        }
      />

      <Redirect from="/" to="/auth/login" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

