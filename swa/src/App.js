import React, { useState } from 'react';
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import _ from "lodash"
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './App.css';
const queryClient = new QueryClient()

async function useFetchFunc(query) {
  const body = [{
    key: "query", value: query
  }]
  const formBody = _.map(body, ({ key, value }) => {
    return encodeURIComponent(key) + "=" + encodeURIComponent(value)
  }).join("&")

  const response = await fetch('api/sparql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formBody
  })
  return response
}



function QueryOutput({ query }) {
  const queryClient = useQueryClient()
  const { status, data, error, isFetching, isLoading} = useQuery({queryKey: query, queryFn: useFetchFunc})
  return (
    <div>
      Status: {isLoading ? "Sending Query..." : "Sent"}
      <br/>
      Last input: {JSON.stringify(query)}
    </div>
  )
}


function App() {
  const [query, setQuery] = useState('');
  const [userInput, setUserInput] = useState('');


  // const data = {}
  // const isLoading = false;
  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(userInput);
  };

  

  // const { data, error, isLoading } = useQuery({queryKey: 'sparql'}, async () => {
  //   if (message) {
  //     const response = await fetch(`/api/sparql/${message}`);
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     return response.json();
  //   }
  // }, {
  //   enabled: !!message,
  // });

  return (
    <div>
    <QueryClientProvider client={queryClient}>
    <h1>SWA Test</h1>
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
