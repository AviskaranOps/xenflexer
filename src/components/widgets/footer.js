import React from "react";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.app_footer}>
      <div className={styles.footer_inner}>
        <ul className={styles.footer_link}>
          <li>
            <a href="/">Xenspire</a>
          </li>
          <li>
            <a href="/">About Us</a>
          </li>
          <li>
            <a href="/">Company</a>
          </li>
          <li>
            <a href="/">Blog</a>
          </li>
          <li>
            <a href="/">Careers</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
