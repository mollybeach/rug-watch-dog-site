"use client";

import { useState, useEffect } from "react";
import { LineChart } from "lucide-react";
import dynamic from "next/dynamic";

// Disable SSR for Plot component
const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

// Add check for window
export default function PriceHistory() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div>Loading...</div>;
  }

  // Rest of your component code...
} 