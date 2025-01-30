import { getActiveCustodialWallets } from "@b/utils/eco/custodialWallet";
import { createError } from "@b/utils/error";
import { ecosystemCustodialWalletAttributes } from "@db/ecosystemCustodialWallet";
import {
  isAddressLocked,
  lockAddress,
  unlockExpiredAddresses,
} from "../../wallet/utils";

import {
  notFoundMetadataResponse,
  serverErrorResponse,
  unauthorizedResponse,
} from "@b/utils/query";

export const metadata: OperationObject = {
  summary: "Fetches a deposit address for a specific blockchain",
  description:
    "Retrieves an available custodial wallet address for deposits on the specified blockchain.",
  operationId: "getDepositAddress",
  tags: ["Wallet", "Deposit"],
  parameters: [
    {
      name: "chain",
      in: "path",
      required: true,
      schema: {
        type: "string",
        description: "Blockchain chain to fetch the deposit address for",
      },
    },
  ],
  responses: {
    200: {
      description: "Deposit address fetched successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              address: {
                type: "string",
                description: "Custodial wallet deposit address",
              },
            },
          },
        },
      },
    },
    401: unauthorizedResponse,
    404: notFoundMetadataResponse("Wallet"),
    500: serverErrorResponse,
  },
};

export default async (data: Handler) => {
  const { params, user } = data;
  if (!user?.id) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }

  await unlockExpiredAddresses();

  try {
    const { chain } = params;
    const wallets = await getActiveCustodialWallets(chain);
    const availableWallets: ecosystemCustodialWalletAttributes[] = [];

    for (const wallet of wallets) {
      if (!(await isAddressLocked(wallet.address))) {
        availableWallets.push(wallet);
      }
    }

    if (availableWallets.length === 0) {
      throw new Error("No available wallets");
    }

    const randomIndex = Math.floor(Math.random() * availableWallets.length);
    const selectedWallet = availableWallets[randomIndex];
    lockAddress(selectedWallet.address);
    return selectedWallet.address;
  } catch (error) {
    throw new Error(`Failed to fetch deposit address: ${error.message}`);
  }
};
