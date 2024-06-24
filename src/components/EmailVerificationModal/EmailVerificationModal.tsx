import React from 'react';
import { EmailVerificationModalProps } from './EmailVerificationModal.types';
import styles from './EmailVerificationModal.module.scss';

const EmailVerificationModal: React.FC<EmailVerificationModalProps> = ({ onClick, disabled = false, className = '', style = {}, children }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={`${className} ${styles.container}`}
      style={style}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default EmailVerificationModal;
