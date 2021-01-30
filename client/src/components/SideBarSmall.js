import React, { useState } from "react";
import Logo from "../images/Twitter-Logo.png";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOutAction } from "../Actions/userActions";
const SideBarSmall = () => {
  const dispatch = useDispatch();
  const userLoginAndRegister = useSelector(
    (state) => state.userLoginAndRegister
  );
  const { user, loggedIn } = userLoginAndRegister;
  const onLogOut = (e) => {
    e.preventDefault();
    dispatch(logOutAction());
  };
  const [sideBarOpen, setSideBar] = useState(false);
  const onClose = (e) => {
    setSideBar(!sideBarOpen);
    e.preventDefault();
  };
  return (
    <>
      <div
        data-todo-x-show='sidebarOpen'
        className={sideBarOpen ? "lg:hidden" : "hidden"}
        data-todo-x-description='Off-canvas menu for mobile, show/hide based on off-canvas menu state.'
      >
        <div className='fixed inset-0 flex z-40'>
          <div
            data-todo-at-click='sidebarOpen = false'
            data-todo-x-show='sidebarOpen'
            data-todo-x-description='Off-canvas menu overlay, show/hide based on off-canvas menu state.'
            data-todo-x-transition-enter='transition-opacity ease-linear duration-300'
            data-todo-x-transition-enter-start='opacity-0'
            data-todo-x-transition-enter-end='opacity-100'
            data-todo-x-transition-leave='transition-opacity ease-linear duration-300'
            data-todo-x-transition-leave-start='opacity-100'
            data-todo-x-transition-leave-end='opacity-0'
            className='fixed inset-0'
          >
            <div className='absolute inset-0 bg-gray-600 opacity-75'></div>
          </div>
          <div
            data-todo-x-show='sidebarOpen'
            data-todo-x-ref='sidebar'
            tabIndex={0}
            data-todo-x-description='Off-canvas menu, show/hide based on off-canvas menu state.'
            data-todo-x-transition-enter='transition ease-in-out duration-300 transform'
            data-todo-x-transition-enter-start='-translate-x-full'
            data-todo-x-transition-enter-end='translate-x-0'
            data-todo-x-transition-leave='transition ease-in-out duration-300 transform'
            data-todo-x-transition-leave-start='translate-x-0'
            data-todo-x-transition-leave-end='-translate-x-full'
            className='relative flex-1 flex flex-col max-w-xs w-full bg-white focus:outline-none'
          >
            <div className='absolute top-0 right-0 -mr-12 pt-2'>
              <button
                type='button'
                onClick={onClose}
                className='ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
              >
                <span className='sr-only'>Close sidebar</span>
                <svg
                  className='h-6 w-6 text-white'
                  data-todo-x-description='Heroicon name: x'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  ></path>
                </svg>
              </button>
            </div>
            <div className='flex-1 h-0 pt-5 pb-4 overflow-y-auto'>
              <div className='flex-shrink-0 flex items-center px-4'>
                <img className='h-8 w-auto' src={Logo} alt='Workflow' />
              </div>
              <nav aria-label='Sidebar' className='mt-5'>
                <div className='px-2 space-y-1'>
                  {/* Current: "bg-gray-100 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" */}
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
                <a href='/' className='flex-shrink-0 group block'>
                  <div className='flex items-center'>
                    <div>
                      <img
                        className='inline-block h-10 w-10 rounded-full'
                        src={user.profileImage}
                        alt=''
                      />
                    </div>
                    <div className='ml-3'>
                      <p className='text-base font-medium text-gray-700 group-hover:text-gray-900'>
                        {user.name}
                      </p>
                      <p className='text-sm font-medium text-gray-500 group-hover:text-gray-700'>
                        View profile
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            )}
          </div>
          <div className='flex-shrink-0 w-14' aria-hidden='true'></div>
        </div>
      </div>
      <div className='lg:hidden'>
        <div className='flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-1.5'>
          <div>
            <img className='h-8 w-auto' src={Logo} alt='Workflow' />
          </div>
          <div>
            <button
              type='button'
              data-todo-at-click-stop='sidebarOpen = true'
              onClick={onClose}
              className='-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900'
            >
              <span className='sr-only'>Open sidebar</span>
              <svg
                className='h-6 w-6'
                data-todo-x-description='Heroicon name: menu'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h16'
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBarSmall;
