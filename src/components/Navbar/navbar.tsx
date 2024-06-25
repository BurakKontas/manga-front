import React from 'react';
import { NavbarProps } from './navbar.types';
import { Link } from 'react-router-dom';
import auth from '@Redux/Auth';

import styles from './navbar.module.scss';
import { useAppSelector } from '@Redux/hooks';
import { usePayment } from '@Hooks/usePayment';

import credit from '@Redux/Credit';

const Navbar: React.FC<NavbarProps> = ({ className = '', style = {}}) => {
  const userCredit = useAppSelector(credit.selectors.getCredit);
  var isLoggedIn = useAppSelector(auth.selectors.isLoggedIn);

  return (
    <nav className={`${styles.container} ${className}`} style={style}>
      <div className={styles.left}>
        <Link to="/" className={styles.title}>MANGA TRANSLATOR</Link>
        <Link to="/">Home</Link>
        <Link to="/translate">Translate</Link>
        <Link to="/prices">Prices</Link>
      </div>
      <div className={styles.right}>
        {(isLoggedIn) ?
          <>
            <p className={styles.credit}>Credit: {userCredit}</p>
            <Link to="/logout">Logout</Link>
          </>
          :
          <>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup" className={styles.signup}>Sign Up</Link>
          </>
        }
        
      </div>
    </nav>
  );
}

export default Navbar;
