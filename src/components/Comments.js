import React, { useState } from 'react';
import NewComment from './NewComment';
import DisplayComment from './DisplayComment';
import './css/comment.css';

/*
  Comments is the function that implements the comment section of each individual post. Comment calls the imported function
  NewComment to generate new comments, and the DisplayComment function to Display individual comments.

  Comments takes in post, and comments. post is the post that the comment section is attached to. Comments is the list of comments from post.
*/
function Comments({ post, comments }) {
  const [commentList, setCommentList] = useState(comments);

  const tempUser = "Alex Ting"

  return (
    <div>
      <NewComment post={post} user={tempUser} commentList={commentList} setCommentList={setCommentList} />
      {commentList && (commentList.map((comment, index) => (
        <div>
          <DisplayComment comment={comment} post={post} index={index} commentList={commentList} setCommentList={setCommentList} />
        </div>
      )))}
    </div>
  )
}

export default Comments;
