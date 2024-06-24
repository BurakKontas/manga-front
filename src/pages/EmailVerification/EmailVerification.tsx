import React, { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import styles from './EmailVerification.module.scss';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@Hooks/useToast';
import { useAuth } from '@Hooks/useAuth';

const EmailVerification: React.FC = () => {
  const navigate = useNavigate();
  const { error, success } = useToast();
  const codeLength = 6;
  const verificationId = new URLSearchParams(window.location.search).get('verificationId');

  React.useEffect(() => {
    if (verificationId == null) {
      error('Email Verification', 'Invalid verificationId');
      navigate('/signup');
    }
  }, []);

  const [codes, setCodes] = useState<string[]>(Array(codeLength).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { emailVerification } = useAuth();

  const verifyEmail = async () => {
    const code = codes.join('');
    if (code.length !== codeLength) {
      error('Email Verification', 'Please enter a valid verification code');
      return;
    }

    const response = await emailVerification(code, verificationId!);

    if (!response.success) {
      error('Email Verification', response.errorMessage);
      return;
    }

    navigate('/signin');
    success('Email Verification', 'Email verified successfully');
  };

  const handleChange = (index: number, value: string) => {
    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);

    if (value !== '' && index < codes.length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === 'Backspace' && index > 0 && codes[index] === '') {
      const newCodes = [...codes];
      newCodes[index - 1] = '';
      setCodes(newCodes);

      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleFocus = (index: number) => {
    inputRefs.current[index]?.select();
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = event.clipboardData.getData('Text');
    const newCodes = [...codes];
    for (let i = 0; i < codeLength; i++) {
      newCodes[i] = pasteData[i] || '';
    }
    setCodes(newCodes);

    // Focus the next empty input if available
    const nextIndex = newCodes.findIndex(c => c === '');
    if (nextIndex !== -1) {
      inputRefs.current[nextIndex]?.focus();
    } else {
      inputRefs.current[codeLength - 1]?.focus();
    }
  };

  const inputs = codes.map((code, index) => (
    <input
      key={index}
      type="text"
      maxLength={1}
      value={code}
      onChange={(e) => handleChange(index, e.target.value)}
      onKeyDown={(e) => handleKeyDown(e, index)}
      onFocus={() => handleFocus(index)}
      onPaste={(e) => handlePaste(e)}
      ref={(el) => inputRefs.current[index] = el}
      className={`${styles.input} ${code && styles.hasValue}`}
    />
  ));

  return (
    <div className={styles.container}>
      <h2>Email Verification</h2>
      <p>Please enter the {codeLength}-digit verification code sent to your email:</p>
      <div className={styles.codeContainer}>
        {inputs}
      </div>
      <button className={styles.button} onClick={verifyEmail}>Verify</button>
    </div>
  );
};

export default EmailVerification;
