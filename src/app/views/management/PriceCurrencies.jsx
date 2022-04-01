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
  // formValueSelector,
  // change,
} from 'redux-form';

import {
  fetchPriceCurrenciesAction,
  addPriceCurrenciesAction,
  updatePriceCurrenciesAction,
  removePriceCurrenciesAction,
  updatePricesAndConversionsAction,
} from '../../actions/priceCurrencies';

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

const PriceCurrenciesManagement = function (props) {
  const {
    auth,
    priceCurrencies,
    handleSubmit,
  } = props;
  const dispatch = useDispatch();
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });
  const [unitName, setUnitName] = useState(null);
  const [unitIso, setUnitIso] = useState(null);
  const [unitType, setUnitType] = useState(null);

  const onEdit = ({
    id,
    currentUnitName,
    currentUnitIso,
    currentUnitType,
  }) => {
    setInEditMode({
      status: true,
      rowKey: id,
    })
    setUnitName(currentUnitName);
    setUnitIso(currentUnitIso);
    setUnitType(currentUnitType);
  }

  const onRemove = async (id) => {
    await dispatch(removePriceCurrenciesAction(id));
  }

  const onSave = async ({ id }) => {
    await dispatch(updatePriceCurrenciesAction(id, unitName, unitIso, unitType));
    setInEditMode({
      status: false,
      rowKey: null,
    })
    setUnitName(null);
    setUnitIso(null);
    setUnitType(null);
  }

  const onCancel = () => {
    setInEditMode({
      status: false,
      rowKey: null,
    })
    setUnitName(null);
    setUnitIso(null);
    setUnitType(null);
  }

  useEffect(() => {
    dispatch(fetchPriceCurrenciesAction());
  }, [
    auth,
  ]);

  useEffect(() => { }, [
    priceCurrencies,
  ]);

  const updatePricesAndConversions = async () => {
    dispatch(updatePricesAndConversionsAction());
    setTimeout(() => {
      dispatch(fetchPriceCurrenciesAction());
    }, 2500);
  }

  const handleFormSubmit = async (obj) => {
    await dispatch(addPriceCurrenciesAction(obj));
  }

  return (
    <div className="content index600 height100 w-100 transactions transaction">
      <form onSubmit={handleSubmit(handleFormSubmit)} style={{ width: '100%' }}>
        <Grid container>
          <Grid item xs={4}>
            <Field
              name="name"
              component={renderField}
              type="text"
              placeholder="name"
            />
          </Grid>
          <Grid item xs={4}>
            <Field
              name="iso"
              component={renderField}
              type="text"
              placeholder="iso"
            />
          </Grid>
          <Grid item xs={4}>
            <Field
              name="type"
              component={renderSelectField}
              // onChange={changeServer}
              label="Type"
            >
              <MenuItem key="1" value="fiat">
                FIAT
              </MenuItem>
              <MenuItem key="2" value="cryptocurrency">
                CRYPTOCURRENCY
              </MenuItem>
            </Field>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="btn"
              fullWidth
              size="large"
              style={{ marginRight: '5px' }}
            >
              Add
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => updatePricesAndConversions()}
              className="btn"
              fullWidth
              size="large"
              style={{ marginLeft: '5px' }}
            >
              Update Prices &amp; Conversions
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
              <TableCell align="right">name</TableCell>
              <TableCell align="right">iso</TableCell>
              <TableCell align="right">type</TableCell>
              <TableCell align="right">conversionRate</TableCell>
              <TableCell align="right">price</TableCell>
              <TableCell align="right">last updated</TableCell>
              <TableCell align="right">edit/remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {priceCurrencies
              && priceCurrencies.data
              && priceCurrencies.data.map((currency, i) => {
                console.log(currency);
                return (
                  <TableRow key={i}>
                    <TableCell component="th" scope="row">
                      {currency.id}
                    </TableCell>
                    <TableCell component="th" scope="row" align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === currency.id ? (
                          <TextField
                            value={unitName}
                            onChange={(event) => setUnitName(event.target.value)}
                          />

                        ) : (
                          currency.currency_name
                        )
                      }
                    </TableCell>
                    <TableCell align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === currency.id ? (
                          <TextField
                            value={unitIso}
                            onChange={(event) => setUnitIso(event.target.value)}
                          />

                        ) : (
                          currency.iso
                        )
                      }
                    </TableCell>
                    <TableCell align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === currency.id ? (
                          <Select
                            label="Enabled"
                            // defaultValue={unitEnabled ? 'true' : 'false'}
                            value={unitType}
                            onChange={(event) => setUnitType(event.target.value)}
                          >
                            <MenuItem key="fiat" value="fiat">
                              FIAT
                            </MenuItem>
                            <MenuItem key="cryptocurrency" value="cryptocurrency">
                              CRYPTOCURRENCY
                            </MenuItem>
                          </Select>
                        ) : (
                          <span>{currency.type}</span>
                        )
                      }
                    </TableCell>
                    <TableCell align="right">
                      {
                        currency.conversionRate
                      }
                    </TableCell>
                    <TableCell align="right">
                      {
                        currency.price
                      }
                    </TableCell>
                    <TableCell align="right">
                      {
                        currency.updatedAt
                      }
                    </TableCell>
                    <TableCell align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === currency.id ? (
                          <>
                            <Button
                              variant="contained"
                              color="primary"
                              size="large"
                              onClick={() => onSave({
                                id: currency.id,
                                name: unitName,
                                iso: unitIso,
                                type: unitType,
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
                                id: currency.id,
                                currentUnitName: currency.currency_name,
                                currentUnitIso: currency.iso,
                                currentUnitType: currency.type,
                              })}
                            >
                              Edit
                            </Button>

                            <Button
                              variant="contained"
                              color="primary"
                              size="large"
                              onClick={() => onRemove(currency.id)}
                            >
                              Remove
                            </Button>

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
    priceCurrencies: state.priceCurrencies,
  };
}

const validate = (formProps) => {
  const errors = {};
  if (!formProps.name) {
    errors.name = 'Name is required'
  }
  if (!formProps.iso) {
    errors.iso = 'Iso is required'
  }
  if (!formProps.type) {
    errors.type = 'Type is required'
  }
  return errors;
}

// const selector = formValueSelector('profile');

export default connect(mapStateToProps, null)(reduxForm({ form: 'priceCurrencies', validate })(PriceCurrenciesManagement));
