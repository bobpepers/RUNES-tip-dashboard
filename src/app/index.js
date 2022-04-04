import React, {
  Suspense,
} from 'react';
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from '@mui/material/styles';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import { SnackbarProvider } from 'notistack';
import Button from '@mui/material/Button';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import ParticlesRunebase from './components/ParticlesRunebase';
import reducers from './reducers';
import Routes from './routes';
import Header from './containers/Header';
import Notifier from './containers/Alert';
import Runebase from './assets/images/Runebase.png';
import Footer from './containers/Footer';
import { messages as enMessages } from './locales/en/messages'
import { messages as nlMessages } from './locales/nl/messages'
import { messages as frMessages } from './locales/fr/messages'
import '@fortawesome/fontawesome-free/css/all.css';
import './assets/fonts/texgyreheros-regular.woff';
import './theme/style.scss';
// import './i18n';

const theme = createTheme();

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

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

i18n.load({
  en: enMessages,
  nl: nlMessages,
  fr: frMessages,
});

i18n.activate('en');

function App() {
  console.log('RunesX App Started');

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
                <Button
                  onClick={onClickDismiss(key)}
                >
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
                  <Footer
                    i18n={i18n}
                  />
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
