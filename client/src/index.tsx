import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './redux/stroe';
import MovieAction from './redux/actions/MovieAction'

store.dispatch(MovieAction.fetchMovies({ page: 2 })).then(()=>{
  store.dispatch(MovieAction.deleteMovie("5ead2838815f1b1bacf7fcb9"))
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
