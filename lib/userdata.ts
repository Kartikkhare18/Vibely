import { Message, MessageDocument } from "@/models/message.model";
import { User, UserDocument } from "@/models/user.model";
import connectDataBase from "./db";
import { Chat } from "@/models/chat.model";

export const getSidebarUsers = async (loggedInUserId: string) => {
  try {
    const otherUsers = await User.find({ _id: { $ne: loggedInUserId } });
    const userInfo = await Promise.all(
      otherUsers.map(async (user) => {
        const lastMessage = await Message.findOne({
          $or: [
            { senderId: user._id, receiverId: loggedInUserId },
            { senderId: loggedInUserId, receiverId: user._id },
          ],
        })
          .sort({ createdAt: -1 })
          .populate("senderId", "fullname profilePhoto _id")
          .populate("receiverId", "fullname profilePhoto _id")
          .exec();

        return {
          _id: user._id,
          participants: [user],
          lastMessage: lastMessage
            ? {
                ...lastMessage.toJSON(),
                senderId: lastMessage.senderId,
                receiverId: lastMessage.receiverId,
              }
            : null,
        };
      })
    );
    return userInfo;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getMessages = async (
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
        model: "User",
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

export const getprofileUser = async (userId: string) => {
  try {
    await connectDataBase();
    const user: UserDocument | null = await User.findOne({ _id: userId });
    if (!user) {
      return "User not found";
    }
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log(error);
    throw error;
  }
};
