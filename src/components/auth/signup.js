import React, { useState } from "react";
import styles from "./signup.module.css";
import logo from "../../assets/images/app-logo.png";
import loginImage from "../../assets/images/login-app-icon.png";
import { Link, useNavigate } from "react-router-dom";
import { message } from 'antd';
import axios  from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post(
        "https://xenflexer.northcentralus.cloudapp.azure.com/api/register/",
        {
          username,
          email,
          password
        }
      );
      console.log(response);
      if (response.status === 200) {
        console.log(response.data);
        console.log("user experience save successfully");
        message.success("register successfully");
        navigate('/signin');

      } else {
        message.error("register failed");
        console.log("experience save failed");
      }
    } catch (error) {
      console.log(error.message);
      message.error(error.response.data.username[0]);
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
                        value={username}
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
