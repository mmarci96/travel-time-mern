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
    e.preventDefault()
    const response = sendRequest(`/api/users/userdetails`, 'POST', userData);

    if (!response.ok) {
      throw new Error('Failed to create userdetails');
    }
    await response.json();

    navigate('/feed');
  }



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