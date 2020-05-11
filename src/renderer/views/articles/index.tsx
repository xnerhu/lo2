import React from 'react';
import { Link } from 'react-router-dom';

import { usePage } from '~/renderer/hooks/network';

export default () => {
  const [data] = usePage('articles');

  return (
    <div>
      <h4>Articles</h4>
      <h1></h1>
      <br />
      <Link to="/">Home</Link>
    </div>
  );
};
