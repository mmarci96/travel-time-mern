import useAuthRequest from '../../hooks/useAuthRequest.js';
import { useEffect, useState } from 'react';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const { loading, error, response, sendRequest } = useAuthRequest(
    '/api/posts',
    'GET',
  );
  useEffect(() => {
    sendRequest()
  }, []);

  useEffect(() => {
    console.log(response)
    if (response && response.length > 0) {
      setPosts(response);
    }
  }, [response])

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
