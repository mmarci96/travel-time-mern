import useAuthRequest from '../../hooks/useAuthRequest.js';
import { useEffect, useState } from 'react';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const { loading, error, sendRequest } = useAuthRequest(
    '/api/posts',
    'GET',
  );
  useEffect(() => {
    sendRequest().then(data => data ? setPosts(data) : setPosts([]));
  }, []);


  return (
    <ul>PostList
      {posts.length > 0 && posts.map((post) => (
        <li key={post._id}>
          {post.title}
        </li>
      ))}
    </ul>);
};

export default PostList;
