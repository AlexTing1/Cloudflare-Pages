import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import img from '../Alex_Ting_Picture_Crop.jpg';
import './css/newpost.css';

/*
  NewPost takes in Posts and setPosts and then creates the interface that allows users to publish new posts.
  When the user starts creating a new post, a Modal will pop up that allows the user to fill in the title of their post, username,
  and content of their post. After the post is created, the new post is then added the the Post list via a POST request using Axios.

  Posts is an array of objects where each object contains all the necessary information for a post. setPosts is a useState function that
  rerenders and updates posts when a new post is created.

*/
function NewPost({ posts, setPosts }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const username = 'Alexander Ting';

  //set isModalOpen to true which will open a Modal.
  function openModal() {
    setIsModalOpen(true);
  }

  //set isModalOpen to false which will close a Modal.
  function closeModal() {
    setIsModalOpen(false);
  }

  //update title with text input for title.
  function onTitleChange(event) {
    //console.log(event.target.value);
    setTitle(event.target.value);
  }

  //update content with text input for content
  function onContentChange(event) {
    //console.log(event.target.value);
    setContent(event.target.value);
  }

  //Creates Post object with input information and sends it to KV workers using axios POST request.
  function onPost() {
    var newPostObj = {
      id: posts.length,
      username: username,
      content: content,
      title: title,
      likes: 0,
      likedUsers: {},
      comments: []
    }

    const headers = {
      'Access-Control-Allow-Origin': '*',
      "content-type": "application/json",
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    }

    axios.post('https://my-worker.alexting6366.workers.dev/post', newPostObj, {
      headers: headers
    })
    .then((resp) => console.log(resp))
    .then(() => setPosts([...posts, newPostObj]))
    .then(() => closeModal())
    .catch((error) => console.log(error));
  }

  return (
    <div className="newPostBox">
      <div className="userProfile">
        <img src={img} className="newPostProfilePicture" alt="newPostProfilePicture" />
        <span className="newPostText" onClick={openModal}>Start a New Post</span>
      </div>
      <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      className="newPostModal"
      ariaHideApp={false}
      backdropOpacity={1}
      isVisible={isModalOpen}
      >
        <div>
          <label for="title" className="modalTitleLabel">Title:          </label>
          <input type="text" id="title" name="title" onChange={onTitleChange} className="modalTitleInput"/><br></br>
{/*           <label for="username" className="modalUsernameLabel">Username: </label>
          <input type="text" id="username" name="username" onChange={onUsernameChange} className="modalUsernameInput"/><br></br> */}
          <div className="modalContentLabel">
            <label for="content" >Content: </label><br></br>
            <textarea id="content" onChange={onContentChange} className="modalContentText" name="content" rows="15" cols="100"></textarea>
          </div>
          <div>
            <button type="button" onClick={onPost} className="postButton">Post</button>
          </div>
        </div>
      </Modal>
    </div>


  );
}

export default NewPost;
