import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { deletePost, updatePost } from '../redux/features/postSlice';
import { RiDeleteBinLine } from 'react-icons/ri';

const PostCard = ({ post }) => {
  // State for showing full text, editing mode and updated post
  const [showFullText, setShowFullText] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedPost, setUpdatedPost] = useState(post);

  const dispatch = useDispatch();

  // Event handler for entering edit mode
  const handleEdit = () => {
    
    // Checking if the post to be edited is from the api or it is just created/faked before editing
    if (post.id > 100) {
      alert("You can't edit a post that you just created!");
    } else {
      setIsEditing(true);
    }
  };

  // Event handler for saving the updated post
  const handleSave = () => {
    dispatch(updatePost(updatedPost));
    setIsEditing(false);
  };

  // Event handler for deleting the post
  const handleDelete = () => {
    dispatch(deletePost(post.id));
  };

  // Event handler for input change in edit mode
  const handleChange = e => {
    const { name, value } = e.target;
    setUpdatedPost(prevPost => ({
      ...prevPost,
      [name]: value,
    }));
  };

  // Toggling the showFullText state
  const toggleFullText = () => {
    setShowFullText(prevShowFullText => !prevShowFullText);
  };

  // Function to generate a random date within a given range
  const getRandomDate = (startDate, endDate) => {
    const startTimestamp = startDate.getTime();
    const endTimestamp = endDate.getTime();
    const randomTimestamp =
      Math.random() * (endTimestamp - startTimestamp) + startTimestamp;
    const randomDate = new Date(randomTimestamp);

    const day = randomDate.getDate();
    const month = randomDate.getMonth() + 1;
    const year = randomDate.getFullYear();

    // Return the random date as a string
    return `${day}-${month}-${year}`;
  };

  // Define the start and end dates for the desired range
  const startDate = new Date(2023, 0, 1);
  const endDate = new Date(2023, 6, 16);

  // Generate a random date using the getRandomDate function
  const randomDate = getRandomDate(startDate, endDate);

  return (
    <motion.article
      initial={{ y: 50 }}
      whileInView={{ y: 0 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="w-[80%] flex gap-2 py-5 my-5 items-end justify-between rounded-xl border border-solid border-b-4 border-r-4 
                border-dark bg-light shadow-lg p-10 relative rounded-br-2xl dark:bg-dark dark:border-light
                  lg:p-8 xs:rounded-2xl xs:rounded-br-3xl xs:py-3 xs:px-2 dark:text-light"
    >
      <div className="flex flex-col gap-2 lg:text-sm md:text-xs w-full">
        {/* Title section */}
        {isEditing ? (
          <input
            type="text"
            name="title"
            value={updatedPost.title}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 text-dark focus:outline-none focus:border-primary w-[40rem] xl:w-[30rem] lg:w-[22rem] md:w-[16rem] sm:w-[12rem] xs:w-[8rem]"
          />
        ) : (
          <span className="">Title: {post.title}</span>
        )}
        {/* Author section */}
        <span className="">Author: {post.id}</span>
        {/* The jsonplaceholder api doesn't have a date in the posts so I had to improvise and make a random date since the task stated that the article should contain a publication date  */}
        <span className="">Created At: {randomDate}</span>
        {/* Body section */}
        {isEditing ? (
          <textarea
            name="body"
            value={updatedPost.body}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 text-dark focus:outline-none focus:border-primary  w-[40rem] xl:w-[30rem] lg:w-[22rem] md:w-[16rem] sm:w-[12rem] xs:w-[8rem]"
          />
        ) : (
          <div>
            <span className="">
              Content: {showFullText ? post.body : post.body.slice(0, 80)}
              {post.body.length > 80 && !showFullText ? '...' : ''}&nbsp;
              {/* Toggle full text button */}
              {post.body.length > 80 && (
                <button
                  onClick={toggleFullText}
                  className="text-primary dark:text-primaryDark hover:underline focus:outline-none"
                >
                  {showFullText ? 'Read Less' : 'Read More'}
                </button>
              )}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-row gap-2 md:gap-0">
        {/* Edit button */}
        {isEditing ? (
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSave}
            className="px-4 py-1 rounded-md bg-primary text-light dark:bg-primaryDark md:px-2 lg:px-3"
          >
            Save
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleEdit}
            className="px-4 py-1 rounded-md bg-primary text-light dark:bg-primaryDark md:px-2 lg:px-3"
          >
            Edit
          </motion.button>
        )}
        {/* Delete button */}
        <motion.button
          onClick={handleDelete}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.9 }}
          className=" rounded-md p-0"
        >
          {
            <RiDeleteBinLine className="w-10 h-7 md:2-8 md:h-5 text-red-500 dark:text-red-400 " />
          }
        </motion.button>
      </div>
    </motion.article>
  );
};

export default PostCard;
