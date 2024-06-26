import React, { useEffect, useState } from "react";
import styles from "./login.module.css";
import logo from "../../assets/images/app-logo.png";
import loginImage from "../../assets/images/login-app-icon.png";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = JSON.parse(localStorage.getItem("token"));
    console.log(isAuthenticated);
    if (isAuthenticated) {
      if (isAuthenticated.role === "ROLE_ADMIN") {
        navigate("/admin");
      }
      if (isAuthenticated.role === "ROLE_USER") {
        navigate("/user/myprofile");
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    const username = email;
    e.preventDefault();
    const role = "";
    try {
      const response = await axios.post(
        "https://xenflexer.northcentralus.cloudapp.azure.com/xen/login",
        {
          username,
          password,
        }
      );
      console.log(response);
      if (response.status === 200) {
        console.log(response.data);
        localStorage.setItem("token", JSON.stringify(response.data));
        message.success("LogedIn successfully");
        // role = response.data.role;
      } else {
        message.error("Login failed");
      }
      const role = JSON.parse(localStorage.getItem("token")).role;
      console.log("role = ", role);
      if (role === "ROLE_ADMIN") {
        navigate("/admin");
      }
      if (role === "ROLE_USER") {
        navigate("/user/myprofile");
      }
    } catch (error) {
      console.error(error.message);
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
                  <h1 className={styles.section_title}>
                    Welcome to Xenflexer Program for IT Consultants
                  </h1>
                  <span className={styles.sub_title}>
                    Welcome back! Please enter your details.
                  </span>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className={styles.form_inner}>
                    <div className={styles.form_group}>
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleEmailChange}
                      />
                    </div>
                    <div className={styles.form_group}>
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        id="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={handlePasswordChange}
                      />
                    </div>
                    <div
                      className={`${styles.form_group} ${styles.form_group_row}`}>
                      <div className={styles.remember_wrap}>
                        <input type="checkbox" id="remember" />
                        <label htmlFor="remember">Remember for 30 days</label>
                      </div>
                      <div className={styles.forgot_wrap}>
                        <a href="/forgotPass">Forgot password?</a>
                      </div>
                    </div>
                    <div className={styles.form_group}>
                      <button type="submit">Sign in</button>
                    </div>
                    <div className={`${styles.form_group}`}>
                      <p className={styles.form_text}>
                        Don’t have an account? <a href="/signup">Sign up</a>
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

export default Login;
