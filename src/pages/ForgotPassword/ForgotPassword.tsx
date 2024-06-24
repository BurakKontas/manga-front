import React from 'react';

import styles from './ForgotPassword.module.scss'
import { useNavigate, useParams } from 'react-router-dom';
import { FormInput } from '@Components/FormInput';
import { useAuth } from '@Hooks/useAuth';
import { useToast } from '@Hooks/useToast';

function ForgotPassword() {
  const { forgotPassword } = useAuth();
  const { error, success } = useToast();
  const navigate = useNavigate();
  let { changePasswordId } = useParams();

  const [password, setPassword] = React.useState('');
  const [repeatPassword, setRepeatPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  async function changePassword() {
    if (!password || !repeatPassword) {
      error("Change Password", "Please fill in all the fields");
      return;
    }
    console.log(changePasswordId)
    forgotPassword(changePasswordId!, password);
    success("Change Password", "Password changed successfully");
    navigate('/');
  }

  return (
    <div className={styles.container}>
      <div className={styles.passwordContainer}>
        <FormInput type={(showPassword) ? "text" : "password"} inputStyle={{ width: 620 }} title="New Password" onChange={(e: HTMLInputElement) => setPassword(e.value)} value={password} />
        <button onClick={() => setShowPassword(!showPassword)}>{(showPassword) ? "Hide" : "Show"}</button>
      </div>
      <div className={styles.passwordContainer}>
        <FormInput type={(showPassword) ? "text" : "password"} inputStyle={{ width: 620 }} title="Repeat Password" onChange={(e: HTMLInputElement) => setRepeatPassword(e.value)} value={repeatPassword} />
        <button onClick={() => setShowPassword(!showPassword)}>{(showPassword) ? "Hide" : "Show"}</button>
      </div>
      <button className={styles.button} onClick={changePassword}>Change Password</button>
    </div>
  )
}

export default ForgotPassword;