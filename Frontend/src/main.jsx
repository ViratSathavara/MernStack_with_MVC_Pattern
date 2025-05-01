import React from 'react';
import ReactDOM from 'react-dom/client';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import App from './App';
import history from './history';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HistoryRouter history={history}>

    <SnackbarProvider maxSnack={3} autoHideDuration={3000} anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'right',
  }}>
      <App />
    </SnackbarProvider>
    </HistoryRouter>
  </React.StrictMode>
);
