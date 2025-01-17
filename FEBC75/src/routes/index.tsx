import { Route } from "react-router-dom";
import HomeTemplate from "../pages/HomeTemplate";
import HomePage from "../pages/HomeTemplate/HomePage";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AdminPage from "../pages/Admin";

type TRoute = {
  path: string;
  Component: React.ComponentType;
  children?: TRoute[];
};

const routes: TRoute[] = [
  {
    path: "",
    Component: HomeTemplate,
    children: [
      {
        path: "",
        Component: HomePage,
      },
    ],
  },
  {
    path: "login",
    Component: Login,
  },
  {
    path: "register",
    Component: Register,
  },
  {
    path: "admin",
    Component: AdminPage,
  },
];

const renderRoutes = () => {
  return routes.map((route) => {
    if (route.children) {
      return (
        <Route key={route.path} path={route.path} element={<route.Component />}>
          {route.children.map((child) => (
            <Route
              key={child.path}
              path={child.path}
              element={<child.Component />}
            />
          ))}
        </Route>
      );
    } else {
      return (
        <Route
          key={route.path}
          path={route.path}
          element={<route.Component />}
        />
      );
    }
  });
};

export default renderRoutes;
