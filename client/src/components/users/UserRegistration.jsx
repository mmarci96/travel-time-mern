import { useState } from 'react';
import UserForm from './UserForm.jsx';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../../hooks/useAuthContext.js';
import useAuthRequest from '../../hooks/useAuthRequest.js';

function UserRegistration(){
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate()
  const { currentUserId } = useAuthContext();
  console.log(currentUserId);
  const { sendRequest } = useAuthRequest();


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setUserData((prevState) => ({id:currentUserId,
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await sendRequest(`/api/users/userdetails`, 'POST', userData);

      console.log('Response:', response);

      if (!response.token) {
        throw new Error('Failed to create userdetails');
      }

      const responseData = await response.json();
      console.log('Response Data:', responseData);

      navigate('/feed');
    } catch (error) {
      console.error('Error during user details creation:', error);
      alert('There was an issue submitting your details. Please try again.');
    }
  };


  return (
      <div  className='w-full flex'>
     <p>
       Please enter your details for completing the registration.
       </p>
        <UserForm onSubmit={handleSubmit} user={userData} onChange={handleChange}/>
      </div>
    )

}
export default UserRegistration;