function SearchForm({ onSearch }){
    const handleSubmit = (e) =>{
        e.preventDefault();
        const from = e.target.from.value;
        const to = e.target.to.value;
        onSearch(from , to);
    };
    return (
        <form OnSubmit = {handleSubmit}>
            <input name = "from" placeholder="Pickup Location" />
            <input name="to" placeholder="Drop Location" />
            <button type="submit">Compare</button>
        </form>
    );
}
export default SearchForm;