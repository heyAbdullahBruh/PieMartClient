// app/error.js
"use client";

import { useEffect } from 'react';

export default function Error({ error, reset }) {
 useEffect(() => {
    console.error("An error occurred:", error);
  }, [error]);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Oops! Something went wrong.</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()} style={{cursor:'pointer',borderRadius:'2rem'}}>Try Again</button>
    </div>
  );
}
