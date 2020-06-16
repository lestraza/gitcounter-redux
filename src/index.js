import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'


import App from './App';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import  reducer from './reducer/reducer';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducer)}>
    <App />
  </Provider>,
  document.getElementById('root')
);
