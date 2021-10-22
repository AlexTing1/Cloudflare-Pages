import React, { useState } from 'react';
import axios from 'axios';
import likeButton from '../like_button.svg.png';
import profilePic from '../blank-profile-picture.png';
import './css/comment.css';

/*
  DisplayComment displays the individual comment passed into DisplayComment.
  DisplayComment takes in comment, index, post, commentList, and setCommentList. comment
  is the individual comment to be displayed, index is the index number of the comment in commentList,
  commentList is an array of objects where each object is a comment, and setCommentList is a useState
  function that updates commentList.

  In addition to displaying individual comments, DisplayComment also handles the like functionality
  so that users can like comments as well as posts. After a comment has been liked or unliked, a PATCH
  request will be sent using axios to update the like status on a comment within a post.
*/
function DisplayComment({ comment, index, post, commentList, setCommentList}) {
  const [likeClick, setLikeClick] = useState(commentList[index].likedUsers[post.username] !== undefined);
  let like_class = likeClick ? "likeLinkAfterClick" : "likeLink"
  const profilePicture = comment.img === undefined ? profilePic : comment.img;

  //updates like count when onLikeClick is called. Afterwards, it sent the updated data to KV workers
  //via a patch request.
  function onLikeClick() {
    if (!likeClick) {
      console.log("was in likeClick true");
      setLikeClick(true);
      commentList[index].likes++;
      commentList[index].likedUsers[post.username] = 1;
    } else {
      console.log("was in likeClick false");
      setLikeClick(false);
      commentList[index].likes--;
      delete commentList[index].likedUsers[post.username];
    }

    const headers = {
      'Access-Control-Allow-Origin': '*',
      "content-type": "application/json",
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    }

    axios.patch('https://my-worker.alexting6366.workers.dev/post', post, { headers: headers})
      .then((resp) => console.log(resp.data))
      .then(() => setCommentList([...commentList]))
      .catch((error) => console.log(error));
  }

  return(
    <div>
      <div className="commentContainer">
        <div className="commentUserInfo">
          <img src={profilePicture} className="commentProfilePic" alt="commentProfilePicture" />
          <span>{comment.username}</span>
        </div>
        <div className="commentContent">
          <p>{comment.content}</p>
        </div>
        <div className="likeContainer">
          <button type="button" onClick={onLikeClick} className={like_class}>Like</button>
          {comment.likes !== 0 &&
            <>
              <img src={likeButton} className="likeCommentImg" alt="likeCommentImage" />
              <span className="likeComment">{comment.likes}</span>
            </>}
        </div>
      </div>
    </div>
  )
}

export default DisplayComment;
