onmessage = (e) => {
  const { marketData, tickerData } = e.data;

  // Use a simple for-loop for better performance
  for (let i = 0; i < marketData.length; i++) {
    const item = marketData[i];
    const ticker = tickerData[item.symbol];

    if (ticker) {
      // Cache precision value
      const precision = item.precision || 6;

      // Update existing item to avoid creating new objects
      item.price = ticker.last.toFixed(precision);
      item.change = ticker.change.toFixed(2);
    }
    // If ticker data doesn't exist, the item remains unchanged
  }

  // Post the updated marketData array
  postMessage(marketData);
};
