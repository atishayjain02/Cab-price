function PriceTable({ prices }) {
  return (
    <div>
      <h2>Price Comparison</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Cab App</th>
            <th>Price (₹)</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((item, index) => (
            <tr key={index}>
              <td>{item.app}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PriceTable;