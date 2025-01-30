// EVMDeposits.ts
import { IDepositMonitor } from "./IDepositMonitor";
import { getEcosystemToken } from "@b/utils/eco/tokens";
import { fetchEcosystemTransactions } from "@b/utils/eco/transactions";
import { chainConfigs } from "@b/utils/eco/chains";
import {
  initializeWebSocketProvider,
  initializeHttpProvider,
  chainProviders,
} from "../ProviderManager";
import { ethers } from "ethers";
import { processTransaction, createTransactionDetails } from "../DepositUtils"; // import utilities
import { storeAndBroadcastTransaction } from "@b/utils/eco/redis/deposit";

interface EVMOptions {
  wallet: walletAttributes;
  chain: string;
  currency: string;
  address: string;
  contractType: "PERMIT" | "NO_PERMIT" | "NATIVE";
}

export class EVMDeposits implements IDepositMonitor {
  private wallet: walletAttributes;
  private chain: string;
  private currency: string;
  private address: string;
  private contractType: "PERMIT" | "NO_PERMIT" | "NATIVE";

  constructor(options: EVMOptions) {
    this.wallet = options.wallet;
    this.chain = options.chain;
    this.currency = options.currency;
    this.address = options.address;
    this.contractType = options.contractType;
  }

  public async watchDeposits(): Promise<void> {
    let provider = chainProviders.get(this.chain);

    if (!provider) {
      provider = await initializeWebSocketProvider(this.chain);
      if (!provider) {
        provider = await initializeHttpProvider(this.chain);
      }
      if (!provider) return;
    }

    const feeDecimals = chainConfigs[this.chain].decimals;

    if (this.contractType === "NATIVE") {
      await this.watchNativeDeposits(provider, feeDecimals);
    } else {
      await this.watchTokenDeposits(provider, feeDecimals);
    }
  }

  private async watchNativeDeposits(provider: any, feeDecimals: number) {
    const decimals = chainConfigs[this.chain].decimals;
    let depositFound = false;
    let startTime = Math.floor(Date.now() / 1000);

    const verifyDeposits = async () => {
      if (depositFound) {
        return;
      }
      const transactions = await fetchEcosystemTransactions(
        this.chain,
        this.address
      );
      for (const tx of transactions) {
        if (
          tx.to &&
          tx.to.toLowerCase() === this.address.toLowerCase() &&
          Number(tx.timestamp) > startTime &&
          Number(tx.status) === 1
        ) {
          depositFound = true;
          try {
            const txDetails = await createTransactionDetails(
              "NATIVE",
              this.wallet.id,
              tx,
              this.address,
              this.chain,
              decimals,
              feeDecimals,
              "DEPOSIT"
            );
            await storeAndBroadcastTransaction(txDetails, tx.hash);
          } catch (error) {
            console.error(
              `Error processing native transaction: ${(error as Error).message}`
            );
          }
          startTime = Math.floor(Date.now() / 1000);
          break;
        }
      }
    };

    verifyDeposits();
    const intervalId = setInterval(verifyDeposits, 10000);
    const checkDepositFound = () => {
      if (depositFound) {
        clearInterval(intervalId);
      } else {
        setTimeout(checkDepositFound, 1000);
      }
    };
    checkDepositFound();
  }

  private async watchTokenDeposits(provider: any, feeDecimals: number) {
    const token = await getEcosystemToken(this.chain, this.currency);
    if (!token) {
      console.error(`Token ${this.currency} not found`);
      return;
    }

    const decimals = token.decimals;
    const filter = {
      address: token.contract,
      topics: [
        ethers.id("Transfer(address,address,uint256)"),
        null,
        this.address ? ethers.zeroPadValue(this.address, 32) : undefined,
      ],
    };

    let eventListener: any = null;
    const stopEventListener = () => {
      if (eventListener) {
        provider.off(filter, eventListener);
      }
    };

    eventListener = async (log) => {
      try {
        const success = await processTransaction(
          "PERMIT",
          log.transactionHash,
          provider,
          this.address,
          this.chain,
          decimals,
          feeDecimals,
          this.wallet.id
        );
        if (success) {
          setTimeout(stopEventListener, 30 * 60 * 1000); // Stop event listener after 30 minutes
        }
      } catch (error) {
        console.error(
          `Error in token deposit handler: ${JSON.stringify(error)}`
        );
      }
    };

    provider.on(filter, eventListener);

    provider.on("error", (error) => {
      console.error(`Provider error: ${JSON.stringify(error)}`);
    });
  }
}
