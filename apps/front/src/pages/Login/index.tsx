import './index.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  // TODO 通过调用me接口判断是不是已登录状态，是则跳转到 /

  /* TODO 通过react-hook-form拿到用户输入的账号密码，调用登录接口
  成功: 调用me接口拿到详细的用户资讯，调用user.store.ts里的setUser把接口返回的数据存起来，跳转到 /
  失败: 给出相应的错误讯息 可能的错误: 账号不存在，密码错误，Internal Server Error
  */

  /* TODO Form Validation
  username is not empty
  password is not empty

   在没有通过的情况下 Button是disable状态
  * */

  return (
    <section className="login-section">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 50, backdropFilter: 'blur(20px)' }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
      >
        <div className="login-form-box">
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
