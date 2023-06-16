import React from 'react';

const ContentLoader = () => (
  // Render a loading spinner component
  <div className="h-full flex items-center justify-center w-full">
    <div className="row">
      <div className="col-md-12 d-flex justify-content-center">
        {/* Loading spinner element with animation */}
        <div className={`border-4 border-solid border-[#f3f3f3] border-t-4 border-t-[#3498db] rounded-full w-40 h-40 animate-spin`} />
      </div>
    </div>
  </div>
);

export default ContentLoader;
