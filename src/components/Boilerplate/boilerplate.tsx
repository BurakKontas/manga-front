import React, { useState, useEffect } from 'react';
import { BoilerplateProps } from './boilerplate.types';
import { Navbar } from '@Components/Navbar';

import styles from './boilerplate.module.scss';
import { Footer } from '@Components/Footer';

const Boilerplate: React.FC<BoilerplateProps> = ({ className = '', style = {}, children }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div className={`${styles.container} ${className}`} style={style}>
      <Navbar className={`${styles.navbar} ${isScrolled ? styles.blur : ""}`} />
      <main className={styles.content}>
        {children}
      </main>
      <Footer className={styles.footer} />
    </div>
  );
}

export default Boilerplate;
