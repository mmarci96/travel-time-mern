import { Link } from 'react-router-dom'

const PostCard = ({ post }) => {
  return (
    <div
      className='m-4 p-1 border-2 rounded-xl shadow-slate-400 shadow-md min-w-[350px] w-[60vw] mx-auto'>
      <Link to={`/post/${post._id}`}>
        <img
          loading='lazy'
          src={post.image_url}
          className='hover:shadow-lg hover:shadow-slate-900 ease-in duration-200 rounded-lg shadow-md shadow-black mb-4 w-[60vw]'
        />
      </Link>
      <span className='flex'>
        <h3
          className='post-title text-lg  font-semibold tracking-wider p-2 m-3 mb-1'>{post.title}</h3>
        <h3
          className='text-lg m-4 p-2 mb-1'> {new Date(post?.created_at).toDateString()} </h3>
      </span>
      {post.author_id ? (
        <span className='flex mb-2'>
          <img src={post.author_id}
               className='w-14 rounded-full shadow-md shadow-slate-700 ml-4'></img>

          <h4
            className='text-xl italic mt-2 cursor-pointer hover:bg-gray-200 p-2 px-4 mx-4 rounded-xl'>
            <Link to={`/profile/${post.author_id}`}>By: {post.author_name}</Link>
          </h4>
        </span>
      ) : (
        <p>looking for author .. .</p>
      )}
    </div>)
};

export default PostCard;