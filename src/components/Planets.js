import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Planet from "./Planet";

function Planets() {
  const [page, setPage] = useState(1);

  const fetchPlanets = async (page) => {
    const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
    return res.json();
  };

  const { data, status, isPreviousData } = useQuery({
    queryKey: ["planets", page],
    queryFn: () => fetchPlanets(page),
  });

  return (
    <div>
      <h2> Planets</h2>
      {status === "loading" && <h1>Loading...</h1>}

      {status === "error" && <h1>Error Fetching data</h1>}

      <button
        onClick={() => setPage((old) => Math.max(old - 1, 1))}
        disabled={page === 1}
      >
        Previous
      </button>

      <span>{page}</span>

      <button
        onClick={() => {
          if (!isPreviousData && data) {
            setPage((old) => old + 1);
          }
        }}
        // Disable the Next Page button until we know a next page is available
        disabled={page === 6}
      >
        Next Page
      </button>

      {data?.results?.map((planet) => (
        <Planet key={planet.name} planet={planet} />
      ))}
    </div>
  );
}

export default Planets;
