import React, { useState } from 'react';
import axios from 'axios';
import Comments from './Comments';
import img from '../Alex_Ting_Picture_Crop.jpg';
import likeButton from '../like_button.svg.png';
import './css/post.css';

/*
  The post function creates each individual post that is displayed in the web application.
  The comment section for each post is displayed through the Comment function that is imported
  and is only displayed if there are comments or if the comment button has been clicked to display
  comments. Post takes in post, posts, and setPosts. post is the individual post that is to be displayed
  by the post function. posts is an array of objects where each object is a post. setPosts is a useState function
  that updates posts.

  Other than the comment section, Post also implements the like functionality where you can like the post.
  Everytime the like button is pressed, the backend Worker KV is updated using a PATCH request.

*/
function Post({ post, posts, setPosts }) {
  const [likes, setLikes] = useState(post.likes);
  const [upVote, setUpVote] = useState(post.likedUsers[post.username] === undefined);
  const [showComment, setShowComment] = useState(post.comments.length !== 0);

  let like_class = upVote ? "likeButton" : "likeButtonAfterClick"

  //updates KV workers when onLikeButtonClick is called
  function onLikeButtonClick() {
    if (upVote) {
      setLikes(likes + 1);
      setUpVote(false);
      post.likes = likes + 1;
      post.likedUsers[post.username] = 1;
    } else {
      setLikes(likes - 1);
      setUpVote(true);
      post.likes = likes - 1;
      delete post.likedUsers[post.username];
    }

    setPosts(posts);


    const headers = {
      'Access-Control-Allow-Origin': '*',
      "content-type": "application/json",
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    }
    axios.patch('https://my-worker.alexting6366.workers.dev/post', post, { headers: headers})
      .then((resp) => console.log(resp))
      .catch((error) => console.log(error));
  }

  //show comments when function onCommentClick is called
  function onCommentClick() {
    if (showComment) {
      setShowComment(false);
    } else {
      setShowComment(true);
    }
  }

  return (
    <div className="box">
      <span className="title">{post.title}</span>
      <br />
      <div className="userProfile">
        <img src={img} className="profilePicture" alt="newProfilePicture" />
        <span className="username">{post.username}</span>
      </div>
      <p className="content">{post.content}</p>

      <div id="interactiveCounter" className="interactiveCounter">
        {post.likes !== 0 &&
        <>
          <img src={likeButton} className="likeButtonImg" alt="likeButtonImage" />
          <span className="likeCounter">{post.likes}</span>
        </>}

        {post.comments.length !== 0 &&
        <>
          <span className="commentCounter"> {post.comments.length} comments</span>
        </>}
      </div>
      <hr className="hrTopBreak" />
      <div className="interactiveButtons">
        <button type="button" onClick={onLikeButtonClick} className={like_class}>
          <span>Like</span>
        </button>
        <button type="button" onClick={onCommentClick} className="commentButton">Comment</button>
      </div>

      <hr className="hrBottomBreak" />

      {(showComment) && <Comments post={post} comments={post.comments} />}
    </div>
  );
}

export default Post;
