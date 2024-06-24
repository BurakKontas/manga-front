import React from 'react';
import { NavbarProps } from './navbar.types';
import { Link } from 'react-router-dom';

import styles from './navbar.module.scss';

const Navbar: React.FC<NavbarProps> = ({ className = '', style = {}}) => {
  //TODO: change this with redux
  var token = localStorage.getItem('token');

  return (
    <nav className={`${styles.container} ${className}`} style={style}>
      <div className={styles.left}>
        <Link to="/" className={styles.title}>MANGA TRANSLATOR</Link>
        <Link to="/">Home</Link>
        <Link to="/translate">Translate</Link>
      </div>
      <div className={styles.right}>
        <Link to="/help">Help</Link>
        {(token === null) ?
        <>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup" className={styles.signup}>Sign Up</Link>
        </>
          :
        <>
            <Link to="/logout">Logout</Link>
            <Link to="/profile">Profile</Link>
        </>
        }
        
      </div>
    </nav>
  );
}

export default Navbar;
