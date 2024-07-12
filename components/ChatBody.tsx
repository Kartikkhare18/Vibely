"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent } from "./ui/dialog";

const ChatBody = ({ messages, authUser }: { messages: any; authUser: any }) => {
  const [previewImage, setPreviewImage] = useState({ open: false, imgURL: "" });
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="flex-1 my-3 border-2 border-gray-300 overflow-y-auto p-2 rounded-lg">
      {messages.map((message: any, index: number) => {
        const ME = message.senderId._id == authUser.user?._id;
        const senderFullName = message.senderId?.fullname.toUpperCase();
        const isMessageImage = message.messageType === "image";
        const isPreviousMessageFromSameSender =
          index > 0 &&
          messages[index - 1].senderId._id === message.senderId._id;

        return (
          <div key={message._id} className="w-full">
            {!isPreviousMessageFromSameSender && (
              <p
                className={`font-bold mt-2 text-xs ${
                  ME ? "text-red-500" : "text-[#00b4d8]"
                } `}
              >
                {ME ? "ME" : senderFullName}
              </p>
            )}
            <div
              className={`border-l-2 ${
                ME ? "border-l-red-500" : "border-l-[#00b4d8]"
              }`}
            >
              <div className="flex items-center w-1/2 p-2 rounded-sm">
                {isMessageImage ? (
                  <div>
                    <Image
                      src={message.content}
                      width={80}
                      height={80}
                      className="h-auto w-auto object-cover cursor-pointer mix-blend-multiply"
                      alt="img"
                      onClick={() => {
                        setPreviewImage({
                          open: true,
                          imgURL: message.content,
                        });
                      }}
                    />
                  </div>
                ) : (
                  <p className="text-sm">{message.content}</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
      <Dialog
        open={previewImage.open}
        onOpenChange={() => setPreviewImage({ open: false, imgURL: "" })}
      >
        <DialogContent
          autoFocus={false}
          className="p-0 flex justify-center items-center"
        >
          {previewImage.imgURL && (
            <div className="relative">
              <Image
                className="border-2 border-white rounded-lg"
                src={previewImage.imgURL}
                alt={"img"}
                layout="responsive"
                width={500}
                height={500}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChatBody;
