
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import "flowbite/dist/flowbite.min.js"
import { Provider } from "react-redux";
import store from "./store";
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);


