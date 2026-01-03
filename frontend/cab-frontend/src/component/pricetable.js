function PriceTable({ prices }){
    return (
        <table>
            <tr>
                <th>App</th>
                <th>Price</th>
            </tr>
            {prices.map((p,i)=>(
            <tr key={i}>
            <td>{p.app}</td>
            <td>₹{p.price}</td>
            </tr>
            ))}
        </table>
    );
}
export default PriceTable;