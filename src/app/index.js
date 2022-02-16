import React, {
  Suspense,
  // useState,
  useEffect,
} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {
  // Router,
  BrowserRouter,
} from 'react-router-dom';
import reduxThunk from 'redux-thunk';
// import socketIOClient from 'socket.io-client';
import { SnackbarProvider } from 'notistack';
import Button from '@mui/material/Button';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import ParticlesRunebase from './components/ParticlesRunebase';

import reducers from './reducers';
import Routes from './routes';
// import history from './history';
import Header from './containers/Header';

import Notifier from './containers/Alert';

import Runebase from './assets/images/Runebase.png';
import Footer from './containers/Footer';
import { messages } from '../locales/en/messages';

import '@fortawesome/fontawesome-free/css/all.css';
import './assets/fonts/texgyreheros-regular.woff';
import './theme/style.scss';
import './i18n';

// import usePageTracking from './hooks/usePageTracking'
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';

const theme = createTheme();

const useStyles = makeStyles((theme) => {
  {
    // some css that access to theme
  }
});

// const ENDPOINT = `//${window.location.host}`;
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
// store.dispatch(authenticated());

// const user = JSON.parse(localStorage.getItem('user'));

// const socket = socketIOClient(ENDPOINT);

// socket.on('updateTransaction', (data) => {
//  store.dispatch(onUpdateTransaction(data));
// });

function Loader() {
  return (
    <div className="container h-100 loader">
      <div className="row align-items-center h-100">
        <div className="col-6 mx-auto text-center">
          <img className="mx-auto" src={Runebase} alt="" />
          <p className="text-center">Loading</p>
          <div id="fountainG">
            <div id="fountainG_1" className="fountainG" />
            <div id="fountainG_2" className="fountainG" />
            <div id="fountainG_3" className="fountainG" />
            <div id="fountainG_4" className="fountainG" />
            <div id="fountainG_5" className="fountainG" />
            <div id="fountainG_6" className="fountainG" />
            <div id="fountainG_7" className="fountainG" />
            <div id="fountainG_8" className="fountainG" />
          </div>
        </div>
      </div>
    </div>
  )
}

// if (user && user.token) {
//  store.dispatch({ type: AUTH_USER });
// }

const notistackRef = React.createRef();
const onClickDismiss = (key) => () => {
  notistackRef.current.closeSnackbar(key);
}

const styles = {
  snack: {
    position: 'absolute',
    height: 50,
    bottom: 70,
    left: 10,
    backgroundColor: 'red',
    zIndex: 99999999999999,
  },
};

i18n.load('en', messages)
i18n.activate('en')

function App() {
  // Set up a piece of state, so that we have
  // a way to trigger a re-render.
  console.log('RunesX App Started');

  // const classes = useStyles();

  return (
    <StyledEngineProvider injectFirst>
      <I18nProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <SnackbarProvider
              ref={notistackRef}
              classes={{
                root: styles.snack,
              }}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              action={(key) => (
                <Button onClick={onClickDismiss(key)}>
                  'Dismiss'
                </Button>
              )}
            >
              <BrowserRouter>
                <Suspense fallback={<Loader />}>
                  <Notifier />
                  <ParticlesRunebase />
                  <Header />
                  <Routes />
                  <Footer />
                </Suspense>
              </BrowserRouter>
            </SnackbarProvider>
          </Provider>
        </ThemeProvider>
      </I18nProvider>
    </StyledEngineProvider>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
