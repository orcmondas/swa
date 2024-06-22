import { Button, FormControl, Grid, Input, Typography } from '@mui/material';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { useState } from 'react';
import './App.css';

const queryClient = new QueryClient();

async function fetchSparqlQuery(query) {
  console.log("Starting request")
  const response = await fetch(`/sparql/${query}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: query,
      job: 'query-tester',
    }),
  });
  const data = await response.json();
  console.log("Request completed: ", data)
  return data;
}

function useSparqlQuery(query) {
  return useQuery({
    queryKey: [query, "sparql-test-tengu"],
    queryFn: () => fetchSparqlQuery(query),
    enabled: !!query,
  });
}

function QueryOutput({ query }) {
  const { data, isLoading, error } = useSparqlQuery(query);
  if (isLoading) return <Typography>Sending Query...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;

  return JSON.stringify(data);
}

function App() {
  const [query, setQuery] = useState('');
  const [userInput, setUserInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(userInput);
  };

  return (
    <div className="App">
      <Grid>
        <QueryClientProvider client={queryClient}>
          <Typography variant="h2"> SWA Tengu Test V1</Typography>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <Input
                type="text"
                value={userInput}
                placeholder="Enter your alias here..."
                onChange={(e) => setUserInput(e.target.value)}
              />

              <Button variant="contained" type="submit">
                Submit
              </Button>
            </FormControl>
          </form> 
          <Grid>
            <Typography>Last input: {JSON.stringify(query)}</Typography>
            <br />
            <Typography>JSON Response: {query ? <QueryOutput query={query} /> : <></>}</Typography>
          </Grid>
  
          <ReactQueryDevtools initialIsOpen />
        </QueryClientProvider>
      </Grid>
    </div>
  );
}

export default App;