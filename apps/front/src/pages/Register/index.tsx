import './index.css';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { me, register as registerUser } from '../../services/api.ts';
import { useUserStore } from '../Login/user.store.ts';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { AxiosError } from 'axios';

type RegisterFormValues = {
  username: string;
  email: string;
  password1: string;
  password2: string;
};

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>();
  const [errMsg, setErrMsg] = useState('');
  const { setUser } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Register Page';
  }, []);

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    if (data.password1 !== data.password2) {
      setErrMsg('Passwords do not match');

      setTimeout(() => {
        setErrMsg('');
      }, 2000);

      return;
    }

    try {
      await registerUser({
        email: data.email,
        username: data.username,
        password: data.password1,
      });
      const userData = await me();
      setUser(userData);
      navigate('/');
    } catch (error) {
      const msg = (
        (error as AxiosError).response!.data as API.BaseResponse<null>
      ).msg;
      setErrMsg(msg || 'Unknown Error');
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
              <p
                className={
                  Object.keys(errors).length > 0 || errMsg
                    ? 'errmsg'
                    : 'offscreen'
                }
                aria-live="assertive"
              >
                {errMsg}
                {Object.keys(errors).length > 0 &&
                  errors[
                    Object.keys(errors)[0] as keyof RegisterFormValues
                  ]?.message}
              </p>
              <div className="inputbox">
                <Person2OutlinedIcon className="register-icon" />
                <input
                  {...register('username', {
                    required: {
                      value: true,
                      message: 'Username should not be empty',
                    },
                  })}
                  type="text"
                  id="username"
                  placeholder=""
                  aria-label="Username"
                />
                <label htmlFor="username" style={{ color: 'white' }}>
                  Username
                </label>
              </div>
              <div className="inputbox">
                <EmailOutlinedIcon className="register-icon" />
                <input
                  {...register('email', {
                    required: {
                      value: true,
                      message: 'Email should not be empty',
                    },
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: 'Please input a valid email',
                    },
                  })}
                  type="email"
                  id="email"
                  placeholder=" "
                  aria-label="Email"
                />
                <label htmlFor="email" style={{ color: 'white' }}>
                  Email
                </label>
              </div>
              <div className="inputbox">
                <LockOutlinedIcon className="register-icon" />
                <input
                  {...register('password1', {
                    required: {
                      value: true,
                      message: 'Password should not be empty',
                    },
                    minLength: {
                      value: 6,
                      message: 'The minimum length is 6',
                    },
                  })}
                  type="password"
                  id="password1"
                  placeholder=" "
                />
                <label htmlFor="password1" style={{ color: 'white' }}>
                  Password
                </label>
              </div>
              <div className="inputbox">
                <LockOutlinedIcon className="register-icon" />
                <input
                  {...register('password2', {
                    required: {
                      value: true,
                      message: 'Password should not be empty',
                    },
                    minLength: {
                      value: 6,
                      message: 'The minimum length is 6',
                    },
                  })}
                  type="password"
                  id="password2"
                  placeholder=" "
                />
                <label htmlFor="password2" style={{ color: 'white' }}>
                  Repeat Password
                </label>
              </div>
              <button
                className="register-button"
                disabled={Object.keys(errors).length > 0}
              >
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
