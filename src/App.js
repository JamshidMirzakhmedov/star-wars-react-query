import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/Navbar";
import People from "./components/People";
import Planets from "./components/Planets";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  const [page, setPage] = useState("Planets");
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <h1>Star Wars Info</h1>
          <Navbar setPage={setPage} />
          {page === "planets" ? <Planets /> : <People />}
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
