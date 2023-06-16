import React, { useState } from 'react';
import {
  GithubIcon,
  LinkedInIcon,
  MoonIcon,
  SunIcon,
  TwitterIcon,
} from '../Icons';
import useThemeSwitcher from './hooks/useThemeSwitcher';
import { motion } from 'framer-motion';
import Logo from './Logo';
import { Link } from 'react-router-dom';

const CustomLink = ({ href, title, className = '' }) => {
  return (
    // Render a custom link with a title and optional additional class
    <Link href={href} className={`${className} relative group`}>
      {title}

      {/* Render a span element for styling */}
      <span
        className={`h-[1px] w-full inline-block bg-dark absolute left-0 -bottom-0.5 group-hover:w-full transition-[width] ease duration-300
        dark:bg-light`}
      >
        &nbsp;
      </span>
    </Link>
  );
};

const CustomMobileLink = ({ href, title, className = '', toggle }) => {
  const handleClick = () => {
    toggle();
  }

  return (
    // Render a custom link button for mobile with a title, optional additional class, and a toggle function
    <button href={href} className={`${className} relative group text-light dark:text-dark my-2`} onClick={handleClick}>
      {title}

      {/* Render a span element for styling purposes */}
      <span
        className={`h-[1px] w-full inline-block bg-light dark:bg-dark absolute left-0 -bottom-0.5 group-hover:w-full transition-[width] ease duration-300
         `}
      >
        &nbsp;
      </span>
    </button>
  );
};

const Header = () => {
  const [mode, setMode] = useThemeSwitcher();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header
      className="w-full px-32 py-8 font-medium flex items-center justify-between
      dark:text-light relative z-10 lg:px-16 md:px-12 sm:px-8 bg-light dark:bg-dark text-dark"
    >
      {/* Hamburger menu button */}
      <button
        className="flex-col justify-center items-center hidden lg:flex"
        onClick={handleClick}
      >
        {/* Render the lines of the hamburger menu */}
        <span
          className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
            isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
          }`}
        ></span>
        <span
          className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
            isOpen ? 'opacity-0' : 'opacity-100'
          }`}
        ></span>
        <span className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
            isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
          }`}></span>
      </button>
      <div className='w-full flex justify-between items-center lg:hidden'>
        {/* Logo and navigation links */}
        <nav>
          <CustomLink href="/" title="JSON Placeholder" className="mr-4" />
        </nav>
        <nav className="flex items-center justify-center flex-wrap">
          {/* Social media icons */}
          <motion.a
            href="https://twitter.com/moexyloto"
            target={'_blank'}
            className="w-6 mr-3"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <TwitterIcon />
          </motion.a>
          <motion.a
            href="https://github.com/imoeadel"
            target={'_blank'}
            className="w-6 mx-3"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <GithubIcon />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/imoedev/"
            target={'_blank'}
            className="w-6 ml-3"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <LinkedInIcon />
          </motion.a>

          {/* Theme switcher button */}
          <button
            onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
            className={`ml-6 flex items-center justify-center rounded-full p-1 
            ${mode === 'light' ? 'bg-dark text-light' : 'bg-light text-dark'}`}
          >
            {mode === 'dark' ? (
              <MoonIcon className={'fill-dark'} />
            ) : (
              <SunIcon className={'fill-dark'} />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile navigation */}
      {isOpen ? (
        <motion.div
          initial={{scale:0, opacity: 0, x:"-50%", y: "-50%" }}
          animate={{scale: 1, opacity: 1}}
          className='min-w-[70vw] flex flex-col justify-between items-center 
          fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-dark/90 dark:bg-light/75 rounded-lg
          backdrop-blur-md py-32 sm:py-20 sm:w-[75%]'>
          <nav className='flex items-center flex-col justify-center'>
            {/* Custom mobile link */}
            <CustomMobileLink href="/" title="JSON Placeholder" className="" toggle={handleClick} />
          </nav>
          <nav className="flex items-center justify-center flex-wrap mt-2">
            {/* Social media icons */}
            <motion.a
              href="https://twitter.com/moexyloto"
              target={'_blank'}
              className="w-6 mr-3 sm:mx-1"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <TwitterIcon />
            </motion.a>
            <motion.a
              href="https://github.com/imoeadel"
              target={'_blank'}
              className="w-6 mx-3 bg-light rounded-full dark:bg-dark sm:mx-1"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <GithubIcon />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/imoedev/"
              target={'_blank'}
              className="w-6 ml-3 sm:mx-1"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <LinkedInIcon />
            </motion.a>

            {/* Theme switcher button */}
            <button
              onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
              className={`ml-3 flex items-center justify-center rounded-full p-1 w-6 h-6 
              ${mode === 'light' ? 'bg-dark text-light' : 'bg-light text-dark'}`}
            >
              {mode === 'dark' ? (
                <MoonIcon className={'fill-dark'} />
              ) : (
                <SunIcon className={'fill-dark'} />
              )}
            </button>
          </nav>
        </motion.div>
      ) : null}

      {/* Logo */}
      <div className="absolute left-[50%] top-2 translate-x-[-50%]">
        <Logo />
      </div>
    </header>
  );
};

export default Header;
