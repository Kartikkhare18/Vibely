import { Chat } from "@/models/chat.model";
import connectDataBase from "./db";

export const getMessage = async (
  loggedInUserId: string,
  otherUserId: string
) => {
  try {
    await connectDataBase();

    const chatMessage = await Chat.findOne({
      participants: { $all: [loggedInUserId, otherUserId] },
    }).populate({
      path: "messages",
      populate: {
        path: "senderId",
        model: "user",
        select: "fullname",
      },
    });
    if (!chatMessage) return [];
    return JSON.parse(JSON.stringify(chatMessage.messages));
  } catch (error) {
    console.log(error);
    throw error;
  }
};
