import React from 'react';
import { Link } from 'react-router-dom';

function NavItem({ children, href }) {
  const isExternal = href && href.startsWith('http');

  return (
    <li>
      {isExternal ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-medium text-gray-900"
        >
          {children}
        </a>
      ) : (
        <Link
          to={href || '#'}
          className="flex items-center gap-2 font-medium text-gray-900"
        >
          {children}
        </Link>
      )}
    </li>
  );
}

export default NavItem;
