
import Axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import eyes from '../components/eyes.svg';

Axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

export default function SigninScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to control password visibility

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post('/api/users/signin', {
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign In</title>
      </Helmet>

      <div className="signin">
        <h1 className="my-3 text-uppercase text-center">Sign In</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>
              <i className="fa fa-envelope" /> Email
            </Form.Label>
            <Form.Control
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>
              <i className="fa fa-lock" /> Password
            </Form.Label>
            <div className="input-group">
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                variant="outline-secondary"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <img src={eyes} alt="open" /> : '👁️'}
              </Button>
            </div>
          </Form.Group>
          <div className="mb-3">
            <Button type="submit">Sign In</Button>
          </div>
          <div className="mb-3">
            New customer?{' '}
            <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
          </div>
          <div className="mb-3">
            Forget Password? <Link to={`/forget-password`}>Reset Password</Link>
          </div>
        </Form>
      </div>
    </Container>
  );
}
