import React from 'react';
import MangaMarkedImage from '@Assets/manga-marked.png'
import GoogleImage from '@Assets/google.png';

import styles from './SignUp.module.scss'
import { FormInput } from '@Components/FormInput';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@Hooks/useAuth';
import { useToast } from '@Hooks/useToast';

function SignUp() {
  const [email, setEmail] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [repeatPassword, setRepeatPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [terms, setTerms] = React.useState(false);
  const [googleLoginUri, setGoogleLoginUri] = React.useState('');
  const { register, generateGoogleLoginUri } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function getGoogleLoginUri() {
      var response = await generateGoogleLoginUri();
      if (response.success) {
        setGoogleLoginUri(response.value.uri);
      } else {
        error('Google Login URI Generation', response.errorMessage);
      }
    }
    getGoogleLoginUri();
  }, []);

  async function registerHandler() {
    if (!email || !firstName || !lastName || !password || !repeatPassword) {
      error('Registration', 'Please fill in all the fields');
      return;
    }
    if (password !== repeatPassword) {
      error('Registration', 'Passwords do not match');
      return;
    }
    if (!terms) {
      error('Registration', 'Please accept the terms & conditions');
      return;
    }

    var response = await register(email, firstName, lastName, password);
    if (response.success) {
      success('Registration', 'Successfully registered please check your email for verification code.');
      navigate('/email-verification?verificationId=' + response.value.registrationId);
    } else {
      error('Registration', response.errorMessage);
    }
  }

  return (
      <div className={styles.container}>
      <div className={styles.content}>
        <main className={styles.formContainer}>
          <div className={styles.greeting}>
            <span className={styles.welcome}>Register Yourself!</span>
            <span>Begin your journey with us today</span>
          </div>
          <div className={styles.form}>
            <div className={styles.formNames}>
              <FormInput title="First Name" inputStyle={{ width: 300 }} onChange={(e: HTMLInputElement) => setFirstName(e.value)} value={firstName} />
              <FormInput title="Last Name" inputStyle={{ width: 300 }} onChange={(e: HTMLInputElement) => setLastName(e.value)} value={lastName} />
            </div>
            <FormInput title="Email" inputStyle={{ width: 620}} onChange={(e: HTMLInputElement) => setEmail(e.value)} value={email} />
            <div className={styles.passwordContainer}>
              <FormInput type={(showPassword) ? "text" : "password"} inputStyle={{ width: 620 }} title="Password" onChange={(e: HTMLInputElement) => setPassword(e.value)} value={password} />
              <button onClick={() => setShowPassword(!showPassword)}>{(showPassword) ? "Hide" : "Show"}</button>
            </div>
            <div className={styles.passwordContainer}>
              <FormInput type={(showPassword) ? "text" : "password"} inputStyle={{ width: 620 }} title="Repeat Password" onChange={(e: HTMLInputElement) => setRepeatPassword(e.value)} value={repeatPassword} />
              <button onClick={() => setShowPassword(!showPassword)}>{(showPassword) ? "Hide" : "Show"}</button>
            </div>
            <div className={styles.formBottom}>
              <div className={styles.rememberMe}>
                <input className={styles.rememberMeCheck} type="checkbox" id="remember" name="remember" onChange={(e) => setTerms(e.target.checked)} checked={terms} />
                <label htmlFor="remember">I accept the Terms & Conditions</label>
              </div>
            </div> 
            <button className={styles.signin} onClick={registerHandler}>Sign Up</button>
          </div>
          <div className={styles.oauth2}>
            <span>OR SIGN UP WITH</span>
            <div className={styles.oauth2Buttons}>
              <Link to={googleLoginUri} className={styles.google}>
                <img src={GoogleImage} alt="googleimage" />
              </Link>
            </div>
          </div>
          <div className={styles.registerhere}>
            <span>Already signed up ?</span>
            <Link to="/signin">Click here</Link>
          </div>
        </main>
      </div>
      <div className={styles.rightImage} style={{
        backgroundImage: `url(${MangaMarkedImage})`
      }} />    
      </div>
  )
}

export default SignUp