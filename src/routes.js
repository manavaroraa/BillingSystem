import Login from "./views/examples/Login.jsx";
import Form from "./views/examples/Form.jsx";
import Page from "./views/examples/Page.jsx";
import Search from "./views/examples/Search.jsx";


var routes = [
  {
    path: "/Page",
    name: "Dashboard",
    component: Page,
    layout: "/admin",
  },
  {
    path: "/Search",
    name: "Search",
    component: Search,
    layout: "/admin",
  },
  {
    path: "/Form",
    name: "Form",
    component: Form,
    layout: "/admin",
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
    layout: "/auth",
  },
];
export default routes;
