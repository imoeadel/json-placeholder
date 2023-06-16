import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, fetchPosts } from '../redux/features/postSlice';
import { useForm } from 'react-hook-form';
import PostCard from './PostCard';
import Pagination from './Pagination';
import ContentLoader from './ContentLoader';

const HomePage = () => {
  // State for current page, search query, showing the create new post form and tracing if the new post created or not to handle showing the success message
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isPostCreated, setPostCreated] = useState(false);

  const dispatch = useDispatch();

  // Accessing posts and loading state from Redux store
  const { posts, loading } = useSelector(state => state.post);

  // Defining the boundaries of pagination
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Filtering posts based on search query
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Slicing posts array to display current page's posts
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Event handler for pagination
  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  // Event handler for search input change
  const handleSearchChange = e => {
    setSearchQuery(e.target.value);
  };

  const onSubmit = data => {
    setPostCreated(true);
    setTimeout(() => {
      setPostCreated(false);
      dispatch(createPost(data));
      reset();
    }, 500);
  };

  // Fetching posts on component mount
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <div className="min-h-screen items-center flex flex-col gap-2">
      {/* Form for creating a new post */}
      <div className="flex">
        {showForm ? (
          <div className="flex flex-col ">
            <form onSubmit={handleSubmit(onSubmit)} className="">
              {/* Title input */}
              <div className="justify-center flex-col flex">
                <label
                  htmlFor="title"
                  className="block font-medium text-dark dark:text-white"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  {...register('title', { required: true })}
                  className="w-[35rem] lg:w-80 lg:text-base xs:w-60 md:w-72 md:text-sm xs:text-xs border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500 dark:border-none "
                />
                {errors.title && (
                  <span className="text-red-500 my-2">Title is required</span>
                )}
              </div>
              {/* Body textarea */}
              <div className="justify-center flex-col flex">
                <label
                  htmlFor="body"
                  className="block font-medium text-dark dark:text-white"
                >
                  Body
                </label>
                <textarea
                  id="body"
                  {...register('body', { required: true })}
                  className="w-[35rem] lg:w-80 lg:text-base xs:w-60 md:w-72 md:text-sm xs:text-xs border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500 dark:border-none "
                />
                {errors.body && (
                  <span className="text-red-500 my-2">Body is required</span>
                )}
              </div>
              {/* Submit button */}
              <button
                type="submit"
                className="bg-primary dark:bg-primaryDark hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
              >
                Create Post
              </button>
            </form>
            {/* Success message after post creation */}
            {isPostCreated && (
              <p className="text-green-500 dark:text-green-400">Post created successfully!</p>
            )}
          </div>
        ) : (
          // Button to show the create post form
          <button
            onClick={() => setShowForm(true)}
            className="bg-primary dark:bg-primaryDark hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create New Post
          </button>
        )}
      </div>
      {/* Search input */}
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search by title"
        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 mt-10 w-[35rem] lg:w-80 lg:text-base xs:w-60 md:w-72 md:text-sm xs:text-xs "
      />
      {loading ? (
        // Content loader while loading posts
        <div className="mt-20">
          <ContentLoader />
        </div>
      ) : (
        <>
          {/* Rendering post card for each post initially and filtered post when using the search feature */}
          {posts &&
            currentPosts.map((post, index) => (
              <PostCard key={`post ${index}`} post={post} />
            ))}

          {/* Pagination */}
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default HomePage;