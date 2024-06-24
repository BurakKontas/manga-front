import React from 'react';
import { FooterProps } from './Footer.types';

import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';

const Footer: React.FC<FooterProps> = ({ className = '', style = {} }) => {
  return (
    <footer className={`${styles.container} ${className}`} style={style}>
      <div className={styles.title}>
        <p>MANGA TRANSLATOR</p>
        <p>© 2023 - 2024</p>
      </div>
      <div className={styles.buttonContainer}>
        <div className={styles.buttons}>
          <h3>Product</h3>
          <Link to="/">Product</Link>
          <Link to="/">Product</Link>
          <Link to="/">Product</Link>
        </div>
        <div className={styles.buttons}>
          <h3>Features</h3>
          <Link to="/">Features</Link>
          <Link to="/">Features</Link>
          <Link to="/">Features</Link>
        </div>
        <div className={styles.buttons}>
          <h3>Resources</h3>
          <Link to="/">Resources</Link>
          <Link to="/">Resources</Link>
          <Link to="/">Resources</Link>
        </div>
        <div className={styles.buttons}>
          <h3>Company</h3>
          <Link to="/">Company</Link>
          <Link to="/">Company</Link>
          <Link to="/">Company</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
