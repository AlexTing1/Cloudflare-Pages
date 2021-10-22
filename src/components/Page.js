import React, { useEffect, useState } from 'react';
import Post from './Post';
import './css/page.css';

/*
  Page is a function that displays the users posts. The function takes in posts and setPosts. Posts is an array of
  objects where each object is a post with all the necesssary information to generate a "Post". setPosts is a useState
  function that allows the user to update posts. setPosts is not used this function, but is passed down to the function Posts.
  The Page function does not actually create each individual post, rather it passes that responsiblity down to the Post class.
  In addition to that, Page contains the sorting functionality where the user can decide to sort the posts by time created vs posts with most
  likes.
*/
function Page( { posts, setPosts }) {
  //console.log("this is posts in Page: ", posts);

  const [order, setOrder] = useState('Recent');
  const [organizePosts, setOrganizePosts] = useState(posts);

  useEffect(() => {
    setOrganizePosts(posts);
  }, [posts]);

  //updates order of posts based on order selection. Post order can be sorted by either likes or posting order
  function orderSelect() {
    if (order === 'Recent') {
      setOrder('Top');
      setOrganizePosts(posts.sort((a, b) => (b.id - a.id)))
    } else {
      setOrder('Recent');
      setOrganizePosts(posts.sort((a, b) => (b.likes - a.likes)))
    }
  }

  return (
    <div>
      <div className="selectOrder">
        <select name="sortOrder" id="sortOrder" onChange={orderSelect}>
          <option value="Top">Top</option>
          <option value="Recent">Recent</option>
        </select>
      </div>
      {organizePosts !== [] && organizePosts.map((post, index) => (
        <div>
          <Post post={post} posts={organizePosts} setPosts={setPosts} />
        </div>
      ))}
    </div>
  );
}

export default Page;