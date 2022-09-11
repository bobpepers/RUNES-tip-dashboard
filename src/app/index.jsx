import React, {
  Suspense,
  lazy,
  createRef,
  useEffect,
} from 'react';
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from '@mui/material/styles';
import { createRoot } from 'react-dom/client';
import {
  Provider,
  useDispatch,
  connect,
} from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import Button from '@mui/material/Button';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import store from './reducers'
import { messages as enMessages } from './locales/en/messages'
import { messages as nlMessages } from './locales/nl/messages'
import { messages as frMessages } from './locales/fr/messages'
import '@fortawesome/fontawesome-free/css/all.css';
import './assets/fonts/texgyreheros-regular.woff';
import './theme/style.scss';
import LoadingContainer from './containers/Loading';
import { fetchUserData } from './actions/user';

const ParticlesRunebase = lazy(() => import('./components/ParticlesRunebase'));
const Header = lazy(() => import('./containers/Header'));
const Notifier = lazy(() => import('./containers/Alert'));
const Footer = lazy(() => import('./containers/Footer'));
const Routes = lazy(() => import('./routes'));

const theme = createTheme({
  // Theme style options here
});

const notistackRef = createRef();

const styles = {
  snack: {
    position: 'absolute',
    height: 50,
    bottom: 70,
    left: 10,
    backgroundColor: 'red',
    zIndex: 8000,
  },
};

i18n.load({
  en: enMessages,
  nl: nlMessages,
  fr: frMessages,
});

i18n.activate('en');

const persistedLanguage = localStorage.getItem('language');
if (!persistedLanguage) {
  localStorage.setItem('language', 'en');
}

function DismissAction({ id }) {
  return (
    <Button onClick={() => notistackRef.current.closeSnackbar(id)}>Dismiss</Button>
  )
}

function AppWrapper() {
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
              action={(key) => <DismissAction id={key} />}
            >
              <BrowserRouter>
                <Suspense fallback={<LoadingContainer />}>
                  <App />
                </Suspense>
              </BrowserRouter>
            </SnackbarProvider>
          </Provider>
        </ThemeProvider>
      </I18nProvider>
    </StyledEngineProvider>
  );
}

function AppContainer(props) {
  const {
    authenticated,
  } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    if (authenticated.authenticated && !authenticated.tfaLocked) {
      dispatch(fetchUserData());
    }
  }, [
    authenticated,
  ]);

  return (
    <>
      <Notifier />
      <ParticlesRunebase />
      <Header />
      <Routes />
      <Footer
        i18n={i18n}
      />
    </>
  );
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth,
  };
}

const App = connect(mapStateToProps)(AppContainer);

createRoot(
  document.getElementById('root'),
).render(
  <AppWrapper />,
);
