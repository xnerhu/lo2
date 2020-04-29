import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div>
      Home
      <h2>Hello</h2>
      <Link to="/articles">Articles</Link>
    </div>
  );
};
