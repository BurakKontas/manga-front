import { Link } from 'react-router-dom'
import StartTranslatingImage from '@Assets/start-translating-image.png'
import GetStartedImage from '@Assets/get-started.png'
import styles from './Homepage.module.scss'
import { useEffect } from 'react';

function Homepage() {
  const handleSaveTokens = () => {
    const urlParams = new URLSearchParams(window.location.hash);
    const token = urlParams.get('#token');
    const refreshToken = urlParams.get('refreshToken');
    const status = urlParams.get('status');

    console.log(token, refreshToken, status)

    if (status === "success" && token !== null && refreshToken !== null) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      window.location.hash = "";
    }
  };

  useEffect(() => {
    handleSaveTokens();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.starttranslating}>
        <main>
          <h1>Translate your favorite manga in seconds</h1>
          <Link to={"/translate"} className={styles.translateButton} >Start Translating</Link>
        </main>
        <div className={styles.starttranslatingimage}>
          <img src={StartTranslatingImage} alt="starttranslatingimage" />
        </div>
      </div>
      <div className={styles.getstarted}>
        <h1>You can edit your translations whenever you want</h1>
        <Link to={"/translate"} className={styles.getstartedButton} >Get Started</Link>
        <div>
          <img src={GetStartedImage} alt="getstartedimage" />
        </div>
      </div>
    </div>
  )
}

export default Homepage
