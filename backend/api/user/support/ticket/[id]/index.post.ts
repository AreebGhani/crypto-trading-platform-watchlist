// /server/api/support/tickets/index.post.ts

import { models } from "@b/db";
import { sendMessageToRoute } from "@b/handler/Websocket";
import { createError } from "@b/utils/error";

import { updateRecordResponses } from "@b/utils/query";
export const metadata: OperationObject = {
  summary: "Reply to a support ticket",
  description: "Reply to a support ticket identified by its UUID.",
  operationId: "replyTicket",
  tags: ["Support"],
  requiresAuth: true,
  parameters: [
    {
      index: 0,
      name: "id",
      in: "path",
      required: true,
      description: "The UUID of the ticket to reply to",
      schema: { type: "string" },
    },
  ],
  requestBody: {
    description: "The message to send",
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            type: {
              type: "string",
              enum: ["client", "agent"],
            },
            time: {
              type: "string",
              format: "date-time",
            },
            userId: {
              type: "string",
            },
            content: {
              type: "string",
            },
            attachment: {
              type: "string",
            },
          },
          required: ["type", "time", "userId"],
        },
      },
    },
  },
  responses: updateRecordResponses("Support Ticket"),
};

export default async (data: Handler) => {
  const { params, user, body } = data;
  const { id } = params;

  if (!user?.id) throw createError(401, "Unauthorized");

  // Fetch the ticket and validate existence
  const ticket = await models.supportTicket.findByPk(id, {
    include: [
      {
        model: models.user,
        as: "agent",
        attributes: ["avatar", "firstName", "lastName", "lastLogin"],
      },
    ],
  });
  if (!ticket) throw createError(404, "Ticket not found");

  // Check if the ticket is closed
  if (ticket.status === "CLOSED") {
    throw createError(403, "Cannot reply to a closed ticket");
  }

  // Validate message structure
  const { type, time, userId } = body;
  if (!type || !time || !userId) {
    throw createError(400, "Invalid message structure");
  }

  // Filter out irrelevant messages
  if (type !== "client" && type !== "agent") {
    throw createError(400, "Invalid message type");
  }
  if (userId !== user.id) {
    throw createError(403, "You are not authorized to send this message");
  }

  // Assign agent to the ticket if not already assigned
  if (!ticket.agentId && type === "agent") {
    ticket.agentId = user.id;
  }

  // Update ticket messages
  const messages: ChatMessage[] = Array.isArray(ticket.messages)
    ? ticket.messages
    : [];
  messages.push(body);
  ticket.messages = messages;

  // Update ticket status
  const status = type === "client" ? "REPLIED" : "OPEN";
  ticket.status = status;

  // Save the updated ticket
  await ticket.save();

  // Send update to WebSocket route
  sendMessageToRoute(
    `/api/user/support/ticket`,
    {
      id,
    },
    {
      method: "reply",
      data: {
        message: body,
        status,
        updatedAt: new Date(),
      },
    }
  );
};
