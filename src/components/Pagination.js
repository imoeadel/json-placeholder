import React from 'react';

const Pagination = ({
  postsPerPage,
  totalPosts,
  currentPage,
  onPageChange,
}) => {
  const pageNumbers = [];

  // Calculate the total number of pages based on posts per page and total posts
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  // Generate an array of page numbers
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex flex-row w-full items-center justify-center gap-5 xs:gap-1 md:gap-2 lg:gap-3">
      {/* Render pagination buttons for each page number */}
      {pageNumbers.map((pageNumber, index) => (
        <button
          className={`bg-light text-dark border border-solid border-dark w-8 h-8 my-1 rounded-lg 
          items-center justify-center hover:bg-primary dark:hover:bg-primaryDark hover:text-white hover:border-none ${
            pageNumber === currentPage
              ? 'bg-primary text-white border-none dark:bg-primaryDark'
              : ''
          }`}
          key={index}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Pagination;