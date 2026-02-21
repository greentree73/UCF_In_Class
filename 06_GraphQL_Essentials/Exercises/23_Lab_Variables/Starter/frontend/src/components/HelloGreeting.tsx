import React, { useState } from 'react';

function HelloGreeting() {
  const [name, setName] = useState('Knightro');

  // TODO 1: Import useQuery from @apollo/client
  // TODO 2: Import GET_GREETING from ../graphql/queries
  // TODO 3: Call useQuery with a variables object:
  // useQuery(GET_GREETING, { variables: { name } })
  // TODO 4: Render loading and error states
  // TODO 5: Render the greeting from data

  return (
    <section className="card">
      <h2>Hello Greeting</h2>
      <label htmlFor="name-input">Name variable</label>
      <input
        id="name-input"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <p>Complete this component to query a greeting with the name variable.</p>
    </section>
  );
}

export default HelloGreeting;
