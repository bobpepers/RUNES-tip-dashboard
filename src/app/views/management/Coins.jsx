import React, {
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import {
  connect,
  useDispatch,
} from 'react-redux';
// import CircularProgress from '@mui/material/CircularProgress';
import {
  Grid,
  Button,
  TextField as MuiTextField,
} from '@mui/material';
import { withRouter } from '../../hooks/withRouter';
import {
  fetchCoinsAction,
  editCoinInfoAction,
  deleteCoinInfoExchangeAction,
  deleteCoinInfoHintAction,
} from '../../actions/coin';

const CoinManagement = function (props) {
  const {
    auth,
    coins,
    editCoinInfo,
    deleteCoinInfoExchange,
    deleteCoinInfoHint,
  } = props;
  const dispatch = useDispatch();

  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });
  const [unitName, setUnitName] = useState(null);
  const [unitLogoUrl, setUnitLogoUrl] = useState(null);
  const [unitWebsite, setUnitWebsite] = useState(null);
  const [unitExplorer, setUnitExplorer] = useState(null);
  const [unitGithub, setUnitGithub] = useState(null);
  const [unitTelegram, setUnitTelegram] = useState(null);
  const [unitDiscord, setUnitDiscord] = useState(null);
  const [unitDescription, setUnitDescription] = useState(null);
  const [unitExchanges, setUnitExchanges] = useState([]);
  const [unitHints, setUnitHints] = useState([]);
  const [newExchangeCounter, setNewExchangeCounter] = useState(0);
  const [newHintsCounter, setNewHintsCounter] = useState(0);

  useEffect(() => {
    if (auth.authenticated) {
      dispatch(fetchCoinsAction());
    }
  }, [
    auth,
  ]);

  useEffect(
    () => { },
    [
      auth,
      coins,
    ],
  );

  const onEdit = ({
    id,
    currentUnitName,
    currentUnitLogoUrl,
    currentUnitWebsite,
    currentUnitExplorer,
    currentUnitGithub,
    currentUnitTelegram,
    currentUnitDiscord,
    currentUnitDescription,
    currentUnitExchanges,
    currentUnitHints,
  }) => {
    setInEditMode({
      status: true,
      rowKey: id,
    })
    setUnitName(currentUnitName);
    setUnitLogoUrl(currentUnitLogoUrl);
    setUnitWebsite(currentUnitWebsite);
    setUnitExplorer(currentUnitExplorer);
    setUnitGithub(currentUnitGithub);
    setUnitTelegram(currentUnitTelegram);
    setUnitDiscord(currentUnitDiscord);
    setUnitDescription(currentUnitDescription);
    setUnitExchanges(currentUnitExchanges);
    setUnitHints(currentUnitHints);
  }

  const onSave = async ({ id }) => {
    await dispatch(editCoinInfoAction(
      id,
      unitName,
      unitLogoUrl,
      unitWebsite,
      unitExplorer,
      unitGithub,
      unitTelegram,
      unitDiscord,
      unitDescription,
      unitExchanges,
      unitHints,
    ));

    setInEditMode({
      status: false,
      rowKey: null,
    })
    setUnitName(null);
    setUnitLogoUrl(null);
    setUnitWebsite(null);
    setUnitExplorer(null);
    setUnitGithub(null);
    setUnitTelegram(null);
    setUnitDiscord(null);
    setUnitDescription(null);
    setUnitExchanges(null);
    setUnitHints(null);
  }

  const onCancel = () => {
    setInEditMode({
      status: false,
      rowKey: null,
    })
    setUnitName(null);
    setUnitLogoUrl(null);
    setUnitWebsite(null);
    setUnitExplorer(null);
    setUnitGithub(null);
    setUnitTelegram(null);
    setUnitDiscord(null);
    setUnitDescription(null);
    setUnitExchanges(null);
    setUnitHints(null);
  }

  const addHint = (
    coinId,
  ) => {
    setUnitHints([
      {
        id: `new-${newHintsCounter}`,
        coinId,
        url: '',
      },
      ...unitHints,
    ]);
    setNewHintsCounter(newHintsCounter + 1)
  }

  const editHint = (
    id,
    coinId,
    value,
  ) => {
    const newState = unitHints.map((obj) => {
      if (obj.id === id) {
        return {
          id,
          coinId,
          hint: value,
        };
      }
      return obj;
    });
    setUnitHints(newState);
  }

  const addExchange = (
    coinId,
  ) => {
    setUnitExchanges([
      {
        id: `new-${newExchangeCounter}`,
        coinId,
        url: '',
      },
      ...unitExchanges,
    ]);
    setNewExchangeCounter(newExchangeCounter + 1)
  }

  const editExchange = (
    id,
    coinId,
    value,
  ) => {
    const newState = unitExchanges.map((obj) => {
      if (obj.id === id) {
        return {
          id,
          coinId,
          url: value,
        };
      }
      return obj;
    });
    setUnitExchanges(newState);
  }

  const deleteCoinInfoExchangeFunction = (
    id,
    coinId,
  ) => {
    dispatch(deleteCoinInfoExchangeAction(
      id,
      coinId,
    ))
  }

  const deleteCoinInfoHintFunction = (
    id,
    coinId,
  ) => {
    dispatch(deleteCoinInfoHintAction(
      id,
      coinId,
    ))
  }

  return (
    <div className="height100 content">
      <Grid container style={{ marginTop: '10px' }}>
        {
          coins
          && coins.data
          && coins.data.map((coin) => (
            <Grid container style={{ border: 'solid 1px black' }}>
              <Grid item xs={6}>
                {coin.ticker}
                {' '}
                #
                {coin.id}
                {' '}
                - Last Updated:
                {' '}
                {coin.updatedAt}
              </Grid>
              <Grid
                item
                xs={6}
                align="right"
              >
                {
                  inEditMode.status && inEditMode.rowKey === coin.id ? (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => onSave({
                          id: coin.id,
                          name: unitName,
                          logoUrl: unitLogoUrl,
                          website: unitWebsite,
                          explorer: unitExplorer,
                          github: unitGithub,
                          telegram: unitTelegram,
                          discord: unitDiscord,
                          description: unitDescription,
                          exchanges: unitExchanges,
                        })}
                      >
                        Save
                      </Button>

                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        style={{ marginLeft: 8 }}
                        onClick={() => onCancel()}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={() => onEdit({
                        id: coin.id,
                        currentUnitName: coin.coinInfo.name,
                        currentUnitLogoUrl: coin.coinInfo.logoUrl,
                        currentUnitWebsite: coin.coinInfo.website,
                        currentUnitExplorer: coin.coinInfo.explorer,
                        currentUnitGithub: coin.coinInfo.github,
                        currentUnitTelegram: coin.coinInfo.telegram,
                        currentUnitDiscord: coin.coinInfo.discord,
                        currentUnitDescription: coin.coinInfo.description,
                        currentUnitExchanges: coin.coinInfo.coinInfoExchanges || [],
                        currentUnitHints: coin.coinInfo.coinInfoHints || [],
                      })}
                    >
                      Edit
                    </Button>
                  )
                }
              </Grid>
              <Grid item xs={4}>
                <div>
                  Name:
                </div>
                {
                  inEditMode.status && inEditMode.rowKey === coin.id ? (
                    <MuiTextField
                      fullWidth
                      value={unitName}
                      onChange={(event) => setUnitName(event.target.value)}
                    />

                  ) : (
                    <MuiTextField
                      fullWidth
                      disabled
                      value={coin.coinInfo && coin.coinInfo.name}
                    />
                  )
                }
              </Grid>
              <Grid item xs={4}>
                <div>
                  Logo URL:
                </div>
                {
                  inEditMode.status && inEditMode.rowKey === coin.id ? (
                    <MuiTextField
                      fullWidth
                      value={unitLogoUrl}
                      onChange={(event) => setUnitLogoUrl(event.target.value)}
                    />

                  ) : (
                    <MuiTextField
                      fullWidth
                      disabled
                      value={coin.coinInfo && coin.coinInfo.logoUrl}
                    />
                  )
                }
              </Grid>
              <Grid item xs={4}>
                <div>
                  Website:
                </div>
                {
                  inEditMode.status && inEditMode.rowKey === coin.id ? (
                    <MuiTextField
                      fullWidth
                      value={unitWebsite}
                      onChange={(event) => setUnitWebsite(event.target.value)}
                    />

                  ) : (
                    <MuiTextField
                      fullWidth
                      disabled
                      value={coin.coinInfo && coin.coinInfo.website}
                    />
                  )
                }
              </Grid>
              <Grid item xs={4}>
                <div>
                  Explorer:
                </div>
                {
                  inEditMode.status && inEditMode.rowKey === coin.id ? (
                    <MuiTextField
                      fullWidth
                      value={unitExplorer}
                      onChange={(event) => setUnitExplorer(event.target.value)}
                    />

                  ) : (
                    <MuiTextField
                      fullWidth
                      disabled
                      value={coin.coinInfo && coin.coinInfo.explorer}
                    />
                  )
                }
              </Grid>
              <Grid item xs={4}>
                <div>
                  Github:
                </div>
                {
                  inEditMode.status && inEditMode.rowKey === coin.id ? (
                    <MuiTextField
                      fullWidth
                      value={unitGithub}
                      onChange={(event) => setUnitGithub(event.target.value)}
                    />

                  ) : (
                    <MuiTextField
                      fullWidth
                      disabled
                      value={coin.coinInfo && coin.coinInfo.github}
                    />
                  )
                }
              </Grid>
              <Grid item xs={4}>
                <div>
                  Telegram:
                </div>
                {
                  inEditMode.status && inEditMode.rowKey === coin.id ? (
                    <MuiTextField
                      fullWidth
                      value={unitTelegram}
                      onChange={(event) => setUnitTelegram(event.target.value)}
                    />

                  ) : (
                    <MuiTextField
                      fullWidth
                      disabled
                      value={coin.coinInfo && coin.coinInfo.telegram}
                    />
                  )
                }
              </Grid>
              <Grid item xs={4}>
                <div>
                  Discord:
                </div>
                {
                  inEditMode.status && inEditMode.rowKey === coin.id ? (
                    <MuiTextField
                      fullWidth
                      value={unitDiscord}
                      onChange={(event) => setUnitDiscord(event.target.value)}
                    />

                  ) : (
                    <MuiTextField
                      fullWidth
                      disabled
                      value={coin.coinInfo && coin.coinInfo.discord}
                    />
                  )
                }
              </Grid>
              <Grid item xs={8}>
                <div>
                  Description:
                </div>
                {
                  inEditMode.status && inEditMode.rowKey === coin.id ? (
                    <MuiTextField
                      fullWidth
                      value={unitDescription}
                      onChange={(event) => setUnitDescription(event.target.value)}
                    />

                  ) : (
                    <MuiTextField
                      fullWidth
                      disabled
                      value={coin.coinInfo && coin.coinInfo.description}
                    />
                  )
                }
              </Grid>
              <div>
                Exchanges
              </div>
              <div>
                {
                  inEditMode.status && inEditMode.rowKey === coin.id && (
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      style={{ marginLeft: 8 }}
                      onClick={() => addExchange(coin.id)}
                    >
                      + Add Exchange
                    </Button>

                  )
                }
              </div>
              <Grid container item xs={12}>
                {
                  inEditMode.status && inEditMode.rowKey === coin.id ? (
                    unitExchanges && unitExchanges.map((a) => (
                      <Grid
                        item
                        key={a.id}
                        xs={12}
                      >
                        <div>{a.id}</div>
                        {
                          inEditMode.status && inEditMode.rowKey === coin.id && (
                            <MuiTextField
                              fullWidth
                              value={a.url}
                              onChange={(event) => editExchange(a.id, coin.id, event.target.value)}
                            />

                          )
                        }
                      </Grid>
                    ))
                  ) : (
                    coin.coinInfo && coin.coinInfo.coinInfoExchanges && coin.coinInfo.coinInfoExchanges.map((a) => (
                      <Grid container>
                        <Grid item xs={8}>
                          {
                            inEditMode.status && inEditMode.rowKey === coin.id && (
                              <MuiTextField
                                fullWidth
                                disabled
                                value={a.url}
                              />

                            )
                          }
                        </Grid>

                      </Grid>
                    ))
                  )
                }
                {
                  coin.coinInfo && coin.coinInfo.coinInfoExchanges && coin.coinInfo.coinInfoExchanges.map((a) => (
                    <Grid container>
                      {
                        !inEditMode.status && (
                          <>
                            <Grid item xs={9}>
                              <MuiTextField
                                fullWidth
                                disabled
                                value={a.url}
                              />
                            </Grid>
                            <Grid item xs={3}>
                              <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                style={{ marginLeft: 8 }}
                                onClick={() => deleteCoinInfoExchangeFunction(a.id, coin.id)}
                              >
                                - Delete Exchange
                              </Button>
                            </Grid>
                          </>
                        )
                      }
                    </Grid>
                  ))
                }
              </Grid>
              <div>
                Hints
              </div>
              <div>
                {
                  inEditMode.status && inEditMode.rowKey === coin.id && (
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      style={{ marginLeft: 8 }}
                      onClick={() => addHint(coin.id)}
                    >
                      + Add Hint
                    </Button>

                  )
                }
              </div>
              <Grid container item xs={12}>
                {
                  inEditMode.status && inEditMode.rowKey === coin.id ? (
                    unitHints && unitHints.map((a) => (
                      <Grid
                        item
                        key={a.id}
                        xs={12}
                      >
                        <div>{a.id}</div>
                        {
                          inEditMode.status && inEditMode.rowKey === coin.id && (
                            <MuiTextField
                              fullWidth
                              value={a.hint}
                              onChange={(event) => editHint(a.id, coin.id, event.target.value)}
                            />

                          )
                        }
                      </Grid>
                    ))
                  ) : (
                    coin.coinInfo && coin.coinInfo.coinInfoHints && coin.coinInfo.coinInfoHints.map((a) => (
                      <Grid container>
                        <Grid item xs={8}>
                          {
                            inEditMode.status && inEditMode.rowKey === coin.id && (
                              <MuiTextField
                                fullWidth
                                disabled
                                value={a.hint}
                              />

                            )
                          }
                        </Grid>
                      </Grid>
                    ))
                  )
                }
                {
                  coin.coinInfo && coin.coinInfo.coinInfoHints && coin.coinInfo.coinInfoHints.map((a) => (
                    <Grid container>
                      {
                        !inEditMode.status && (
                          <>
                            <Grid item xs={9}>
                              <MuiTextField
                                fullWidth
                                disabled
                                value={a.hint}
                              />
                            </Grid>
                            <Grid item xs={3}>
                              <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                style={{ marginLeft: 8 }}
                                onClick={() => deleteCoinInfoHintFunction(a.id, coin.id)}
                              >
                                - Delete Hint
                              </Button>
                            </Grid>
                          </>
                        )
                      }
                    </Grid>
                  ))
                }
              </Grid>
            </Grid>
          ))
        }
      </Grid>

    </div>
  );
}

CoinManagement.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  coins: state.coins,
  editCoinInfo: state.editCoinInfo,
  deleteCoinInfoExchange: state.deleteCoinInfoExchange,
  deleteCoinInfoHint: state.deleteCoinInfoHint,
})

export default withRouter(connect(mapStateToProps, null)(CoinManagement));
