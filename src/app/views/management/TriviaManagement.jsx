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
  MenuItem,
  InputLabel,
  FormControl,
  Select,
} from '@mui/material';
import { withRouter } from '../../hooks/withRouter';
import {
  fetchTriviaQuestions,
  insertTriviaAction,
  removeTriviaAction,
  switchTriviaAction,
  updateTriviaQuestionAction,
  updateTriviaAnswerAction,
} from '../../actions/trivia';
import {
  fetchTriviaCategories,
} from '../../actions/triviaCategories';

const TriviaManagement = function (props) {
  const {
    auth,
    triviaQuestions,
    removeTrivia,
    insertTrivia,
    triviaCategories,
  } = props;
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.authenticated) {
      dispatch(fetchTriviaQuestions());
      dispatch(fetchTriviaCategories());
    }
  }, [
    auth,
  ]);

  useEffect(
    () => { },
    [
      auth,
      triviaQuestions,
      removeTrivia,
      insertTrivia,
      triviaCategories,
    ],
  );

  const [inputAnswerList, setInputAnswerList] = useState([{ answer: '', correct: 'false' }]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [category, setCategory] = useState('None');
  const [unitCategory, setUnitCategory] = useState('None');

  const [inEditModeAnswer, setinEditModeAnswer] = useState({
    status: false,
    rowKey: null,
  });
  const [inEditModeQuestion, setinEditModeQuestion] = useState({
    status: false,
    rowKey: null,
  });
  const [unitAnswer, setUnitAnswer] = useState(null);
  const [unitQuestion, setUnitQuestion] = useState(null);

  const handleInputAnswerChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputAnswerList];
    list[index][name] = value;
    setInputAnswerList(list);
  };

  const handleInputQuestionChange = (e) => {
    const { value } = e.target;
    setInputQuestion(value);
  };

  const handleInsertTrivia = () => {
    dispatch(insertTriviaAction({
      question: inputQuestion,
      answers: inputAnswerList,
      category,
    }));
    setInputAnswerList([{ answer: '', correct: 'false' }]);
    setInputQuestion('');
    setCategory('None');
  };

  const handleRemoveClick = (index) => {
    const list = [...inputAnswerList];
    list.splice(index, 1);
    setInputAnswerList(list);
  };

  const handleAddClick = () => {
    setInputAnswerList([
      ...inputAnswerList,
      {
        answer: '',
        correct: 'false',
      },
    ]);
  };

  const handleRemoveTrivia = (id) => {
    dispatch(removeTriviaAction(id))
  };

  const handleSwitchTrivia = (id) => {
    dispatch(switchTriviaAction(id))
  };

  const onEditAnswer = ({
    id,
    currentUnitAnswer,
  }) => {
    setinEditModeAnswer({
      status: true,
      rowKey: id,
    })
    setUnitAnswer(currentUnitAnswer);
  }

  const onEditQuestion = ({
    id,
    currentUnitQuestion,
    currentUnitCategory,
  }) => {
    setUnitCategory(currentUnitCategory);
    setinEditModeQuestion({
      status: true,
      rowKey: id,
    })
    setUnitQuestion(currentUnitQuestion);
  }

  const onSaveEditAnswer = async ({ id }) => {
    await dispatch(updateTriviaAnswerAction(
      id,
      unitAnswer,
    ));

    setinEditModeAnswer({
      status: false,
      rowKey: null,
    })
    setUnitAnswer(null);
  }

  const onSaveEditQuestion = async ({ id }) => {
    await dispatch(updateTriviaQuestionAction(
      id,
      unitQuestion,
      unitCategory,
    ));

    setinEditModeQuestion({
      status: false,
      rowKey: null,
    })
    setUnitQuestion(null);
    setUnitCategory('None');
  }

  const onCancelEditAnswer = () => {
    setinEditModeAnswer({
      status: false,
      rowKey: null,
    })
    setUnitAnswer(null);
  }

  const onCancelEditQuestion = () => {
    setinEditModeQuestion({
      status: false,
      rowKey: null,
    })
    setUnitQuestion(null);
    setUnitCategory('None');
  }

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  }

  return (
    <div className="height100 content">
      <Grid container>
        <Grid item xs={12}>
          Question
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            name="question"
            placeholder="Question"
            value={inputQuestion}
            onChange={(e) => handleInputQuestionChange(e)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={category}
              label="Category"
              onChange={handleChangeCategory}
            >
              <MenuItem key="category-none" value="None">None</MenuItem>
              [
              {triviaCategories
              && triviaCategories.data
              && triviaCategories.data.map((x) => (
                <MenuItem key={x.name} value={x.id}>{x.name}</MenuItem>
              ))}
              ]
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>Answers:</Grid>
        <Grid item xs={12}>
          {inputAnswerList.map((x, i) => (
            <Grid container>
              <Grid item xs={8}>
                <TextField
                  onChange={(e) => handleInputAnswerChange(e, i)}
                  fullWidth
                  variant="outlined"
                  name="answer"
                  placeholder="Answer"
                  value={x.answer}
                />
              </Grid>
              <Grid item xs={2}>
                <FormControl fullWidth>
                  <Select
                    onChange={(e) => handleInputAnswerChange(e, i)}
                    name="correct"
                    value={inputAnswerList[i].correct || 'false'}
                  >
                    <MenuItem value="false">
                      incorrect
                    </MenuItem>
                    <MenuItem value="true">
                      correct
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                {inputAnswerList.length !== 1 && (
                  <Button
                    variant="contained"
                    onClick={() => handleRemoveClick(i)}
                  >
                    Remove Answer
                  </Button>
                )}
              </Grid>
              <Grid item xs={12} style={{ marginTop: '10px' }}>
                {
                  inputAnswerList.length < 5
                    && inputAnswerList.length - 1 === i
                  && (
                    <Button
                      fullWidth
                      onClick={handleAddClick}
                      variant="contained"
                      size="large"
                    >
                      Add answer
                    </Button>
                  )
                }
              </Grid>

            </Grid>
          ))}
          <Grid item xs={12} style={{ marginTop: '10px' }}>
            <Button
              fullWidth
              onClick={handleInsertTrivia}
              variant="contained"
              size="large"
            >
              Insert Trivia
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid container style={{ marginTop: '10px' }}>
        {
          triviaQuestions
          && triviaQuestions.data
          && triviaQuestions.data.map((d) => (
            <>
              <Grid container style={{ border: 'solid 1px black' }}>
                <Grid item xs={1}>{d.id}</Grid>
                <Grid item xs={5}>
                  {
                    inEditModeQuestion.status && inEditModeQuestion.rowKey === d.id ? (
                      <TextField
                        value={unitQuestion}
                        onChange={(event) => setUnitQuestion(event.target.value)}
                      />

                    ) : (
                      d.question
                    )
                  }
                </Grid>
                <Grid item xs={1}>
                  {
                    inEditModeQuestion.status && inEditModeQuestion.rowKey === d.id ? (
                      <FormControl fullWidth>
                        <InputLabel id="unitCategory-select-label">Category</InputLabel>
                        <Select
                          labelId="unitCategory-select-label"
                          id="unitCategory-select"
                          value={unitCategory}
                          label="UnitCategory"
                          onChange={(event) => {
                            setUnitCategory(event.target.value)
                          }}
                        >
                          <MenuItem key="unitCategory-none" value="None">None</MenuItem>
                          {triviaCategories
                            && triviaCategories.data
                            && triviaCategories.data.map((x) => (
                              <MenuItem
                                key={x.name}
                                value={x.id}
                              >
                                {x.name}
                              </MenuItem>
                            ))}

                        </Select>
                      </FormControl>
                    ) : (
                      d.triviaquestionCategory && d.triviaquestionCategory.name
                    )
                  }
                </Grid>
                <Grid item xs={1}>
                  used:
                  {' '}
                  {d.trivia.length}
                </Grid>
                <Grid item xs={2}>
                  {
                    inEditModeQuestion.status && inEditModeQuestion.rowKey === d.id ? (
                      <>
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          onClick={() => onSaveEditQuestion({
                            id: d.id,
                            question: unitQuestion,
                            category: unitCategory,
                          })}
                        >
                          Save
                        </Button>

                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          style={{ marginLeft: 8 }}
                          onClick={() => onCancelEditQuestion()}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => onEditQuestion({
                          id: d.id,
                          currentUnitQuestion: d.question,
                          currentUnitCategory: d.triviaquestionCategory && d.triviaquestionCategory.id ? d.triviaquestionCategory.id : 'None',
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
                    onClick={() => handleRemoveTrivia(d.id)}
                  >
                    remove
                  </Button>
                </Grid>
                <Grid item xs={1}>
                  <Button
                    variant="contained"
                    onClick={() => handleSwitchTrivia(d.id)}
                  >
                    {d.enabled ? 'disable' : 'enable'}
                  </Button>
                </Grid>
              </Grid>

              {
                d.triviaanswers.map((a) => (
                  <Grid container>
                    <Grid item xs={1} />
                    <Grid item xs={7}>
                      {
                        inEditModeAnswer.status && inEditModeAnswer.rowKey === a.id ? (
                          <TextField
                            value={unitAnswer}
                            onChange={(event) => setUnitAnswer(event.target.value)}
                          />

                        ) : (
                          a.answer
                        )
                      }
                    </Grid>
                    <Grid item xs={2}>{a.correct ? 'correct' : 'incorrect'}</Grid>
                    <Grid item xs={2}>
                      {
                        inEditModeAnswer.status && inEditModeAnswer.rowKey === a.id ? (
                          <>
                            <Button
                              variant="contained"
                              color="primary"
                              size="large"
                              onClick={() => onSaveEditAnswer({
                                id: a.id,
                                answer: unitAnswer,
                              })}
                            >
                              Save
                            </Button>

                            <Button
                              variant="contained"
                              color="primary"
                              size="large"
                              style={{ marginLeft: 8 }}
                              onClick={() => onCancelEditAnswer()}
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={() => onEditAnswer({
                              id: a.id,
                              currentUnitAnswer: a.answer,
                            })}
                          >
                            Edit
                          </Button>
                        )
                      }
                    </Grid>
                  </Grid>
                ))
              }
            </>

          ))
        }
      </Grid>

    </div>
  );
}

TriviaManagement.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  triviaQuestions: state.triviaQuestions,
  removeTrivia: state.removeTrivia,
  insertTrivia: state.insertTrivia,
  triviaCategories: state.triviaCategories,
})

export default withRouter(connect(mapStateToProps, null)(TriviaManagement));
