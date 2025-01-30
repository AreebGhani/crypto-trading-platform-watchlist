import { models, sequelize } from "@b/db";
import { createError } from "@b/utils/error";

import {
  notFoundMetadataResponse,
  serverErrorResponse,
  unauthorizedResponse,
} from "@b/utils/query";
export const metadata: OperationObject = {
  summary: "Claims a specific referral reward",
  description: "Processes the claim of a specified referral reward.",
  operationId: "claimReward",
  tags: ["MLM", "Rewards"],
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: { type: "string", description: "Referral reward UUID" },
    },
  ],
  responses: {
    200: {
      description: "Reward claimed successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string", description: "Success message" },
            },
          },
        },
      },
    },
    401: unauthorizedResponse,
    404: notFoundMetadataResponse("Affiliate Reward"),
    500: serverErrorResponse,
  },
  requiresAuth: true,
};

export default async (data: Handler) => {
  const { params, user } = data;
  const { id } = params;

  if (!user?.id) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }

  await sequelize.transaction(async (transaction) => {
    const reward = await models.mlmReferralReward.findOne({
      where: { id, isClaimed: false },
      include: [{ model: models.mlmReferralCondition, as: "condition" }],
      transaction,
    });

    if (!reward) throw new Error("Reward not found or already claimed");

    if (reward.referrerId !== user.id) throw new Error("Unauthorized");

    const wallet = await models.wallet.findOne({
      where: {
        userId: user.id,
        currency: reward.condition.rewardCurrency,
        type: reward.condition.rewardWalletType,
      },
      transaction,
    });

    if (!wallet) throw new Error("Wallet not found");

    const newBalance = wallet.balance + reward.reward;
    await wallet.update({ balance: newBalance }, { transaction });
    await reward.update({ isClaimed: true }, { transaction });

    await models.transaction.create(
      {
        userId: user.id,
        walletId: wallet.id,
        type: "REFERRAL_REWARD",
        status: "COMPLETED",
        amount: reward.reward,
        description: `Claimed referral reward for ${reward.condition?.type}`,
        metadata: JSON.stringify({ rewardId: reward.id }),
      },
      { transaction }
    );
  });

  return { message: "Reward claimed successfully" };
};
