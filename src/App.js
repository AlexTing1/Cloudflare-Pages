import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Page from './components/Page';
import NewPost from './components/NewPost';
import NavBar from './components/NavBar';
import './App.css';

/*
  App function initalizes the web application. It uses axios GET function to gather post data and passes data to NewPost and Page function
  where the rest of the web application is created.
*/
function App() {
  const [posts, setPosts] = useState([]);

  //  Post example used for testing purposes.

  /* var testComments = [
    {
      "id": 0,
      "username": "comment user 1",
      "content": "blah blah blah",
      "likes": 2,
    },
    {
      "id": 1,
      "username": "comment user 2",
      "content": "comment with 0 likes",
      "likes": 0,
    }
  ]
  var test = {
    "id":0,
    "username": 'testingUser',
    "content":'eoifjaweofjaweo fjaweopfj aweopfjaweop fjaweopfj awepof jaweopfhaewropighnsaeropigjhseripgosdfhrgopi adsjfpoiaewj o[pawejfposerj g[opaewrjfpoaerjg[0srtjgpoaewrfghpoaewrhjgfpoaerhjfaowejfp oawej fpoawejf aw',
    "title":'Testing title',
    "likes": 10,
    "comments": testComments
  } */

  useEffect(() => {
    console.log("was in useEffect");
    const headers = {
      'Access-Control-Allow-Origin': '*',
      "content-type": "application/javascript",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    }

    axios.get('https://my-worker.alexting6366.workers.dev/post', {
      headers: headers
    })
      .then((resp) => {
        var data = resp.data.data;
        console.log(data);
        var jsonData = [];
        data.forEach((post) => jsonData.push(JSON.parse(post)))
        console.log(jsonData);
        setPosts(jsonData);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="App">
      <NavBar />
      <NewPost posts={posts} setPosts={setPosts} />
      <Page posts={posts} setPosts={setPosts}/>
    </div>
  );
}

export default App;
