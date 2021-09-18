import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Link,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Radio,
  RadioGroup
} from '@material-ui/core';
import { reqSignIn } from 'src/api';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useDispatch } from 'react-redux'

const Login = () => {
  // const navigate = useNavigate();
  const [loginMessage, setLoginMessage] = useState('');
  const [userType, setUser] = useState('Talent');
  const [showMessage, setShowMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const onUserChange = (event) => {
    setUser(event.target.value);
  };

  return (
    <>
      <Helmet>
        <title>Login | HyreYou</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              password: ''
              // email: 'pxviet1997@gmail.com',
              // password: 'padpxv9697'
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={async (values) => {
              setShowMessage(true);
              try {
                // console.log(userType);
                const response = await reqSignIn({ ...values, userType });
                console.log(response);
                setLoginMessage('');
                localStorage.setItem('user', JSON.stringify(response));
              } catch (error) {
                // console.log(error);
                setLoginMessage(error.message);
              }

              // navigate('/app/dashboard', { replace: true });
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 1 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Sign In
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Sign in on the internal platform
                  </Typography>
                </Box>

                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={(event) => {
                    handleChange(event);
                    setShowMessage(false);
                  }}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={(event) => {
                    handleChange(event);
                    setShowMessage(false);
                  }}
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          onMouseDown={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <Box sx={{ mt: 2, mb: 2 }}>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                  >
                    Sign In As
                  </Typography>
                  <RadioGroup row aria-label="gender" name="gender1" value={userType} onChange={onUserChange}>
                    <FormControlLabel value="Talent" control={<Radio />} label="Talent" />
                    <FormControlLabel value="Business" control={<Radio />} label="Business" />
                  </RadioGroup>
                </Box>
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
                <div width="1400">
                  {showMessage
                    ? (
                      <Typography
                        color="red"
                        variant="body1"
                        style={{ marginTop: '2px', marginBottom: '10px' }}
                      >
                        {loginMessage}
                      </Typography>
                    )
                    : (<Box style={{ height: '36px' }} />)}
                  {/* <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    {`Not a ${userType}?`}
                    {' '}
                    <Link
                      component={RouterLink}
                      to={userType === 'Talent' ? '/business-login' : '/talent-login'}
                    // variant="h6"
                    >
                      {`${userType === 'Talent' ? 'Business' : 'Talent'} Sign In`}
                    </Link>
                  </Typography> */}
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    Forgotton password?
                    {' '}
                    <Link
                      component={RouterLink}
                      to={`/reset/${userType}`}
                    // variant="h6"
                    >
                      Reset password
                    </Link>
                  </Typography>

                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    Don&apos;t have an account?
                    {' '}
                    <Link
                      component={RouterLink}
                      to="/register"
                    // variant="h6"
                    >
                      Sign up
                    </Link>
                  </Typography>

                </div>

              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Login;
