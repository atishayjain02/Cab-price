import SearchForm from "./components/SearchForm";
import MapView from "./components/MapView";
import PriceTable from "./components/PriceTable";
import { useState } from "react";

function App() {
  const [route, setRoute] = useState(null);
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (from, to) => {
    // validation
    if (!from || !to) {
      alert("Please enter both locations");
      return;
    }

    setLoading(true);

    // simulate API call
    setTimeout(() => {
      setRoute({ from, to });

      setPrices([
        { app: "Uber", price: 320 },
        { app: "Ola", price: 300 },
        { app: "Rapido", price: 180 }
      ]);

      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cab Price Comparator</h1>

      <SearchForm onSearch={handleSearch} />

      {loading && <p>Fetching best prices...</p>}

      {route && <MapView route={route} />}

      {prices.length > 0 && <PriceTable prices={prices} />}
    </div>
  );
}

export default App;
