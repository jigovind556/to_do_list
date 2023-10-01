import React, { useState } from 'react';
import { FaSort, FaUser } from 'react-icons/fa';
import "../css/top-navbar.css";

const TopNavbar = () => {
  const [showSortOptions, setShowSortOptions] = useState(false);

  const toggleSortOptions = () => {
    setShowSortOptions(!showSortOptions);
  };

  const handleSortOptionClick = (option) => {
    // Implement your sorting logic here
    console.log(`Sorting by ${option}`);
    // Close the sort options dropdown
    setShowSortOptions(false);
  };

  return (
    <nav className="top-navbar ">
      <div className="left-icons">
        <span className="icon">
          <FaUser />
        </span>
        <span className="user-name">Your Name</span>
      </div>
      <div className="right-icons">
        <div className="icon-container" onMouseEnter={toggleSortOptions} onMouseLeave={toggleSortOptions}>
          <span className="icon">sort</span>
          {showSortOptions && (
            <div className="sort-popup">
              <div onClick={() => handleSortOptionClick('Time')}>Time</div>
              <div onClick={() => handleSortOptionClick('Done')}>Done</div>
              <div onClick={() => handleSortOptionClick('Undone')}>Undone</div>
              <div onClick={() => handleSortOptionClick('Alphabetical')}>Alphabetically</div>
            </div>
          )}
        </div>
        <button className="login-button">Login/Signup</button>
      </div>
    </nav>
  );
};

export default TopNavbar;
