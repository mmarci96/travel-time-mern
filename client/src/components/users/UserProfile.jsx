import { useEffect, useState } from 'react';

import useAuthRequest from '../../hooks/useAuthRequest';

const UserProfile = ({ userId }) => {
    const [ profileData, setProfileData ] = useState(null);
    const [ userPostList, setUserPostList ] = useState(null);
    const { sendRequest, error, loading } = useAuthRequest();

    useEffect(() => {
        const fetchUserDetails = async () => {
            const { user } = await sendRequest(`/api/users/${userId}`, 'GET')
            if (user) {
                setProfileData(user)
            }

            const { posts } = await sendRequest(`/api/posts/by-author/${userId}`)
            if (posts) {
                setUserPostList(posts)
            }
        }

        fetchUserDetails();
    }, [])
    useEffect(()=>{
        console.log("User:", profileData)
        console.log("Posts:", userPostList)
    },[profileData, userPostList])

    return (
        <div className='flex flex-col bg-gray-100 w-full'>
            <div
                className='relative bg-cover bg-center h-56'
                style={{
                    backgroundImage: `url(${
profileData?.avatar_url || 'https://via.placeholder.com/800x200?text=Profile+Background'
})`,
                }}
            >
                <img
                    src={profileData?.avatar_url || 'https://via.placeholder.com/150'}
                    alt='Profile'
                    className='rounded-full border-4 border-white absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-32 h-32 object-cover'
                />
            </div>
            <div className='flex flex-col md:flex-row w-full p-4'>
                <div className='w-full md:w-1/3 p-4'>
                    <div className='bg-white p-4 rounded-lg shadow-md mb-4'>
                        <h1 className='text-2xl font-bold'>
                            {profileData?.first_name} {profileData?.last_name}
                        </h1>
                        <p className='text-gray-600'>@{profileData?.username}</p>
                        <p className='text-gray-600'>{profileData?.bio}</p>
                    </div>
                    <div className='bg-white p-4 rounded-lg shadow-md mb-4'>
                        <h2 className='text-xl font-bold mb-2'>Profile Information</h2>
                        <p>
                            <strong>Birthdate:</strong>{' '}
                            {new Date(profileData?.birthdate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </p>
                        <p>
                            <strong>Location:</strong> {profileData?.location}
                        </p>
                        <p>
                            <strong>Gender:</strong> {profileData?.gender}
                        </p>
                        <p>
                            <strong>Email:</strong> {profileData?.email}
                        </p>
                        <p>
                            <strong>Member since:</strong>{' '}
                            {new Date(profileData?.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </p>
                        <p>
                            <strong>Interests:</strong> {profileData?.interests.join(', ') || 'N/A'}
                        </p>
                        <p>
                            <strong>Languages Spoken:</strong> {profileData?.languages_spoken?.join(', ') || 'N/A'}
                        </p>

                        <p>
                            <strong>Visiting List:</strong> {profileData?.visiting_list.join(', ') || 'N/A'}
                        </p>
                    </div>
                </div>
                <div className='w-full md:w-2/3 p-4'>
                    <div className='bg-white p-4 rounded-lg shadow-md mb-4'>
                        <h2 className='text-xl font-bold mb-4'>Posts</h2>
                        {userPostList && userPostList.length > 0 ? (
                            userPostList.map((post) => (
                                <div key={post._id} className='mb-4 p-4 border rounded-lg shadow-sm'>
                                    <h3 className='text-lg font-bold'>{post.title}</h3>
                                    <p className='text-gray-600'>{post.description}</p>
                                    <img src={post.image_url} alt={post.title} className='w-full h-auto mt-2 rounded-lg' />
                                    <p className='text-sm text-gray-500 mt-2'>
                                        {new Date(post.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>
                                </div>
                            ))
                        ) : (
                                <p className='text-gray-600'>No posts available.</p>
                            )}
                    </div>
                </div>
            </div>
        </div>
    )}

export default UserProfile;
