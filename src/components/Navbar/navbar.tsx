import React from 'react';
import { NavbarProps } from './navbar.types';
import { Link } from 'react-router-dom';
import auth from '@Redux/Auth';

import styles from './navbar.module.scss';
import { useAppSelector } from '@Redux/hooks';
import { usePayment } from '@Hooks/usePayment';

const Navbar: React.FC<NavbarProps> = ({ className = '', style = {}}) => {
  const [credit, setCredit] = React.useState<number>(0);
  
  const { getUserCredit } = usePayment();
  var isLoggedIn = useAppSelector(auth.selectors.isLoggedIn);

  React.useEffect(() => {
    getUserCredit().then((res) => {
      if (res.success) {
        setCredit(res.value.credit);
      }
    })
  }, [])

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
            <p className={styles.credit}>Credit: {credit}</p>
            <Link to="/logout">Logout</Link>
            <Link to="/profile">Profile</Link>
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
