import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-light dark:bg-dark w-full border-t-2 border-solid border-dark font-medium text-base dark:text-light dark:border-light
    sm:text-base px-2'>
      <div className='py-5 flex items-center justify-between lg:flex-col lg:py-6'>
        <span>{new Date().getFullYear()} &copy; All Rights Reserved.</span>
      </div>
    </footer>
  )
}

export default Footer