import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../images/Twitter-Logo.png";
import { useDispatch, useSelector } from "react-redux";
import Alerts from "../components/Alerts";
import { userRegisterAction } from "../Actions/userActions";
import Spinner from "../components/Spinner";
import { USER_RESET } from "../constants/userConstants";
const RegisterScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userLoginAndRegister = useSelector(
    (state) => state.userLoginAndRegister
  );
  const { error, loggedIn, loading } = userLoginAndRegister;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPass] = useState("");
  const [passwordConfirm, setPassConf] = useState("");

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn, history]);

  const onRegister = (e) => {
    e.preventDefault();
    dispatch(userRegisterAction(name, email, password, passwordConfirm));
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div style={{ minHeight: "500px" }}>
          <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-2 sm:px-6 lg:px-8'>
            <div className='max-w-md w-full space-y-4'>
              <div>
                <img
                  className='mx-auto h-12 w-auto'
                  src={logo}
                  alt='Workflow'
                ></img>
                <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
                  Register an Account
                </h2>
                {error && <Alerts message={error} />}
              </div>
              <form onSubmit={onRegister} className='mt-8 space-y-6'>
                <input type='hidden' name='remember' value='true' />
                <div className='rounded-md shadow-sm -space-y-px'>
                  <div className='mb-4'>
                    <label htmlFor='email-address' className='sr-only'>
                      Email address
                    </label>
                    <input
                      id='email-address'
                      name='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type='email'
                      autocomplete='email'
                      required=''
                      className='appearance-none rounded-none relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-400 focus:border-blue-400 focus:z-10 sm:text-sm'
                      placeholder='Email address'
                    />
                  </div>
                  <div className='mb-4'>
                    <label htmlFor='email-address' className='sr-only'>
                      Email address
                    </label>
                    <input
                      id='name'
                      name='name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type='name'
                      autocomplete='name'
                      required=''
                      className='appearance-none mb-4 rounded-none relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-400 focus:border-blue-400 focus:z-10 sm:text-sm'
                      placeholder='Full Name'
                    />
                  </div>
                  <div>
                    <label htmlFor='password' className='sr-only'>
                      Password
                    </label>
                    <input
                      id='password'
                      name='password'
                      type='password'
                      value={password}
                      onChange={(e) => setPass(e.target.value)}
                      autocomplete='current-password'
                      required=''
                      className='appearance-none rounded-none relative block mb-4 w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-400 focus:border-blue-400 focus:z-10 sm:text-sm'
                      placeholder='Password'
                    />
                  </div>
                  <div>
                    <label htmlFor='password' className='sr-only'>
                      Confirm your Password
                    </label>
                    <input
                      id='password'
                      name='password'
                      type='password'
                      value={passwordConfirm}
                      onChange={(e) => setPassConf(e.target.value)}
                      autocomplete='current-password'
                      required=''
                      className='appearance-none rounded-none relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-400 focus:border-blue-400 focus:z-10 sm:text-sm'
                      placeholder='Password Confirm'
                    />
                  </div>
                </div>

                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <input
                      id='remember_me'
                      name='remember_me'
                      type='checkbox'
                      className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
                    />
                    <label
                      htmlFor='remember_me'
                      className='ml-2 block text-sm text-gray-900'
                    >
                      Remember me
                    </label>
                  </div>

                  <div className='text-sm'>
                    Already have an account? {""}
                    <Link
                      to='/login'
                      style={{ color: "rgb(29, 161, 242)" }}
                      className='font-medium'
                    >
                      Sign In
                    </Link>
                  </div>
                </div>

                <div>
                  <button
                    type='submit'
                    style={{ backgroundColor: "rgb(29, 161, 242)" }}
                    className='group relative w-full flex justify-center py-3 px-6 border border-transparent text-sm font-medium rounded-xl text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterScreen;
