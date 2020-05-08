import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './redux/stroe';
import MovieAction from './redux/actions/MovieAction'

store.dispatch(MovieAction.setLoadingAction(true))
store.dispatch(MovieAction.setConditionAction({
  page: 2
}))

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
