import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <Link to='/posts'>Posts</Link>
      Header
    </header>
  );
}

export default Header;
