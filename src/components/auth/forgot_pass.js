import React, { useState } from "react";
import styles from "./forgot_pass.module.css";
import logo from "../../assets/images/app-logo.png";
import loginImage from "../../assets/images/login-app-icon.png";
import icon from "../../assets/images/Featured icon.png";

const Forgot_Pass = () => {
  const [password, setPassword] = useState("");
  const [confimrPassword, setConfimPassword] = useState("");

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfimPassword(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here (e.g., API call)
    console.log("Password:", password);
    console.log("Confirm Password:", confimrPassword);
  };

  return (
    <div className="app-main">
      <div className={styles.login_wrapper}>
        <div className={styles.form_row}>
          <div className={styles.form_col}>
            <div className={styles.col_inner}>
              <div className={styles.logo_wrap}>
                <img src={logo} alt="logo" />
              </div>
              <div className={styles.form_wrapper}>
                <div className={styles.title_wrap}>
                  <img src={icon} alt="icon" />
                  <h1 className={styles.section_title}>Reset your Password</h1>
                  <span className={styles.sub_title}>
                    Must be at least 8 characters.
                  </span>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className={styles.form_inner}>
                    <div className={styles.form_group}>
                      <input
                        type="text"
                        id="password"
                        placeholder="Choose a password"
                        value={password}
                        onChange={handlePasswordChange}
                      />
                    </div>
                    <div className={styles.form_group}>
                      <input
                        type="text"
                        id="confirmPassword"
                        placeholder="Confirm password"
                        value={confimrPassword}
                        onChange={handleConfirmPasswordChange}
                      />
                    </div>

                    <div className={styles.form_group}>
                      <button type="submit">Continue</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className={styles.image_col}>
            <div className={styles.col_inner}>
              <div className={styles.image_wrap}>
                <img src={loginImage} alt="image" />
              </div>
              <div className={styles.content_wrap}>
                <h3 className={styles.content_title}>
                  Xenflexer IT Consultants
                </h3>
                <div className={styles.content_text}>
                  <p>
                    Originating from our CEO’s personal struggles in the
                    industry, Xenspire Group, with over 25 years in staffing
                    across Healthcare, Biotech, and IT, is dedicated to
                    positively transforming talent acquisition by removing
                    opaque practices and excessive middleman fees, ensuring
                    transparency and fairness for all.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgot_Pass;
