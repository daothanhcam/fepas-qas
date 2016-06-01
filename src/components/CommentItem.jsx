import React, { Component } from 'react';
import CommentForm from '../components/CommentForm';

class CommentItem extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { editing: false };
  }

  handleEditClick() {
    this.setState({ editing: true });
  }

  handleSave(id, text) {
    console.log('text', text);
    this.props.editComment(this.props.data);
    this.setState({ editing: true });
  }

  render() {
    console.log('thissssssssssssssssssssss', this.props);
    const { comment } = this.props;
    let element;
    if (this.state.editing) {
      element = (
        <CommentForm
          text = {comment.content}
          onSave={ (text) => this.handleSave(comment.id, text) }
        />
      );
    } else {
      element = (
        <div className="col-md-12">
          <div className="col-md-10">
            <li key={comment.id} className={"edit"} >{comment.content}</li>
          </div>
          <div className="col-md-2">
            <button className="btn btn-sm btn-danger">Delete</button>
          </div>
        </div>
      );
    }

    return (
      <li>
        {element}
      </li>
    );
  }
}

export default CommentItem;
