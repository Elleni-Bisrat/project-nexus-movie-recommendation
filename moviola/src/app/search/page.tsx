
"use client";
import React, { Suspense } from "react";
import SearchContent from "./SearchContent";

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div style={{ 
        minHeight: '100vh', 
        background: '#f8f9fa', 
        padding: '2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div>Loading search results...</div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}