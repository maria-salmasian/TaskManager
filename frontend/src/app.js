import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import './app.css';
import Layout from "./components/Hoc/Layout/Layout";
import Boards from "./containers/Boards/Boards";
import SingleBoard from "./containers/SingleBoard/SingleBoard";

import "bootstrap/dist/css/bootstrap.min.css";

import { Provider } from "react-redux";
import store from "./store";

function App() {
    return (
      <Provider store={store}>
        <div>
          <Layout>
            <BrowserRouter>
              <Routes>
                <Route path="/board" component={SingleBoard} />
                <Route path="/" exact component={Boards} />
              </Routes>
            </BrowserRouter>
          </Layout>
        </div>
      </Provider>
    );
}

export default App;
