import SearchForm from "./component/searchform";
import Mapview from "./component/mapview";
import PriceTable from "./component/pricetable";
import { useState } from "react";

function App(){
  const [route , setRoute] = useState(null);
  const[prices , setPrices] = useState(null);
  
  const handleSearch = (from , to) => {
    setRoute({from , to });

    setPrices([
      { app: "Uber", price: 320 },
      { app: "Ola", price: 300 },
      { app: "Rapido", price: 180 }
    ]);
  };
  return (
    <>
      <h1>Cap Price Cpmparisor</h1>
      <SearchForm onSearch={handleSearch} />
      {route && <Mapview route = {route} />}
      {prices.length > 0 && <PriceTable prices={prices} />}
    </>
  );
}
export default App;