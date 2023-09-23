import './index.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <section className="login-section">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 50, backdropFilter: 'blur(20px)' }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
      >
        <div className="form-box">
          <div className="form-value">
            <form action="">
              <h2 className="login-h2">Login</h2>
              <div className="inputbox">
                <ion-icon
                  name="mail-outline"
                  aria-hidden="true"
                ></ion-icon>
                <input
                  type="email"
                  id="email"
                  placeholder=" "
                  required
                  aria-label="Email"
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="inputbox">
                <ion-icon name="lock-closed-outline"></ion-icon>
                <input
                  type="password"
                  id="password"
                  placeholder=" "
                  required
                />
                <label htmlFor="password">Password</label>
              </div>
              <div className="forget">
                <label>
                  <input type="checkbox" />
                  Remember Me
                  <a href="#">Forget Password</a>
                </label>
              </div>
              <button className="login-button">Log in</button>
              <div className="register">
                <p>
                  Don't have an account?{' '}
                  <Link to="/register">Register Now!</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
