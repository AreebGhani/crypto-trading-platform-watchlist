


interface binaryOrderAttributes {
  id: string;

  userId: string;
  symbol: string;
  price: number;
  amount: number;
  profit: number;
  side: "RISE" | "FALL";
  type: "RISE_FALL";
  status: "PENDING" | "WIN" | "LOSS" | "DRAW" | "CANCELED";
  isDemo: boolean;
  closedAt: Date;
  closePrice?: number;
  createdAt?: Date;
  deletedAt?: Date;
  updatedAt?: Date;
}

type binaryOrderPk = "id";
type binaryOrderId = binaryOrder[binaryOrderPk];
type binaryOrderOptionalAttributes =
  | "id"
  | "isDemo"
  | "closePrice"
  | "createdAt"
  | "deletedAt"
  | "updatedAt";
type binaryOrderCreationAttributes = Optional<
  binaryOrderAttributes,
  binaryOrderOptionalAttributes
>;
