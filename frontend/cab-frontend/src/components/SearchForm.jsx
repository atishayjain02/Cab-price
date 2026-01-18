import { useState } from "react";

function SearchForm({ onSearch }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(from, to);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        marginBottom: "20px",
      }}
    >
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

      <button type="submit" style={{
        padding: "12px",
        backgroundColor: "black",
        color: "white",
        border: "none",
        borderRadius: "8px",
        fontSize: "15px",
        fontWeight: "600",
        cursor: "pointer",
      }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "black")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "black")}
      >Compare</button>
    </form>
  );
}

export default SearchForm;