import React from 'react';

const Icon = ({ icon, className = 'w-6 h-6', title, ...props }) => {
  
  return (
    <svg
      role="img"
      viewBox="0 0 24 24" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      
      <title>{title || icon.title}</title>
      <path d={icon.path} fill="currentColor" />
    </svg>
  );
};

export default Icon;