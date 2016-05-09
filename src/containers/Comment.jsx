import React, { Component } from 'react';
import C from '../constants';
import Firebase from 'firebase';
import store from '../store';
import { connect } from 'react-redux';

const fireRef = new Firebase(C.FIREBASE_URI);

class Comments extends Component {
  componentWillMount() {
    const userId = this.props.current_user.uid;
    store.dispatch(this.getCommentByUserIdi(userId));
  }

  getCommentByUserId(id) {
    return (dispatch) => {
      const fireRefQues = fireRef.child('questions');
      const fireRefComment = fireRef.child('comments');
      fireRefComment.orderByChild('uid').equalTo(id).once('child_added').then((snap) => {
        const comments = [];
        const comment = snap.val();
        fireRefQues.orderByChild('id').equalTo(comment.qid).once('child_added').then((qSnap) => {
          comment.question = qSnap.title;
        });
        comments.push(comment);
        return dispatch({
          type: C.COMMENTS_GET,
          data: comment
        });
      });
    };
  }

  render() {
    const comments = this.props.comments;
    let content;
    if (comments.status) {
      comments.map((comment) => {
        console.log(comment.content);
        return (<li key={comment.id}> {comment.content} </li>);
      });
    } else {
      content = (
        <p></p>
      );
    }
    return content;
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments,
  };
};

export default connect(mapStateToProps)(Comments);
