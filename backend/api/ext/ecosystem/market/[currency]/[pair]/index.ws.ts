import { sendMessageToRoute } from "@b/handler/Websocket";
import { MatchingEngine } from "@b/utils/eco/matchingEngine";
import { getOrderBook } from "@b/utils/eco/scylla/queries";

export const metadata = {};

export default async (data: Handler, message) => {
  if (typeof message === "string") {
    message = JSON.parse(message);
  }

  const { params } = data;
  const { currency, pair } = params;
  const { type, interval } = message.payload;

  switch (type) {
    case "orderbook":
      const orderbook = await getOrderBook(`${currency}/${pair}`);

      sendMessageToRoute(
        `/api/ext/ecosystem/market/${currency}/${pair}`,
        { type: "orderbook" },
        {
          stream: "orderbook",
          data: orderbook,
        }
      );
      break;
    case "trades":
      sendMessageToRoute(
        `/api/ext/ecosystem/market/${currency}/${pair}`,
        { type: "trades" },
        {
          stream: "trades",
          data: [],
        }
      );
      break;
    case "ticker":
      const engine = await MatchingEngine.getInstance();
      const ticker = await engine.getTicker(`${currency}/${pair}`);
      sendMessageToRoute(
        `/api/ext/ecosystem/market/${currency}/${pair}`,
        { type: "ticker" },
        {
          stream: "ticker",
          data: ticker,
        }
      );
      break;
    default:
      break;
  }
};
