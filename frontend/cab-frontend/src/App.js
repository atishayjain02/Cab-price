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
      const res = await fetch("http://127.0.0.1:5000/compare", {
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
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f3f4f6",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",}}>

    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "32px",
        borderRadius: "12px",
        width: "100%",
        maxWidth: "520px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{
        fontSize:"28px",
        fontWeight:"bold",
        marginBottom:"20px",
        textAlign:"center"
      }}>Cab Price Comparator</h1>

      <SearchForm onSearch={handleSearch} />

      {loading &&  <p style={{ textAlign: "center", marginTop: "10px", color: "#6b7280" }}>
    ⏳ Calculating best prices...
  </p>}

      {prices.length > 0 && <PriceTable prices={prices} />}
    </div>
    </div>
  );
}

export default App;
