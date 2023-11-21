import './index.css';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { login, me } from '../../services/api.ts';
import { useUserStore } from './user.store.ts';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { AxiosError } from 'axios';

type LoginForm = API.LoginParams;

export default function LoginPage() {
  const [name, setName] = useState('');
  const [pwd, setPwd] = useState('');
  const [btnStatus, setBtnStatus] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const { setUser } = useUserStore();
  const { register, handleSubmit } = useForm<LoginForm>();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Login Page';

    me()
      .then((userData) => {
        if (userData) {
          navigate('/');
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          // user not logged in
        } else {
          setErrMsg('Other Errors');
        }
      });
  }, []);

  const onSubmit = async (data: LoginForm) => {
    try {
      await login({
        username: data.username,
        password: data.password,
        rememberMe: data.rememberMe,
      });
      const userData = await me();
      setUser(userData);
      if (data.rememberMe)
        localStorage.setItem('lastLoginTime', new Date().toDateString());
      navigate('/');
    } catch (error) {
      const msg = (
        (error as AxiosError).response!.data as API.BaseResponse<null>
      ).msg;
      setErrMsg(msg || 'Unknown Error');
    }
  };

  useEffect(() => {
    if (name != '' && pwd != '') {
      setBtnStatus(true);
    } else {
      setBtnStatus(false);
    }
  }, [name, pwd]);

  useEffect(() => {
    setErrMsg('');
  }, [name, pwd]);

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
              <p
                className={errMsg ? 'errmsg' : 'offscreen'}
                aria-live="assertive"
              >
                <ErrorOutlineOutlinedIcon style={{ marginRight: 5 }} />
                {errMsg}
              </p>
              <div className="inputbox">
                <Person2OutlinedIcon className={'login-icon'} />
                <input
                  {...register('username', { required: true })}
                  type="text"
                  id="username"
                  placeholder=" "
                  required
                  aria-label="username"
                  onChange={(e) => setName(e.target.value)}
                />

                <label htmlFor="username" style={{ color: 'white' }}>
                  Username
                </label>
              </div>
              <div className="inputbox">
                <LockOutlinedIcon className={'login-icon'} />
                <input
                  {...register('password', { required: true })}
                  type="password"
                  id="password"
                  placeholder=" "
                  required
                  onChange={(e) => setPwd(e.target.value)}
                />
                <label htmlFor="password" style={{ color: 'white' }}>
                  Password
                </label>
              </div>
              <div className="forget">
                <label>
                  <input {...register('rememberMe')} type="checkbox" />
                  Remember Me
                </label>
              </div>
              <button className="login-button" disabled={!btnStatus}>
                Log in
              </button>
              <div className="register">
                <p>
                  Don't have an account?
                  <Link to="/register"> Register Now!</Link>
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
