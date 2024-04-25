import React, { useState } from "react";
import styles from "./signup.module.css";
import logo from "../../assets/images/app-logo.png";
import loginImage from "../../assets/images/login-app-icon.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const username = name;
      const response = await axios.post("http://localhost:3000/api/register/", {
        username,
        email,
        password,
      });

      if (response.status === 200) {
        console.log("user register successfully");
        navigate("/login");
      } else {
        console.log("registration failed");
      }
    } catch (error) {
      console.error("Signup error:", error.message);
    }
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
                  <h1 className={styles.section_title}>Sign up</h1>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className={styles.form_inner}>
                    <div className={styles.form_group}>
                      <label htmlFor="name">Name*</label>
                      <input
                        type="text"
                        id="name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={handleNameChange}
                      />
                    </div>
                    <div className={styles.form_group}>
                      <label htmlFor="email">Email*</label>
                      <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleEmailChange}
                      />
                    </div>
                    <div className={styles.form_group}>
                      <label htmlFor="password">Password*</label>
                      <input
                        type="password"
                        id="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={handlePasswordChange}
                      />
                      <label htmlFor="suggesion" className={styles.suggesion}>
                        Must be at least 8 characters.
                      </label>
                    </div>

                    <div className={styles.form_group}>
                      <button type="submit">Get started</button>
                    </div>
                    <div className={`${styles.form_group}`}>
                      <p className={styles.form_text}>
                        Already have an account? <a href="/">Log in</a>
                      </p>
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

export default Signup;
