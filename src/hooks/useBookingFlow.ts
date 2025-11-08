"use client";
import { useState } from "react";
export function useBookingFlow() {
  const [date, setDate] = useState('');
  const [party, setParty] = useState(2);
  const [category, setCategory] = useState('sunrise');
  function book() { alert(`Checking ${category} availability for ${party} on ${date||'(pick a date)'}`); }
  return { date, setDate, party, setParty, category, setCategory, book };
}
