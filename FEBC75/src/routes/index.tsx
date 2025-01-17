import { Route } from "react-router-dom";
<<<<<<< HEAD
import ListJob from "../pages/HomeTemplate/list-job";
import DetailJob from "../pages/HomeTemplate/Detail-Job";
=======
import HomeTemplate from "../pages/HomeTemplate";
import HomePage from "../pages/HomeTemplate/HomePage";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AdminPage from "../pages/Admin";

>>>>>>> b94ff17031f3b0b7337281d38c4a0fcc888f5985
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
      {
        path: "list-job",
        element: ListJob,
      },
      {
        path: "Detail-Job/:id",
        element: DetailJob,
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
