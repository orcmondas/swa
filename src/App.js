import React, { useState } from 'react';
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './App.css';
import {Grid, Button, Box, Typography, Input, FormControl} from '@mui/material';

const queryClient = new QueryClient()

async function useFetchFunc(query) {
  const response = await fetch('https://reqres.in/api/users/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      "name": query,
      "job": "leader"
  }
  })
  return response
}



function QueryOutput({ query }) {
  const { data, isLoading} = useQuery({queryKey: [query], queryFn: useFetchFunc})
  return (
    <Grid>
      <Typography>Status: {isLoading ? "Sending Query..." : "Sent"}</Typography>
      <br/>
      <Typography>Last input: {JSON.stringify(query)}</Typography>
      <br/>
      <Typography>JSON Response: {JSON.stringify(data)}</Typography>
    </Grid>
  )
}


function App() {
  const [query, setQuery] = useState('');
  const [userInput, setUserInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(userInput);
  };

  

  return (
    <div className='App'>
    <Box>
    <QueryClientProvider client={queryClient}>
      
    <Typography variant='h2'> SWA Tengu Test V1</Typography>
    <form onSubmit={handleSubmit}>
    <FormControl>
      <Input
        type="text"
        value={userInput}
        placeholder='Enter your query here...'
        onChange={(e) => setUserInput(e.target.value)}
      />

      <Button  variant="contained" type="submit">Submit</Button>
    </FormControl>
    </form>
    <QueryOutput query={query} />
   <ReactQueryDevtools initialIsOpen />
  </QueryClientProvider>
  </Box>
  </div>
  );
}

export default App;
