import React, { useState } from "react";

const Alerts = ({ message, status }) => {
  const [closed, setClose] = useState(false);

  const onClose = (e) => {
    e.preventDefault();
    setClose(true);
  };
  return (
    <>
      {closed ? (
        <></>
      ) : (
        <div className='max-w-4xl mx-auto mt-4'>
          <div className='rounded-md bg-red-50 p-4'>
            <div className='flex items-center'>
              <div>
                <i className='fas fa-exclamation-circle h-5 w-5 text-red-400'></i>
              </div>
              <div className='ml-3'>
                <p className='text-sm font-medium text-red-800'>{message}</p>
              </div>
              <div className='ml-auto pl-3'>
                <div className='-mx-1.5 -my-1.5'>
                  <button
                    onClick={onClose}
                    className='inline-flex bg-red-50 rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600'
                  >
                    <span className='sr-only'>Dismiss</span>
                    <svg
                      className='h-5 w-5'
                      data-todo-x-description='Heroicon name: x'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      aria-hidden='true'
                    >
                      <path
                        fillRule='evenodd'
                        d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                        clipRule='evenodd'
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Alerts;
