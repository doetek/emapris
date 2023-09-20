
// import React, { useContext, useEffect, useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import { Helmet } from 'react-helmet-async';
// import { Store } from '../Store';
// import { toast } from 'react-toastify';
// import { getError } from '../utils';
// import Axios from 'axios';
// import eyes from '../components/eyes.svg'

// Axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

// export default function SignupScreen() {
//   const navigate = useNavigate();
//   const { search } = useLocation();
//   const redirectInUrl = new URLSearchParams(search).get('redirect');
//   const redirect = redirectInUrl ? redirectInUrl : '/';

//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false); // State for loading spinner

//   const { state, dispatch: ctxDispatch } = useContext(Store);
//   const { userInfo } = state;

//   const showToast = (message, type) => {
//     toast[type](message, {
//       position: 'top-right',
//       autoClose: 3000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//     });
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       showToast('Passwords do not match', 'error');
//       return;
//     }
//     setIsLoading(true); // Start loading spinner
//     try {
//       const { data } = await Axios.post('/api/users/signup', {
//         name,
//         email,
//         password,
//       });
//       ctxDispatch({ type: 'USER_SIGNIN', payload: data });
//       localStorage.setItem('userInfo', JSON.stringify(data));
//       navigate(redirect || '/');
//       showToast('Signup successful', 'success');
//     } catch (err) {
//       showToast(getError(err), 'error');
//     } finally {
//       setIsLoading(false); // Stop loading spinner
//     }
//   };

//   useEffect(() => {
//     if (userInfo) {
//       navigate(redirect);
//     }
//   }, [navigate, redirect, userInfo]);

//   return (
//     <Container className="small-container">
//       <Helmet>
//         <title>Sign Up</title>
//       </Helmet>
//       <div className='signup'>
//       <h1 className="my-3 text-uppercase text-center" >Sign Up</h1>
//       <Form onSubmit={submitHandler}>
//         <Form.Group className="mb-3" controlId="name">
//           <Form.Label>Name</Form.Label>
//           <Form.Control onChange={(e) => setName(e.target.value)} required />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="email">
//           <Form.Label>Email</Form.Label>
//           <Form.Control
//             type="email"
//             required
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="password">
//           <Form.Label>Password</Form.Label>
//           <div className="input-group">
//             <Form.Control
//               type={showPassword ? 'text' : 'password'}
//               required
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <Button
//                 variant="outline-secondary"
//               onClick={togglePasswordVisibility}
//               className="password-toggle-button"
//             >
//              {showPassword ? <img src={eyes} alt="open" /> : '👁️' }
//             </Button>
//           </div>
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="confirmPassword">
//           <Form.Label>Confirm Password</Form.Label>
//           <div className="input-group">
//           <Form.Control
         
//             type={showPassword ? 'text' : 'password'}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//            <Button
//                 variant="outline-secondary"
//               onClick={togglePasswordVisibility}
//               className="password-toggle-button"
//             >
//              {showPassword ? <img src={eyes} alt="open" /> : '👁️' }
//             </Button>
//             </div>
//         </Form.Group>
//         <div className="mb-3">
//           {isLoading ? (
//             <p>Loading...</p>
//           ) : (
//             <Button type="submit">Sign Up</Button>
//           )}
//         </div>
//         <div className="mb-3">
//           Already have an account?{' '}
//           <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
//         </div>
//       </Form>
//       </div>
     
//     </Container>
//   );
// }


import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import Axios from 'axios';
import eyes from '../components/eyes.svg';
import { toast } from 'react-toastify';
import { getError } from '../utils';

Axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

export default function SignupScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State for loading spinner

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

    const showToast = (message, type) => {
    toast[type](message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{4,}$/;
    return passwordRegex.test(password);
  };

  const validateForm = () => {
    let isValid = true;

    if (!isEmailValid(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!isPasswordValid(password)) {
      setPasswordError(
        'Password must be at least 4 characters, including at least one uppercase letter, one lowercase letter, and one number'
      );
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    return isValid;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true); // Start loading spinner
    try {
      const { data } = await Axios.post('/api/users/signup', {
        name,
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
      showToast('Signup successful', 'success');
    } catch (err) {
      showToast(getError(err), 'error');
      // Handle server errors here if needed
    } finally {
      setIsLoading(false); // Stop loading spinner
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <div className="signup">
        <h1 className="my-3 text-uppercase text-center">Sign Up</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control onChange={(e) => setName(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!emailError}
            />
            <Form.Control.Feedback type="invalid">
              {emailError}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <div className="input-group">
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                required
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={!!passwordError}
              />
              <Button
                variant="outline-secondary"
                onClick={togglePasswordVisibility}
                className="password-toggle-button"
              >
                {showPassword ? <img src={eyes} alt="open" /> : '👁️'}
              </Button>
              <Form.Control.Feedback type="invalid">
                {passwordError}
              </Form.Control.Feedback>
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <div className="input-group">
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                isInvalid={!!confirmPasswordError}
              />
              <Button
                variant="outline-secondary"
                onClick={togglePasswordVisibility}
                className="password-toggle-button"
              >
                {showPassword ? <img src={eyes} alt="open" /> : '👁️'}
              </Button>
              <Form.Control.Feedback type="invalid">
                {confirmPasswordError}
              </Form.Control.Feedback>
            </div>
          </Form.Group>
          <div className="mb-3">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <Button type="submit">Sign Up</Button>
            )}
          </div>
          <div className="mb-3">
            Already have an account?{' '}
            <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
          </div>
        </Form>
      </div>
    </Container>
  );
}
