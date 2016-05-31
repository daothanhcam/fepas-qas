import React, { Component } from 'react';
import C from '../constants';
import Firebase from 'firebase';
import store from '../store';
import { connect } from 'react-redux';
import CommentForm from '../components/CommentForm';
import { deleteQuestion } from '../actions/questions_action';

const fireRef = new Firebase(C.FIREBASE_URI);

class Question extends Component {
  componentWillMount() {
    const questionId = this.props.params.questionId;
    store.dispatch(this.getQuestionById(questionId));
  }

  getQuestionById(id) {
    return (dispatch) => {
      const fireRefQuestion = fireRef.child('questions');
      const fireRefComment = fireRef.child('comments');
      fireRefQuestion.orderByChild('id').equalTo(id).once('child_added').then((snap) => {
        const question = snap.val();
        question.comments = [];
        fireRefComment.orderByChild('qid').equalTo(id).on('child_added', (snapshot) => {
          question.comments.push(snapshot.val());
        });
        return dispatch({
          type: C.QUESTION_DETAIL_GET,
          data: question
        });
      });
    };
  }

  render() {
    const question = this.props.question;
    let content;
    if (question.status) {
      const commentView = question.data.comments.reverse().map((comment) => {
        return (
          <li key={comment.id}>{comment.content}</li>
        );
      });
      content = (
        <div>
          <p>Title: {question.data.title}</p>
          <p>Content: {question.data.content}</p>
          <p>Tags: {question.data.tags}</p>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => this.props.deleteQuestion(question.data.id)}
          >
            <span className="glyphicon glyphicon-trash"></span>Delete Question
          </button>
          <ul>Comments: {commentView}</ul>
          <CommentForm qid={question.data.uid} />
        </div>
      );
    } else {
      content = (
        <CommentForm />
      );
    }
    return content;
  }
}

const mapStateToProps = (state) => {
  return {
    question: state.question,
    uid: state.auth.uid
  };
};

const mapDispatchToProps = {
  deleteQuestion
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
