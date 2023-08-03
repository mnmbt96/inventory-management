import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import {
  legacy_createStore as createStore,
  compose,
  applyMiddleware,
} from "redux";
import combineReducers from "./reducers/combineReducers.ts";
import thunk from "redux-thunk";

const store = createStore(combineReducers, compose(applyMiddleware(thunk)));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
