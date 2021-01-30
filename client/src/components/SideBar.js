import React from "react";
import Logo from "../images/Twitter-Logo.png";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logOutAction } from "../Actions/userActions";

const SideBar = () => {
  const dispatch = useDispatch();
  const userLoginAndRegister = useSelector(
    (state) => state.userLoginAndRegister
  );
  const { user, loggedIn } = userLoginAndRegister;
  const onLogOut = (e) => {
    e.preventDefault();
    dispatch(logOutAction());
  };
  return (
    <>
      <div className='hidden lg:flex lg:flex-shrink-0'>
        <div className='flex flex-col w-64'>
          <div className='flex flex-col h-0 flex-1 border-r border-gray-200 bg-white-100'>
            <div className='flex-1 flex flex-col pt-5 pb-4 overflow-y-auto'>
              <div className='flex items-center flex-shrink-0 px-4'>
                <img className='h-8 w-auto' src={Logo} alt='Workflow' />
              </div>
              <nav className='mt-5 flex-1' aria-label='Sidebar'>
                <div className='px-2 space-y-1'>
                  {/* Current: "bg-gray-200 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" */}
                  <Link
                    to='/'
                    className='bg-gray-200 text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                  >
                    {/* Current: "text-gray-500", Default: "text-gray-400 group-hover:text-gray-500" */}
                    <i
                      className='fas fa-house-user mr-3'
                      style={{ fontSize: "1.3rem" }}
                    ></i>
                    Home
                  </Link>

                  <Link
                    to='/'
                    className='text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                  >
                    <i
                      className='far fa-bell mr-4'
                      style={{ fontSize: "1.3rem" }}
                    ></i>
                    Notifications
                  </Link>

                  <Link
                    to='/'
                    className='text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                  >
                    <i
                      className='far fa-envelope mr-3'
                      style={{ fontSize: "1.3rem" }}
                    ></i>
                    Messenger
                  </Link>

                  <Link
                    to={`/profile/${user.id}`}
                    className='text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                  >
                    <i
                      className='far fa-user mr-4'
                      style={{ fontSize: "1.3rem" }}
                    ></i>
                    Profile
                  </Link>

                  {loggedIn ? (
                    <Link
                      onClick={onLogOut}
                      className='text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    >
                      <i
                        className='fas fa-door-open mr-2'
                        style={{ fontSize: "1.3rem" }}
                      ></i>
                      Log Out
                    </Link>
                  ) : (
                    <Link
                      to='/login'
                      className='text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    >
                      <i
                        className='fas fa-door-open mr-2'
                        style={{ fontSize: "1.3rem" }}
                      ></i>
                      Sign In
                    </Link>
                  )}
                </div>
              </nav>
            </div>
            {loggedIn && (
              <div className='flex-shrink-0 flex border-t border-gray-200 p-4'>
                <Link
                  to={`/profile/${user.id}`}
                  className='flex-shrink-0 w-full group block'
                >
                  <div className='flex items-center'>
                    <div>
                      <img
                        className='inline-block h-9 w-9 rounded-full'
                        src={user.profileImage}
                        alt=''
                      />
                    </div>
                    <div className='ml-3'>
                      <p className='text-sm font-medium text-gray-700 group-hover:text-gray-900'>
                        {user.name}
                      </p>
                      <p className='text-xs font-medium text-gray-500 group-hover:text-gray-700'>
                        View profile
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
