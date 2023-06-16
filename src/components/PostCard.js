import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Delete } from '../Icons';
import { motion } from 'framer-motion';
import { deletePost, updatePost } from '../redux/features/postSlice';
import { RiDeleteBinLine } from 'react-icons/ri'

const PostCard = ({ post }) => {
  const [showFullText, setShowFullText] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedPost, setUpdatedPost] = useState(post);

  const dispatch = useDispatch();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch(updatePost(updatedPost));
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(deletePost(post.id));
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setUpdatedPost(prevPost => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const trimmedText = showFullText ? post.body : `${post.body.slice(0, 80)}...`;
  const isLongText = post.body.length > 80;

  const toggleFullText = () => {
    setShowFullText(prevShowFullText => !prevShowFullText);
  };

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
        <span className="">Author: {post.id}</span>
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
        {isEditing ? (
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSave}
            className="px-4 py-1 rounded-md bg-primary text-light dark:bg-primaryDark"
          >
            Save
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleEdit}
            className="px-4 py-1 rounded-md bg-primary text-light dark:bg-primaryDark"
          >
            Edit
          </motion.button>
        )}

        <motion.button
          onClick={handleDelete}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.9 }}
          className=" rounded-md p-0"
        >
          {<RiDeleteBinLine className="w-10 h-7 md:2-8 md:h-5 text-red-500 dark:text-red-400 "/>}
        </motion.button>
      </div>
    </motion.article>
  );
};

export default PostCard;
