import React, {
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import {
  connect,
  useDispatch,
} from 'react-redux';
import {
  Grid,
  Button,
  TextField,
} from '@mui/material';
import { withRouter } from '../../hooks/withRouter';
import {
  fetchTriviaCategories,
  insertTriviaCategoryAction,
  removeTriviaCategoryAction,
  updateTriviaCategoryAction,
} from '../../actions/triviaCategories';

const TriviaCategoryManagement = function (props) {
  const {
    auth,
    triviaCategories,
  } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.authenticated) {
      dispatch(fetchTriviaCategories());
    }
  }, [
    auth,
  ]);

  useEffect(
    () => { },
    [
      auth,
      triviaCategories,
    ],
  );

  const [inputName, setInputName] = useState('');
  const [inEditMode, setinEditMode] = useState({
    status: false,
    rowKey: null,
  });
  const [unitName, setUnitName] = useState(null);

  const handleInputNameChange = (e) => {
    const { value } = e.target;
    setInputName(value);
  };

  const handleInsertTriviaCategory = () => {
    dispatch(insertTriviaCategoryAction(inputName));
    setInputName('');
  };

  const handleRemoveTriviaCategory = (id) => {
    dispatch(removeTriviaCategoryAction(id))
  };

  const onEdit = ({
    id,
    currentUnitName,
  }) => {
    setinEditMode({
      status: true,
      rowKey: id,
    })
    setUnitName(currentUnitName);
  }

  const onSaveEdit = async ({ id }) => {
    await dispatch(updateTriviaCategoryAction(
      id,
      unitName,
    ));

    setinEditMode({
      status: false,
      rowKey: null,
    })
    setUnitName(null);
  }

  const onCancelEdit = () => {
    setinEditMode({
      status: false,
      rowKey: null,
    })
    setUnitName(null);
  }

  return (
    <div className="height100 content">
      <Grid container>
        <Grid item xs={12}>
          Category Name
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            name="name"
            placeholder="name"
            value={inputName}
            onChange={(e) => handleInputNameChange(e)}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} style={{ marginTop: '10px' }}>
            <Button
              fullWidth
              onClick={handleInsertTriviaCategory}
              variant="contained"
              size="large"
            >
              Insert Category
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid container style={{ marginTop: '10px' }}>
        {
          triviaCategories
          && triviaCategories.data
          && triviaCategories.data.map((d) => (
            <Grid container style={{ border: 'solid 1px black' }}>
              <Grid item xs={1}>{d.id}</Grid>
              <Grid item xs={6}>
                {
                  inEditMode.status && inEditMode.rowKey === d.id ? (
                    <TextField
                      value={unitName}
                      onChange={(event) => setUnitName(event.target.value)}
                    />

                  ) : (
                    d.name
                  )
                }
              </Grid>
              <Grid item xs={2}>
                {
                  inEditMode.status && inEditMode.rowKey === d.id ? (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => onSaveEdit({
                          id: d.id,
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
                        onClick={() => onCancelEdit()}
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
                        id: d.id,
                        currentUnitName: d.name,
                      })}
                    >
                      Edit
                    </Button>
                  )
                }
              </Grid>
              <Grid item xs={1}>
                <Button
                  variant="contained"
                  onClick={() => handleRemoveTriviaCategory(d.id)}
                >
                  remove
                </Button>
              </Grid>
            </Grid>
          ))
        }
      </Grid>

    </div>
  );
}

TriviaCategoryManagement.propTypes = {
  // classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  triviaCategories: state.triviaCategories,
})

export default withRouter(connect(mapStateToProps, null)(TriviaCategoryManagement));
