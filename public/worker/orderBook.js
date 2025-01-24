// Optimized aggregateData function using Map
const aggregateData = (data, tickSize) => {
  const aggregatedMap = new Map();
  data.forEach(([price, amount]) => {
    const roundedPrice = Math.floor(price / tickSize) * tickSize;
    if (aggregatedMap.has(roundedPrice)) {
      const existing = aggregatedMap.get(roundedPrice);
      existing.amount += amount;
      existing.total += price * amount;
    } else {
      aggregatedMap.set(roundedPrice, { price: roundedPrice, amount, total: price * amount });
    }
  });
  return Array.from(aggregatedMap.values());
};

// Updated processOrderBookData function using aggregateData
const processOrderBookData = (data, tickSize = 0.01) => {
  // Aggregate the asks and bids
  const aggregatedAsks = aggregateData(data.asks, tickSize)
    .sort((a, b) => a.price - b.price)
    .slice(0, 15);
  const aggregatedBids = aggregateData(data.bids, tickSize)
    .sort((a, b) => b.price - a.price)
    .slice(0, 15);

  let totalAskVolume = 0;
  let totalBidVolume = 0;
  let maxAskTotal = 0;
  let maxBidTotal = 0;
  let bestAsk = Infinity;
  let bestBid = -Infinity;

  // Single pass to calculate totals and find best prices
  aggregatedAsks.forEach(ask => {
    totalAskVolume += ask.total;
    if (ask.total > maxAskTotal) maxAskTotal = ask.total;
    if (ask.price < bestAsk) bestAsk = ask.price;
  });

  aggregatedBids.forEach(bid => {
    totalBidVolume += bid.total;
    if (bid.total > maxBidTotal) maxBidTotal = bid.total;
    if (bid.price > bestBid) bestBid = bid.price;
  });

  const totalVolume = totalAskVolume + totalBidVolume;
  const askPercentage = totalVolume > 0 ? ((totalAskVolume / totalVolume) * 100).toFixed(2) : '0.00';
  const bidPercentage = totalVolume > 0 ? ((totalBidVolume / totalVolume) * 100).toFixed(2) : '0.00';

  postMessage({
    asks: aggregatedAsks,
    bids: aggregatedBids,
    maxAskTotal,
    maxBidTotal,
    askPercentage,
    bidPercentage,
    bestPrices: { bestAsk, bestBid },
  });
};

onmessage = (e) => {
  processOrderBookData(e.data);
};
