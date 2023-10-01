import './index.css';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { me, register as registerUser } from '../../services/api.ts';  
import { useUser } from '../../pages/Login/user.store.ts';

export default function RegisterPage() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [errMsg, setErrMsg] = useState('');
  const { setUser } = useUser();
  const navigate = useNavigate();
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
  const onSubmit = async (data: API.RegisterParams) => {
    if (data.password1 !== data.password2) {
      setErrMsg("Passwords do not match");
      return;
    }

    try {
      await registerUser(data);
      const userData = await me();
      setUser(userData);
      navigate("/");
    } catch (error) {
      setErrMsg('Error registering, please try again.'); 
    }
  };

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
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2 className="register-h2">Register</h2>
              <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                {errMsg}
              </p>
              <div className="inputbox">
                <ion-icon name="person-outline" aria-hidden="true"></ion-icon>
                <input
                  {...register('username', { required: true })}
                  type="text"
                  id="username"
                  placeholder=" "
                  aria-label="Username"
                />
                <label htmlFor="username">Username</label>
              </div>
              <div className="inputbox">
                <ion-icon name="mail-outline" aria-hidden="true"></ion-icon>
                <input
                  {...register('email', { required: true, pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ })}
                  type="email"
                  id="email"
                  placeholder=" "
                  aria-label="Email"
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="inputbox">
                <ion-icon name="lock-closed-outline"></ion-icon>
                <input
                  {...register('password1', { required: true, minLength: 6 })}
                  type="password"
                  id="password1"
                  placeholder=" "
                />
                <label htmlFor="password1">Password</label>
              </div>
              <div className="inputbox">
                <ion-icon name="lock-closed-outline"></ion-icon>
                <input
                  {...register('password2', { required: true, minLength: 6 })}
                  type="password"
                  id="password2"
                  placeholder=" "
                />
                <label htmlFor="password2">Repeat Password</label>
              </div>
              <button className="register-button" disabled={Object.keys(errors).length > 0}>
                Register
              </button>
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
