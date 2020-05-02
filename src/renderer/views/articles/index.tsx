import React from 'react';
import { Link } from 'react-router-dom';

import { useApi } from '~/renderer/hooks/api';

export default () => {
  const [data] = useApi('articlesPage');

  return (
    <div>
      <h4>Articles</h4>
      <h1>{data}</h1>
      <br />
      <Link to="/">Home</Link>
    </div>
  );
};
