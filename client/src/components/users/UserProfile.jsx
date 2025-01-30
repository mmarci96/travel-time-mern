import { useEffect, useState } from 'react';
import useAuthRequest from '../../hooks/useAuthRequest';
import Button from '../common/Button';
import { Link } from 'react-router-dom';
import useAuthContext from '../../hooks/useAuthContext.js';

const UserProfile = ({ userId }) => {
    const [profileData, setProfileData] = useState(null);
    const [userPostList, setUserPostList] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);

    const { currentUserId } = useAuthContext();
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
                    `/api/users/${userId}`,
                    'GET',
                );
                if (user) {
                    setProfileData(user);
                    const followers = user.followers;
                    if (followers.includes(currentUserId)) {
                        setIsFollowing(true);
                    } else {
                        setIsFollowing(false);
                    }
                }

                const { posts } = await sendRequest(
                    `/api/posts/by-author/${userId}`,
                    'GET',
                );
                if (posts) {
                    setUserPostList(posts);
                }
            } catch (e) {
                console.log('No posts', e);
            }
        };

        if (currentUserId) {
            fetchUserDetails();
        }
    }, [currentUserId, userId]);
    return (
        <div className="flex flex-col bg-gray-100 w-full">
            <div
                className="relative bg-cover bg-center h-56"
                style={{
                    backgroundImage: `url(${profileData?.avatar_url ||
                        'https://picsum.photos/800/400'
                        })`,
                }}
            >
                <img
                    src={
                        profileData?.avatar_url ||
                        'https://placehold.co/200x200?text=No+Avatar'
                    }
                    alt="Profile"
                    className="rounded-full border-4 border-white absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/4 w-32 h-32 object-cover"
                />
            </div>
            <div className="flex flex-col md:flex-row w-full p-4">
                <div className="w-full md:w-1/3 p-4">
                    <div className="bg-white p-4 rounded-lg md:block shadow-md mb-4 sm:flex">
                        <h1 className="text-2xl font-bold">
                            {profileData?.first_name} {profileData?.last_name}
                        </h1>
                        <p className="text-gray-600">
                            @{profileData?.username}
                        </p>
                        <p className="text-gray-600">{profileData?.bio}</p>

                        <Button
                            children={isFollowing ? 'Unfollow' : 'Follow'}
                            color="cyan"
                            onClick={handleFollow}
                        />
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                        <h2 className="text-xl font-bold mb-2">
                            Profile Information
                        </h2>
                        <p>
                            <strong>Birthdate:</strong>{' '}
                            {new Date(
                                profileData?.birthdate,
                            ).toLocaleDateString('en-US', {
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
                            {new Date(
                                profileData?.created_at,
                            ).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </p>
                        <p>
                            <strong>Interests:</strong>{' '}
                            {profileData?.interests?.join(', ') || 'N/A'}
                        </p>
                        <p>
                            <strong>Languages Spoken:</strong>{' '}
                            {profileData?.languages_spoken?.join(', ') || 'N/A'}
                        </p>

                        <p>
                            <strong>Visiting List:</strong>{' '}
                            {profileData?.visiting_list?.join(', ') || 'N/A'}
                        </p>
                    </div>
                </div>
                <div className="w-full md:w-2/3 p-4">
                    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                        <h2 className="text-xl font-bold mb-4">Posts</h2>
                        {userPostList && userPostList.length > 0 ? (
                            userPostList.map((post) => (
                                <div
                                    key={post.id}
                                    className="mb-4 p-4 border rounded-lg shadow-sm"
                                >
                                    <h3 className="text-lg font-bold">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        {post.description}
                                    </p>

                                    <Link to={`/post/${post.id}`}>
                                        <img
                                            src={post.image_url}
                                            alt={post.title}
                                            className="w-full h-auto mt-2 rounded-lg"
                                        />
                                    </Link>
                                    <p className="text-sm text-gray-500 mt-2">
                                        {new Date(
                                            post.created_at,
                                        ).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600">No posts available.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
