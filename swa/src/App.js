import React, { useState } from 'react';
// import ReactDOM from 'react-dom/client'
// import axios from 'axios'
import _ from "lodash"
import {
  useQuery,
  // useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './App.css';
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
  // const queryClient = useQueryClient()
  const { data, isLoading} = useQuery({queryKey: [query], queryFn: useFetchFunc})
  return (
    <div>
      Status: {isLoading ? "Sending Query..." : "Sent"}
      <br/>
      Last input: {JSON.stringify(query)}
      <br/>
      JSON Response: {JSON.stringify(data)}
    </div>
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
    <div>
    <QueryClientProvider client={queryClient}>
    <h1>SWA Tengu Test</h1>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
    <QueryOutput query={query} />
  <ReactQueryDevtools initialIsOpen />
  </QueryClientProvider>
  </div>

  );
}

export default App;
