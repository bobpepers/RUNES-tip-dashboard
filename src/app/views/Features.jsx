import React, {
  useEffect,
  useState,
} from 'react';
import {
  connect,
  useDispatch,
} from 'react-redux';
// import { Link } from 'react-router-dom';
import {
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';

import {
  reduxForm,
  Field,
  // formValueSelector,
  // change,
} from 'redux-form';

import {
  fetchFeatures,
  addFeature,
  updateFeature,
} from '../actions/features';
import { fetchServerAction } from '../actions/servers';
import { fetchChannelsAction } from '../actions/channels';

const renderField = ({
  input, type, placeholder, meta: { touched, error },
}) => (
  <div className={`input-group ${touched && error ? 'has-error' : ''}`}>
    <FormControl
      variant="outlined"
      fullWidth
    >
      <TextField
        // className="outlined-email-field"
        label={placeholder}
        type={type}
        variant="outlined"
        inputProps={{ className: 'outlined-email-field' }}
        {...input}
      />
      {touched && error && <div className="form-error">{error}</div>}
    </FormControl>
  </div>
);

const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <FormControl className="admin-form-field" style={{ width: '100%' }}>
    <InputLabel error={touched && error}>{label}</InputLabel>
    <Select
      style={{ width: '100%' }}
      floatingLabelText={label}
      error={touched && error}
      {...input}
      children={children}
      {...custom}
    />
    <FormHelperText error={touched && error}>{error}</FormHelperText>
  </FormControl>
)

const FeaturesView = (props) => {
  const {
    features,
    servers,
    channels,
    handleSubmit,
  } = props;
  const dispatch = useDispatch();
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });
  const [unitIso, setUnitIso] = useState(null);
  const [unitName, setUnitName] = useState(null);
  const [serverId, setServerId] = useState('All');

  const onEdit = ({ id, currentUnitIso, currentUnitName }) => {
    setInEditMode({
      status: true,
      rowKey: id,
    })
    setUnitIso(currentUnitIso);
    setUnitName(currentUnitName);
  }

  const onSave = async ({ id }) => {
    await dispatch(updateFeature(id, unitName, unitIso));
    setInEditMode({
      status: false,
      rowKey: null,
    })
    // reset the unit price state value
    setUnitIso(null);
    setUnitName(null);
  }

  const onCancel = () => {
    // reset the inEditMode state value
    setInEditMode({
      status: false,
      rowKey: null,
    })
    // reset the unit price state value
    setUnitIso(null);
    setUnitName(null);
  }
  const changeServer = (val, preVal) => {
    console.log('e');
    console.log(val);
    console.log(preVal);
    setServerId(preVal);
  }

  useEffect(() => {
    dispatch(fetchFeatures());
    dispatch(fetchServerAction('', '', '', 'All'));
    dispatch(fetchChannelsAction('', '', '', serverId));
  }, [serverId]);

  useEffect(() => {
    console.log('FEATURES');
    console.log(features);
    console.log(servers);
    console.log(channels);
  }, [
    features,
    servers,
    channels,
    serverId,
  ]);

  const handleFormSubmit = async (obj) => {
    await dispatch(addFeature(obj));
  }

  return (
    <div className="content index600 height100 w-100 transactions transaction">
      <form onSubmit={handleSubmit(handleFormSubmit)} style={{ width: '100%' }}>
        <Grid container>
          <Grid item xs={4}>
            <Field
              name="feature"
              component={renderSelectField}
              label="Feature"
            >
              <MenuItem key="1" value="tip">
                tip
              </MenuItem>
              <MenuItem key="2" value="rain">
                rain
              </MenuItem>
              <MenuItem key="3" value="reactdrop">
                reactdrop
              </MenuItem>
              <MenuItem key="4" value="faucet">
                faucet
              </MenuItem>
              <MenuItem key="5" value="hurricane">
                hurricane
              </MenuItem>
              <MenuItem key="6" value="thunderstorm">
                thunderstorm
              </MenuItem>
              <MenuItem key="7" value="thunder">
                thunder
              </MenuItem>
              <MenuItem key="8" value="voicerain">
                voicerain
              </MenuItem>
              <MenuItem key="9" value="sleet">
                sleet
              </MenuItem>
              <MenuItem key="10" value="soak">
                soak
              </MenuItem>
              <MenuItem key="11" value="withdraw">
                withdraw
              </MenuItem>
            </Field>
          </Grid>
          <Grid item xs={4}>
            <Field
              name="server"
              component={renderSelectField}
              onChange={(val, prevVal) => changeServer(val, prevVal)}
              label="Server"
            >
              {servers && servers.data && servers.data.map(server => {
                return (
                  <MenuItem key={server.id} value={server.id}>
                    {server.groupName}
                  </MenuItem>
                )
              })}
            </Field>
          </Grid>
          <Grid item xs={4}>
            <Field
              name="channel"
              component={renderSelectField}
              //onChange={changeServer}
              label="Channel"
            >
              <MenuItem key="all" value="all">
                All
              </MenuItem>
              {channels && channels.data && channels.data.map(channel => {
                return (
                  <MenuItem key={channel.id} value={channel.id}>
                    {channel.channelName}
                  </MenuItem>
                )
              })}
            </Field>
          </Grid>
          <Grid item xs={4}>
            <Field
              name="min"
              component={renderField}
              type="number"
              placeholder="min"
            />
          </Grid>
          <Grid item xs={4}>
            <Field
              name="enabled"
              component={renderSelectField}
              //onChange={changeServer}
              label="Enabled"
            >
              <MenuItem key="1" value="enable">
                Enable
              </MenuItem>
              <MenuItem key="2" value="disable">
                Disable
              </MenuItem>
            </Field>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="btn"
              fullWidth
              size="large"
            >
              Add
            </Button>
          </Grid>
        </Grid>

      </form>
      <TableContainer>
        <Table
          size="small"
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align="right">type</TableCell>
              <TableCell align="right">name</TableCell>
              <TableCell align="right">server</TableCell>
              <TableCell align="right">channel</TableCell>
              <TableCell align="right">min</TableCell>
              <TableCell align="right">edit/remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {features
              && features.data
              && features.data.map((feature, i) => {
                console.log(feature);
                return (
                  <TableRow key={i}>
                    <TableCell component="th" scope="row">
                      {feature.id}
                    </TableCell>
                    <TableCell component="th" scope="row" align="right">
                      {feature.type}
                    </TableCell>
                    <TableCell align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === feature.id ? (
                          <input
                            value={unitName}
                            onChange={(event) => setUnitName(event.target.value)}
                          />
                        ) : (
                          feature.name
                        )
                      }
                    </TableCell>
                    <TableCell align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === feature.id ? (
                          <input
                            value={unitIso}
                            onChange={(event) => setUnitIso(event.target.value)}
                          />
                        ) : (
                          feature.iso
                        )
                      }
                    </TableCell>
                    <TableCell align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === feature.id ? (
                          <input
                            value={unitIso}
                            onChange={(event) => setUnitIso(event.target.value)}
                          />
                        ) : (
                          feature.iso
                        )
                      }
                    </TableCell>
                    <TableCell align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === feature.id ? (
                          <input
                            value={unitIso}
                            onChange={(event) => setUnitIso(event.target.value)}
                          />
                        ) : (
                          feature.iso
                        )
                      }
                    </TableCell>
                    <TableCell align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === feature.id ? (
                          <>
                            <Button
                              variant="contained"
                              color="primary"
                              size="large"
                              onClick={() => onSave({
                                id: feature.id,
                                iso: unitIso,
                                name: unitName,
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
                              id: feature.id,
                              currentUnitIso: feature.iso,
                              currentUnitName: feature.currency_name,
                            })}
                          >
                            Edit
                          </Button>
                        )
                      }

                      {/* {country.status
                      ? (
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          onClick={() => ban(country.id)}
                        >
                          Disable
                        </Button>
                      )
                      : (
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          onClick={() => ban(country.id)}
                        >
                          Enable
                        </Button>
                      )}
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={() => ban(country.id)}
                    >
                      Delete
                    </Button> */}
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    features: state.features,
    servers: state.servers,
    channels: state.channels,
  };
}

const validate = (formProps) => {
  const errors = {};
  if (!formProps.feature) {
    errors.feature = 'Feature is required'
  }
  if (!formProps.server) {
    errors.server = 'Server is required'
  }
  if (!formProps.min) {
    errors.min = 'Min is required'
  }
  if (!formProps.enabled) {
    errors.enabled = 'Enabled is required'
  }

  return errors;
}

// const selector = formValueSelector('profile');

export default connect(mapStateToProps, null)(reduxForm({ form: 'adminCountries', validate })(FeaturesView));