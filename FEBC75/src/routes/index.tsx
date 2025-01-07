import HomeTemplate from "../pages/HomeTemplate";
import HomePage from "../pages/HomeTemplate/HomePage/index";
import { Route } from "react-router-dom";

type TRoute = {
  path: string;
  element: () => React.ReactNode;
  children?: TRoute[];
};

const routes: TRoute[] = [
  {
    path: "",
    element: HomeTemplate,
    children: [
      {
        path: "",
        element: HomePage,
      },
    ],
  },
];

const renderRoutes = () => {
  return routes.map((route) => {
    if (route.children) {
      return (
        <Route key={route.path} path={route.path} element={<route.element />}>
          {route.children.map((item) => (
            <Route
              key={item.path}
              path={item.path}
              element={<item.element />}
            />
          ))}
        </Route>
      );
    } else {
      return (
        <Route key={route.path} path={route.path} element={<route.element />} />
      );
    }
  });
};

export default renderRoutes;
