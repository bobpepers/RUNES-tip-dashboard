import React, {
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import { connect, useDispatch } from 'react-redux';
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
} from '../../actions/trivia';

const styles = {
  card: {
    minWidth: 275,
    margin: '50px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

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
          {inputAnswerList.map((x, i) => {
            console.log(x);
            return (
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
            )
          })}
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
                <Grid item xs={8}>{d.question}</Grid>
                <Grid item xs={1}>
                  used:
                  {' '}
                  {d.trivia.length}
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
                d.triviaanswers.map((a) => {
                  console.log(a);
                  return (
                    <Grid container>
                      <Grid item xs={1} />
                      <Grid item xs={9}>{a.answer}</Grid>
                      <Grid item xs={2}>{a.correct ? 'correct' : 'incorrect'}</Grid>
                    </Grid>
                  )
                })
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

export default withStyles(styles)(withRouter(connect(mapStateToProps, null)(TriviaManagement)));
