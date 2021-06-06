import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import {BrowserRouter} from 'react-router-dom';
import {store} from "./redux/store";
import {FireContext, fireData} from './redux/reducers/auth-reducer';


ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <FireContext.Provider value={fireData}>
                  <Provider store={store}>
                      <App />
                  </Provider>
          </FireContext.Provider>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

