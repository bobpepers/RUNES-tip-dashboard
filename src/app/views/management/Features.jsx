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
  Select,
  MenuItem,
  Box,
} from '@mui/material';

import {
  Form,
  Field,
} from 'react-final-form';

import {
  fetchFeatures,
  addFeature,
  updateFeature,
  removeFeature,
} from '../../actions/features';
import { fetchServerAction } from '../../actions/servers';
import { fetchChannelsAction } from '../../actions/channels';

import SelectField from '../../components/form/SelectFields';
import TextField from '../../components/form/TextField';
import NumberField from '../../components/form/NumberField';

const FeaturesView = function (props) {
  const {
    auth,
    features,
    servers,
    channels,
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
  const changeServer = (val) => {
    setServerId(val);
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
    if (serverId !== 'All') {
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
    }
  }, [
    serverId,
    auth,
  ]);

  useEffect(() => {
    console.log(channels);
  }, [
    features,
    servers,
    channels,
    serverId,
  ]);

  return (
    <div className="content index600 height100 w-100 transactions transaction">
      <Form
        onSubmit={async (values) => {
          await dispatch(addFeature(values));
        }}
        validate={(values) => {
          const errors = {};
          if (!values.feature) {
            errors.feature = 'Feature is required'
          }
          if (!values.server) {
            errors.server = 'Server is required'
          }
          if (!values.min) {
            errors.min = 'Min is required'
          }
          if (!values.fee) {
            errors.fee = 'Fee is required'
          }
          if (!values.enabled) {
            errors.enabled = 'Enabled is required'
          }

          return errors;
        }}
      >
        {({
          form,
          handleSubmit,
          submitting,
          pristine,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              component={Grid}
              container
              item
            >
              <Box
                component={Grid}
                item
                xs={4}
              >
                <Field
                  name="feature"
                  component={SelectField}
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
              </Box>
              <Box
                component={Grid}
                item
                xs={4}
              >
                <Field
                  name="server"
                  component={SelectField}
                  parse={(value) => {
                    console.log('trigger parse');
                    changeServer(value)
                    return value;
                  }}
                  label="Server"
                >
                  {servers && servers.data && servers.data.map((server) => (
                    <MenuItem key={server.id} value={server.id}>
                      {server.groupName}
                    </MenuItem>
                  ))}
                </Field>
              </Box>
              <Box
                component={Grid}
                item
                xs={4}
              >
                <Field
                  name="channel"
                  component={SelectField}
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
              </Box>
              <Box
                component={Grid}
                item
                xs={4}
              >
                <Field
                  name="min"
                  component={NumberField}
                  placeholder="min"
                  label="Min"
                />
              </Box>
              <Box
                component={Grid}
                item
                xs={4}
              >
                <Field
                  name="fee"
                  component={NumberField}
                  placeholder="fee %"
                  label="fee %"
                />
              </Box>
              <Box
                component={Grid}
                item
                xs={4}
              >
                <Field
                  name="enabled"
                  component={SelectField}
                  label="Enabled"
                >
                  <MenuItem key="1" value="enable">
                    Enable
                  </MenuItem>
                  <MenuItem key="2" value="disable">
                    Disable
                  </MenuItem>
                </Field>
              </Box>
              <Box
                component={Grid}
                item
                xs={12}
              >
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className="btn"
                  fullWidth
                  size="large"
                  style={{ marginLeft: '5px' }}
                  disabled={pristine || submitting}
                >
                  Add
                </Button>
              </Box>
            </Box>
          </form>
        )}
      </Form>
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

}

// const selector = formValueSelector('profile');

export default connect(mapStateToProps, null)(FeaturesView);
