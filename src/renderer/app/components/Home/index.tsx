import React from 'react';
import { Link } from 'react-router-dom';
// import { ApolloProvider } from '@apollo/react-hooks';

// import { client } from '../../store';

export default () => {
  return (
    <div>
      Home
      <Link to="/articles">Articles</Link>
    </div>
  );

  // return (
  //   <ApolloProvider client={client}>
  //     <div>
  //       <h2>My first Apollo app 🚀</h2>
  //     </div>
  //   </ApolloProvider>
  // );
};
