import React, {
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import {
  connect,
  useDispatch,
} from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import {
  Grid,
  Button,
  TextField,
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

const TriviaManagement = function (props) {
  const {
    auth,
    triviaQuestions,
    removeTrivia,
    insertTrivia,
  } = props;
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.authenticated) {
      dispatch(fetchTriviaQuestions());
    }
  }, [
    auth,
  ]);

  useEffect(
    () => {
      console.log(auth);
      console.log('--------------------------');
      console.log(triviaQuestions);
    },
    [
      auth,
      triviaQuestions,
      removeTrivia,
      insertTrivia,
    ],
  );

  const [inputAnswerList, setInputAnswerList] = useState([{ answer: '', correct: 'false' }]);
  const [inputQuestion, setInputQuestion] = useState('');
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
    console.log(e);
    const { name, value } = e.target;
    const list = [...inputAnswerList];
    list[index][name] = value;
    setInputAnswerList(list);
  };

  const handleInputQuestionChange = (e) => {
    console.log(e);
    const { value } = e.target;
    setInputQuestion(value);
  };

  const handleInsertTrivia = () => {
    dispatch(insertTriviaAction({
      question: inputQuestion,
      answers: inputAnswerList,
    }));
    setInputAnswerList([{ answer: '', correct: 'false' }]);
    setInputQuestion('');
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
    console.log(currentUnitAnswer);
    setinEditModeAnswer({
      status: true,
      rowKey: id,
    })
    setUnitAnswer(currentUnitAnswer);
    console.log(unitAnswer);
  }

  const onEditQuestion = ({
    id,
    currentUnitQuestion,
  }) => {
    console.log(currentUnitQuestion);
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
    ));

    setinEditModeQuestion({
      status: false,
      rowKey: null,
    })
    setUnitQuestion(null);
  }

  const onCancelEditAnswer = () => {
    setinEditModeAnswer({
      status: false,
      rowKey: null,
    })
    setUnitAnswer(null);
  }

  const onCancelEditQuestion = () => {
    setinEditModeAnswer({
      status: false,
      rowKey: null,
    })
    setUnitQuestion(null);
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
                <select
                  onChange={(e) => handleInputAnswerChange(e, i)}
                  name="correct"
                  style={{ fontSize: '30px' }}
                >
                  <option value="false">
                    incorrect
                  </option>
                  <option value="true">
                    correct
                  </option>
                </select>
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
                <Grid item xs={6}>
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
})

export default withRouter(connect(mapStateToProps, null)(TriviaManagement));
