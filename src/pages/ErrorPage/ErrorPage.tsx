import React from 'react';
import { Link } from 'react-router-dom';

import styles from './ErrorPage.module.scss';

function ErrorPage() {
  // take history and go back to the previous page
  var goBack = () => {
    window.history.back();
  }

  return (
    <section className={styles.page_404}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles['col-sm-12']}>
            <div className={`${styles['col-sm-10']} ${styles['col-sm-offset-1']} ${styles['text-center']}`}>
              <div className={styles.four_zero_four_bg}>
                <h1 className={styles['text-center']}>404</h1>
              </div>
              <div className={styles.contant_box_404}>
                <h3 className={styles.h2}>
                  Look like you're lost
                </h3>
                <p>The page you are looking for not available!</p>
                <button onClick={goBack} className={styles.link_404}>Go Back</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ErrorPage;
