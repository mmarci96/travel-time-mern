import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../../hooks/useAuthContext.js';
import useAuthRequest from '../../hooks/useAuthRequest.js';

function UserForm({}) {
  const [profileData, setProfileData] = useState(null);
  const [userPostList, setUserPostList] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  const { currentUserId } = useAuthContext();
  console.log(currentUserId);
  const { sendRequest } = useAuthRequest();
  const handleFollow = async () => {
    const reqBody = { followId: userId };
    if (isFollowing) {
      const body = { unfollowId: userId };
      await sendRequest('/api/follows', 'DELETE', body);
      setIsFollowing(false);
      return;
    }

    const response = await sendRequest('/api/follows', 'POST', reqBody);
    if (response.data) {
      setIsFollowing(true);
      return;
    }
    return;
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const { user } = await sendRequest(
          `/api/users/${currentUserId}`,
          'GET',
        );
        console.log(user);
        if (user) {
          setProfileData({ ...user,firstName:user?.firstName, lastName: user?.lastName,
            email:user?.email, birthday:user?.birthday, location:user?.location,gender:user?.gender} );
          const followers = user.followers;
          if (followers.includes(currentUserId)) {
            setIsFollowing(true);
          } else {
            setIsFollowing(false);
          }
        }

        const { posts } = await sendRequest(
          `/api/posts/by-author/${userId}`,'GET'
        );
        if (posts) {
          setUserPostList(posts);
        }
      } catch (e) {
        console.log('No posts');
      }
    };

    fetchUserDetails();
  }, [currentUserId]);



  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setProfileData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch(`/api/users/${profileData.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      throw new Error('Failed to update user');
    }
    await response.json();

    navigate('/feed');
  }

  const renderInput = (key, value) => {
    if (typeof value === 'object') return null
    if (Array.isArray(value)) return null

    return (
      <div key={key} className='w-full flex'>
      <span className='w-[20%] m-2 flex'>
        <label className='m-2 p-2 text-xl'>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
      </span>
        <input
          className=' p-2 m-2 bg-gray-100 border-2 border-secondary rounded-m ml-4 mr-auto w-[70%]'
          type={typeof value === 'boolean' ? 'checkbox' : 'text'}
          name={key}
          value={typeof value === 'boolean' ? undefined : value}
          checked={typeof value === 'boolean' ? value : undefined}
          onChange={handleChange}
          required={!!value}
        />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center '>
      <h2 className='text-4xl font-semibold tracking-wide'>Edit User</h2>
      {profileData && Object.entries(profileData).map(([key, value]) => renderInput(key, value))}
      <button className='bg-secondary text-white p-2 rounded-md mx-auto px-4' type='submit'>
        Save Changes
      </button>
    </form>
  )
}
export default UserForm;