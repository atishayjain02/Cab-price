import { useState } from "react";
import SearchForm from "./components/SearchForm";
import PriceTable from "./components/PriceTable";

function App() {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (from, to) => {
    if (!from || !to) {
      alert("Please enter both locations");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/compare-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from, to }),
      });

      const data = await res.json();

      const priceArray = Object.entries(data.prices).map(
        ([app, price]) => ({
          app: app.toUpperCase(),
          price,
        })
      );

      setPrices(priceArray);
    } catch (err) {
      console.error(err);
      alert("Backend error");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cab Price Comparator</h1>

      <SearchForm onSearch={handleSearch} />

      {loading && <p>Calculating best prices...</p>}

      {prices.length > 0 && <PriceTable prices={prices} />}
    </div>
  );
}

export default App;
