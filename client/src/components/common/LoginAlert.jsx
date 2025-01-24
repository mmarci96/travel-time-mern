import { Link, useNavigate } from 'react-router-dom';
import Button from './Button.jsx';

function LoginAlert() {
  const navigate = useNavigate();
  return (
    <div>
      <Link to="/">
        <Button>
          Please Login
        </Button>
      </Link>
    </div>
  );
}

export default LoginAlert;