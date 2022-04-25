import React, {
  useEffect,
  useState,
} from 'react';
import {
  connect,
  useDispatch,
} from 'react-redux';
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
} from 'redux-form';

import {
  fetchFeatures,
  addFeature,
  updateFeature,
  removeFeature,
} from '../../actions/features';
import { fetchServerAction } from '../../actions/servers';
import { fetchChannelsAction } from '../../actions/channels';

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

const FeaturesView = function (props) {
  const {
    auth,
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
  const [unitMin, setUnitMin] = useState(null);
  const [unitFee, setUnitFee] = useState(null);
  const [unitSampleSize, setUnitSampleSize] = useState(null);
  const [unitEnabled, setUnitEnabled] = useState(null);
  const [serverId, setServerId] = useState('All');

  const onEdit = ({
    id,
    currentUnitMin,
    currentUnitFee,
    currentUnitSampleSize,
    currentUnitEnabled,
  }) => {
    setInEditMode({
      status: true,
      rowKey: id,
    })
    setUnitMin(currentUnitMin);
    setUnitFee(currentUnitFee);
    setUnitSampleSize(currentUnitSampleSize);
    setUnitEnabled(currentUnitEnabled);
  }

  const onRemove = async (id) => {
    await dispatch(removeFeature(id));
  }

  const onSave = async ({ id }) => {
    await dispatch(updateFeature(
      id,
      unitMin,
      unitFee,
      unitSampleSize,
      unitEnabled,
    ));

    setInEditMode({
      status: false,
      rowKey: null,
    })
    setUnitMin(null);
    setUnitFee(null);
    setUnitSampleSize(null);
    setUnitEnabled(null);
  }

  const onCancel = () => {
    setInEditMode({
      status: false,
      rowKey: null,
    })
    setUnitMin(null);
    setUnitFee(null);
    setUnitSampleSize(null);
    setUnitEnabled(null);
  }
  const changeServer = (val, preVal) => {
    setServerId(preVal);
  }

  useEffect(() => {
    dispatch(fetchFeatures());

    dispatch(
      fetchServerAction(
        '',
        '',
        '',
        'All',
        0,
        99999,
      ),
    );

    dispatch(
      fetchChannelsAction(
        '',
        '',
        '',
        serverId,
        0,
        99999,
      ),
    );
  }, [
    serverId,
    auth,
  ]);

  useEffect(() => { }, [
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
              <MenuItem key="11" value="flood">
                flood
              </MenuItem>
              <MenuItem key="12" value="withdraw">
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
              {servers && servers.data && servers.data.map((server) => (
                <MenuItem key={server.id} value={server.id}>
                  {server.groupName}
                </MenuItem>
              ))}
            </Field>
          </Grid>
          <Grid item xs={4}>
            <Field
              name="channel"
              component={renderSelectField}
              // onChange={changeServer}
              label="Channel (optional)"
            >
              <MenuItem key="all" value="all">
                All
              </MenuItem>
              {channels && channels.data && channels.data.map((channel) => (
                <MenuItem key={channel.id} value={channel.id}>
                  {channel.channelName}
                </MenuItem>
              ))}
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
              name="fee"
              component={renderField}
              type="number"
              placeholder="fee %"
            />
          </Grid>
          <Grid item xs={4}>
            <Field
              name="enabled"
              component={renderSelectField}
              // onChange={changeServer}
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
              <TableCell align="right">fee %</TableCell>
              <TableCell align="right">maxSampleSize</TableCell>
              <TableCell align="right">enabled</TableCell>
              <TableCell align="right">last updated by:</TableCell>
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
                        feature.name
                      }
                    </TableCell>
                    <TableCell align="right">
                      {
                        feature.group && feature.group.groupName
                      }
                    </TableCell>
                    <TableCell align="right">
                      {feature.channel && feature.channel.channelName}
                    </TableCell>
                    <TableCell align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === feature.id ? (
                          <TextField
                            value={unitMin}
                            onChange={(event) => setUnitMin(event.target.value)}
                          />

                        ) : (
                          feature.min / 1e8
                        )
                      }
                    </TableCell>
                    <TableCell align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === feature.id ? (
                          <TextField
                            value={unitFee}
                            onChange={(event) => setUnitFee(event.target.value)}
                          />

                        ) : (
                          feature.fee / 1e2
                        )
                      }
                    </TableCell>
                    <TableCell align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === feature.id ? (
                          <TextField
                            value={unitSampleSize}
                            onChange={(event) => setUnitSampleSize(event.target.value)}
                          />

                        ) : (
                          feature.maxSampleSize
                        )
                      }
                    </TableCell>
                    <TableCell align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === feature.id ? (
                          <Select
                            label="Enabled"
                            // defaultValue={unitEnabled ? 'true' : 'false'}
                            value={unitEnabled}
                            onChange={(event) => setUnitEnabled(event.target.value)}
                          >
                            <MenuItem key="enableTrue" value="true">
                              True
                            </MenuItem>
                            <MenuItem key="enableFalse" value="false">
                              False
                            </MenuItem>
                          </Select>
                        ) : (
                          <span>{feature.enabled ? 'true' : 'false'}</span>
                        )
                      }
                    </TableCell>
                    <TableCell align="right">
                      {
                        feature.dashboardUser && feature.dashboardUser.username
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
                                min: unitMin,
                                fee: unitFee,
                                maxSampleSize: unitSampleSize,
                                enabled: unitEnabled,
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
                          <>
                            <Button
                              variant="contained"
                              color="primary"
                              size="large"
                              onClick={() => onEdit({
                                id: feature.id,
                                currentUnitMin: feature.min / 1e8,
                                currentUnitFee: feature.fee / 1e2,
                                currentUnitSampleSize: feature.maxSampleSize,
                                currentUnitEnabled: feature.enabled,
                              })}
                            >
                              Edit
                            </Button>
                            {
                              feature.type === 'local' && (
                                <Button
                                  variant="contained"
                                  color="primary"
                                  size="large"
                                  onClick={() => onRemove(feature.id)}
                                >
                                  Remove
                                </Button>
                              )
                            }
                          </>
                        )
                      }
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
    auth: state.auth,
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
  if (!formProps.fee) {
    errors.fee = 'Fee is required'
  }
  if (!formProps.enabled) {
    errors.enabled = 'Enabled is required'
  }

  return errors;
}

// const selector = formValueSelector('profile');

export default connect(mapStateToProps, null)(reduxForm({ form: 'adminCountries', validate })(FeaturesView));
