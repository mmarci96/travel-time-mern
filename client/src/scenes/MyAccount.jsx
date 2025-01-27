import UserProfile from '../components/users/UserProfile.jsx';
import { FaPencilAlt } from 'react-icons/fa';
import { useState } from 'react';
import UserForm from '../components/users/UserForm.jsx';
import { FaSave } from "react-icons/fa";

const hate="679755a60509085ae642a864";

const MyAccount = () => {
  const [change, setChange] = useState(true);


  return (
    <div>
      <div>MyAccount</div>

      {change  ? (
          <div>
            <UserProfile />
            <FaPencilAlt size={30} onClick={() => setChange(false)} />
          </div>)

        :
        (<div>
            <UserForm  />
            <FaSave size={30} onClick={() => setChange(true)} />
          </div>
            )
            }

          </div>
        );
      };

      export default MyAccount;
