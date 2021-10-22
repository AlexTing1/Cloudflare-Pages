import React, { useState } from 'react';
import axios from 'axios';
import img from '../Alex_Ting_Picture_Crop.jpg';
import './css/newcomment.css';

/*
  NewComment function is the functionality that allows users to add a new comment to a post.
  NewComment takes in post, user, commentList, and setCommentList. post is the post where NewComment
  is adding a new comment. user is the user of the NewComment, commentList is the list of comments under
  post, and setCommentList is a useState function that updates commentList.

  When a NewComment is submitted, a PATCH request is sent to /post using axios that updates the KV worker
  backend of the edited post. It also then resets the state of the New Comment input text bar.
*/
function NewComment({ post, user, commentList, setCommentList }) {
  const [commentText, setCommentText] = useState('');

  //Keep tracks of comment changes in commentText.
  function onCommentChange(event) {
    setCommentText(event.target.value);
  }

  //Resets the comment input text box to blank.
  function resetInput() {
    var commentInput = document.getElementById('commentInput');
    commentInput.value = "";
  }

  //Creates a new comment with the information given and sends that information to worker KV using an axios PATCH
  //request. Console log the error if it fails.
  function onCommentPost() {
    const commentId = post.comments.length;

    const comment = {
      id: commentId,
      username: user,
      content: commentText,
      likes: 0,
      likedUsers: {},
      img: img,
    }
    let tempCommentList = commentList.slice(0);
    post.comments.push(comment);

    const headers = {
      'Access-Control-Allow-Origin': '*',
      "content-type": "application/json",
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    }

    axios.patch('https://my-worker.alexting6366.workers.dev/post', post, { headers: headers})
      .then((resp) => console.log(resp.data))
      .then(() => setCommentText(''))
      .then(() => resetInput())
      .then(() => setCommentList([...tempCommentList, comment]))
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <div className="newCommentBox">
        <img src={img} className="commentProfilePic" alt="commentProfilePicture" />
        <div className="commentInput">
          <input type="text" id="commentInput" onChange={onCommentChange} className="commentText"></input>
        </div>
      </div>
      {commentText !== '' &&
      <div>
        <button type="button" onClick={onCommentPost} className="postCommentButton">Post</button>
      </div> }
    </div>
  );
}

export default NewComment;
