function PriceTable({ prices }) {
  return (
    <div className="min-h-screen bg-[#0f0f0f] flex justify-center pt-12">
      <div className="w-full max-w-md px-4">

        {/* Heading */}
        <h2 className="text-white text-2xl font-semibold text-center mb-6">
          Price Comparison
        </h2>

        {/* Cards */}
        <div className="space-y-4">
          {prices.map((item, index) => (
            <div
              key={index}
              className="bg-[#1a1a1a] rounded-xl p-5 flex justify-between items-center
                         transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Left: Cab Info */}
              <div>
                <h3 className="text-white text-lg font-semibold">
                  {item.app}
                </h3>
                <p className="text-gray-400 text-sm">
                  Estimated Price
                </p>
              </div>

              {/* Right: Price + Button */}
              <div className="text-right">
                <div className="text-white text-xl font-bold">
                  ₹{item.price}
                </div>

                <button
                  className="mt-2 px-4 py-1.5 bg-white text-black text-sm rounded-md
                             hover:bg-gray-200 transition"
                >
                  Open App
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default PriceTable;
