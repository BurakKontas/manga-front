import React from 'react';

import styles from './ForgotPasswordEmailSend.module.scss'
import { useToast } from '@Hooks/useToast';
import { useAuth } from '@Hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function ForgotPasswordEmailSend() {
  const [email, setEmail] = React.useState('');
  const navigate = useNavigate();
  const { sendForgotPasswordEmail } = useAuth();
  const { error, success } = useToast();

  async function sendEmail() {
    const response = await sendForgotPasswordEmail(email);
    if(response.success) {
      success('Forgot Password', 'Email sent successfully to reset password check your email for the link');
      navigate('/');
    } else {
      error('Forgot Password', response.errorMessage);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <main className={styles.formContainer}>
          <div className={styles.greeting}>
            <h1>Forgot Password</h1>
            <p>Enter your email to receive a password reset link</p>
          </div>
          <div className={styles.form}>
            <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
            <button onClick={sendEmail}>Send Email</button>
          </div>
        </main>
      </div>
    </div>
  )
}

export default ForgotPasswordEmailSend 