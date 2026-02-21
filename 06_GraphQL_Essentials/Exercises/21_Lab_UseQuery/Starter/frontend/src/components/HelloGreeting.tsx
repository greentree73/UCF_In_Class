import React from 'react';

function HelloGreeting() {
  // TODO 1: Import useQuery from @apollo/client
  // TODO 2: Import GET_GREETING from ../graphql/queries
  // TODO 3: Use useQuery(GET_GREETING) to request greeting data
  // TODO 4: Render loading and error states
  // TODO 5: Render the greeting from query data

  return (
    <section className="card">
      <h2>Hello Component</h2>
      <p>Complete this component to fetch and display the GraphQL greeting.</p>
    </section>
  );
}

export default HelloGreeting;
