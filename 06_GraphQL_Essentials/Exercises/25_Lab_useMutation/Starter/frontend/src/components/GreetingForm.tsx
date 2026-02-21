import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_LATEST_GREETING } from '../graphql/queries';

interface LatestGreetingData {
  latestGreeting: {
    id: string;
    name: string;
    message: string;
    createdAt: string;
  } | null;
}

function GreetingForm() {
  const [name, setName] = useState('');

  // latest greeting is shown so students can see mutation results reflected in UI
  const { data: latestData } = useQuery<LatestGreetingData>(GET_LATEST_GREETING, {
    pollInterval: 2000,
  });

  // TODO 1: import useMutation from @apollo/client
  // TODO 2: import CREATE_GREETING from ../graphql/queries
  // TODO 3: create mutation hook, example:
  // const [createGreeting, { loading, error, data }] = useMutation(CREATE_GREETING, { refetchQueries: [...] })
  // TODO 4: in handleSubmit, call createGreeting({ variables: { name } })

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim()) {
      return;
    }

    // TODO: Execute mutation on submit and clear input on success
  };

  return (
    <section className="card">
      <h2>Create Greeting</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name-input">Name variable</label>
        <input
          id="name-input"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter a name"
        />

        <button type="submit">Submit Greeting</button>
      </form>

      <div className="result-box">
        <p><strong>Latest saved greeting:</strong></p>
        <p>{latestData?.latestGreeting?.message ?? 'No greeting saved yet.'}</p>
      </div>
    </section>
  );
}

export default GreetingForm;
