import { useState } from "react";

function SearchForm({ onSearch }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();         
    onSearch(from, to);          
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Pickup Location"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      />

      <input
        type="text"
        placeholder="Drop Location"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />

      <button type="submit">Compare</button>
    </form>
  );
}

export default SearchForm;