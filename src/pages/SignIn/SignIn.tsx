import React from 'react';

import { FormInput } from '@Components/FormInput';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '@Hooks/useAuth';
import { useToast } from '@Hooks/useToast';

import styles from './SignIn.module.scss';
import GoogleImage from '@Assets/google.png';
import MangaBaseImage from '@Assets/manga-base.png';
import { useAppDispatch } from '@Redux/hooks';
import auth from '@Redux/Auth';

function SignIn() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rememberMe, setRememberMe] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [googleLoginUri ,setGoogleLoginUri] = React.useState('');
  const { login, generateGoogleLoginUri } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    async function getGoogleLoginUri() {
      var response = await generateGoogleLoginUri();
      if(response.success) {
        setGoogleLoginUri(response.value.uri);
      } else {
        error('Google Login URI Generation', response.errorMessage);
      }
    }
    getGoogleLoginUri();
  }, []);

  async function loginHandler() {
    var response = await login(email, password, rememberMe);
    if(response.success) {
      dispatch(auth.actions.saveToken({
        token: response.value.token,
        refreshToken: response.value.refreshToken
      }));
      success('Login', 'Login successful');
      navigate('/');
      window.location.reload();
    } else {
      error('Login', response.errorMessage);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.leftImage} style={{
        backgroundImage: `url(${MangaBaseImage})`
      }} />
      <div className={styles.content}>
        <main className={styles.formContainer}>
          <div className={styles.greeting}>
            <span className={styles.welcome}>Welcome Back!</span>
            <span>Sign in to your account to continue</span>
          </div>
          <div className={styles.form}>
            <FormInput title="Email" onChange={(e: HTMLInputElement) => setEmail(e.value)} value={email} />
            <div className={styles.passwordContainer}>
              <FormInput type={(showPassword) ? "text" : "password"} title="Password" onChange={(e: HTMLInputElement) => setPassword(e.value)} value={password} />
              <button onClick={() => setShowPassword(!showPassword)}>{(showPassword) ? "Hide" : "Show"}</button>
            </div>
            <div className={styles.formBottom}>
              <div className={styles.rememberMe}>
                <input className={styles.rememberMeCheck} type="checkbox" id="remember" name="remember" onChange={(e) => setRememberMe(e.target.checked)} checked={rememberMe} />
                <label htmlFor="remember">Remember me</label>
              </div>
              <Link className={styles.forgotpassword} to="/forgotpassword">Forgot password?</Link>
            </div>
            <button className={styles.signin} onClick={loginHandler}>Sign In</button>
          </div>
          <div className={styles.oauth2}>
            <span>OR LOGIN WITH</span>
            <div className={styles.oauth2Buttons}>
              <Link to={googleLoginUri} className={styles.google}>
                <img src={GoogleImage} alt="googleimage" />
              </Link>
            </div>
          </div>
          <div className={styles.registerhere}>
            <span>Don't have an account?</span>
            <Link to="/signup">Register here</Link>
          </div>
        </main>
      </div>
    </div>
  )
}

export default SignIn