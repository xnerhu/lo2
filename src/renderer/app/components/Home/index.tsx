import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const TEST = gql`
  query {
    hello
  }
`;

export default () => {
  const { loading, error, data } = useQuery(TEST);

  return (
    <div>
      Home
      <h2>{data?.hello ?? 'XDDDDDDDDDDDDDDDD'}</h2>
      <Link to="/articles">Articles</Link>
    </div>
  );
};
