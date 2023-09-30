import './index.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
  /* TODO 通过react-hook-form拿到用户输入的账号密码，调用注册接口
  成功: 调用me接口拿到详细的用户资讯，调用user.store.ts里的setUser把接口返回的数据存起来，跳转到 /
  失败: 给出相应的错误讯息 可能的错误: 账号已经存在，密码不符合格式，Internal Server Error
  */

  /* TODO Form Validation
  username is not empty
  password is not empty
  password should be at least 6 characters

   在没有通过的情况下 Button是disable状态
  * */

  return (
    <section className="register-section">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 50, backdropFilter: 'blur(20px)' }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
      >
        <div className="register-form-box">
          <div className="form-value">
            <form action="">
              <h2 className="register-h2">Register</h2>
              <div className="inputbox">
                <ion-icon
                  name="mail-outline"
                  aria-hidden="true"
                ></ion-icon>
                <input
                  type="text"
                  id="username"
                  placeholder=" "
                  required
                />
                <label htmlFor="username">Username</label>
              </div>
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
                  id="password1"
                  placeholder=" "
                  required
                />
                <label htmlFor="password1">Password</label>
              </div>
              <div className="inputbox">
                <ion-icon name="lock-closed-outline"></ion-icon>
                <input
                  type="password"
                  id="password2"
                  placeholder=" "
                  required
                />
                <label htmlFor="password2">Repeat Password</label>
              </div>
              <button className="register-button">Register</button>
              <div className="login">
                  <p>
                    <Link to="/">Go Back &#8594;</Link>
                  </p>
                </div>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
