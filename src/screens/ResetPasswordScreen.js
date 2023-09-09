
import Axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Store } from '../Store';
import { getError } from '../utils';
import eyes from '../components/eyes.svg'

Axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

export default function ResetPasswordScreen() {
  const navigate = useNavigate();
  const { token } = useParams();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo || !token) {
      navigate('/');
    }
  }, [navigate, userInfo, token]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      await Axios.post('/api/users/reset-password', {
        password,
        token,
      });
      navigate('/signin');
      toast.success('Password updated successfully');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Container className="small-container">
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
      <h1 className="my-3">Reset Password</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>New Password</Form.Label>
          <div className="input-group">
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
             
              variant="outline-secondary"
              onClick={togglePasswordVisibility}
            
            >
              {showPassword ? <img src={eyes} alt="open" /> : '👁️' }
            </Button>
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm New Password</Form.Label>
          <div className="input-group">
          <Form.Control
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
           <Button
                variant="outline-secondary"
              onClick={togglePasswordVisibility}
              className="password-toggle-button"
            >
             {showPassword ? <img src={eyes} alt="open" /> : '👁️' }
            </Button>
            </div>
        </Form.Group>

        <div className="mb-3">
          <Button type="submit">Reset Password</Button>
        </div>
      </Form>
    </Container>
  );
}
