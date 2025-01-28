import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../../hooks/useAuthContext.js';
import useAuthRequest from '../../hooks/useAuthRequest.js';
import Button from '../common/Button.jsx';
import UserForm from './UserForm.jsx';

function UserUpdate({}) {
    const [profileData, setProfileData] = useState(null);
    const [userPostList, setUserPostList] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const navigate = useNavigate();

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
                    setProfileData({
                        ...user,
                        first_name: user?.first_name,
                        last_name: user?.last_name,
                        birthdate: user?.birthdate,
                        location: user?.location,
                        gender: user?.gender,
                    });
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
                console.log('No posts');
            }
        };

        fetchUserDetails();
    }, [currentUserId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProfileData((prevState) => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = sendRequest(
            `/api/users/${currentUserId}`,
            'PUT',
            profileData,
        );

        if (!response) {
            throw new Error('Failed to update user');
        }

        navigate('/feed');
    };

    return (
        <UserForm
            user={profileData}
            onChange={handleChange}
            onSubmit={handleSubmit}
        />
    );
}
export default UserUpdate;
