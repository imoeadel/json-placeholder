import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createPost } from '../redux/features/postSlice';
import { useNavigate } from 'react-router-dom';

const NewPostPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isPostCreated, setPostCreated] = useState(false);

  const onSubmit = (data) => {
    // Dispatch action to create new post
     dispatch(createPost(data));
    setPostCreated(true);
    setTimeout(() => {
      setPostCreated(false);
      navigate('/');
    }, 1000);
  };

  return (
    <div>
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="title" className="block font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            {...register('title', { required: true })}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
          />
          {errors.title && <span className="text-red-500">Title is required</span>}
        </div>
        <div>
          <label htmlFor="body" className="block font-medium text-gray-700">Body</label>
          <textarea
            id="body"
            {...register('body', { required: true })}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
          />
          {errors.body && <span className="text-red-500">Body is required</span>}
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create Post
        </button>
      </form>
      {isPostCreated && <p className="text-green-500">Post created successfully!</p>}
    </div>
  );
};

export default NewPostPage;