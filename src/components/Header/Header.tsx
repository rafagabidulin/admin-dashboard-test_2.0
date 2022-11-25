import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <Link to='/'>Home</Link>
      <Link to='/posts'>Posts</Link>
      <Link to='/albums'>Albums</Link>
      <Link to='/todos'>Todos</Link>
    </header>
  );
}

export default Header;
