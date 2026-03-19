import React from 'react';
import styles from '@/styles/shared/Footer.module.css';
function Footer() {
  return (
    <div className={styles.footer__container}>
      <div className={styles.footer__wrapper}>
        <div className={styles.footer_content}>
          <p className={styles.footer_content_title}>
            THIS SITE WAS MADE IN POLAND <br />
            WITH THE HELP OF HOT COCOA
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
