import React from 'react';

const ThemeToggle = ({ darkMode, setDarkMode }) => {
    return (
        <button
            className="bg-gray-200 dark:bg-gray-700 p-2 rounded-md"
            onClick={() => setDarkMode(!darkMode)}
        >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
    );
}

export default ThemeToggle;
