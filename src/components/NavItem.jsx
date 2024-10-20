// src/components/NavItem.js
import React from 'react';
import { Link } from 'react-router-dom';

function NavItem({ children, href }) {
  return (
    <li>
      <Link
        to={href || '#'}
        variant="paragraph"
        color="gray"
        className="flex items-center gap-2 font-medium text-gray-900"
      >
        {children}
      </Link>
    </li>
  );
}

export default NavItem;
