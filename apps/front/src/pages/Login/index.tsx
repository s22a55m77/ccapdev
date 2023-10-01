import './index.css';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react';
import { login, me } from '../../services/api.ts';
import { useUser } from './user.store.ts';

export default function LoginPage() {
  
  const [ name, setName ] = useState('');
  const [ pwd, setPwd] = useState('');
  const [ btnStatus, setBtnStatus ] = useState(false);
  const [ errMsg, setErrMsg ] = useState('');


  const { setUser } = useUser();
  const { register, handleSubmit } = useForm<API.LoginParams>();
  const navigate = useNavigate();

  // TODO 通过调用me接口判断是不是已登录状态，是则跳转到 /
  useEffect(() => {
    me()
      .then((userData) => {
        if (userData) {
          navigate("/");
        }
      })
      .catch((error) => {
        if(error.response.status === 401) {
          // user not logged in
        } else {
          setErrMsg("Other Errors")
        }
      });
  }, []);

  
  /* TODO 通过react-hook-form拿到用户输入的账号密码，调用登录接口
  成功: 调用me接口拿到详细的用户资讯，调用user.store.ts里的setUser把接口返回的数据存起来，跳转到 /
  失败: 给出相应的错误讯息 可能的错误: 账号不存在，密码错误，Internal Server Error
  */

  const onSubmit = async (data: API.LoginParams) => {
    try {
      await login(data);
      const userData = await me();
      setUser(userData);
      navigate("/");
    } catch(error) {
      // TODO: set error message based on the errors ex. Wrong Credentials
      
      setErrMsg('Err Msg');
    }
   }

  /* TODO Form Validation
  username is not empty
  password is not empty

   在没有通过的情况下 Button是disable状态
  * */
   
   useEffect(() => {
    if(name != '' && pwd != '') {
      setBtnStatus(true);
    } else {
      setBtnStatus(false);
    }
  }, [name, pwd])

  useEffect(() => {
    setErrMsg('');
  }, [name, pwd])
   

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
              <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="login-h2">Login</h2>
                <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                  <ion-icon name="close-circle-outline" aria-hidden="true"></ion-icon>
                  {errMsg}
                </p>
                <div className="inputbox">
                  <ion-icon name="mail-outline" aria-hidden="true"></ion-icon>
                  <input
                    {...register("username", { required: true })} 
                    type="email"
                    id="email"
                    placeholder=" "
                    required
                    aria-label="Email"
                    onChange={(e) => setName(e.target.value)}
                  />
                  
                  <label htmlFor="email">Email</label>
                </div>
                <div className="inputbox">
                  <ion-icon name="lock-closed-outline"></ion-icon>
                  <input
                    {...register("password", { required: true })} 
                    type="password"
                    id="password"
                    placeholder=" "
                    required
                    onChange={(e) => setPwd(e.target.value)}
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
                <button className="login-button" disabled={!btnStatus} >Log in</button>
                <div className="register">
                  <p>
                    Don't have an account?{' '}
                    <Link to="/register">Register Now!</Link>
                  </p>
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
