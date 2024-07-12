"use client";
import { Loader2 } from "lucide-react";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useParams } from "next/navigation";
import { deleteChatMessages } from "@/lib/serveractions";
import { useFormState, useFormStatus } from "react-dom";

const ChatTopbar = ({ userProfile }: { userProfile: any }) => {
  const { id } = useParams<{ id: string }>();
  const deleteChatHandler = deleteChatMessages.bind(null, id);

  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link
          href={"/chat"}
          className="p-2 cursor-pointer bg-[#E3E6E8] hover:bg-[#c7cacb] rounded-full"
        >
          <IoIosArrowBack size="24px" />
        </Link>
        <div className="flex items-center gap-1 text-lg">
          <Avatar>
            <AvatarImage
              src={userProfile?.profilePhoto}
              alt="user-profile-photo"
            />
          </Avatar>
          <h1 className="font-bold">{userProfile?.fullname}</h1>
        </div>
      </div>
      <form action={deleteChatHandler}>
        <SubmitButton />
      </form>
    </div>
  );
};

export default ChatTopbar;

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button variant="destructive">
      {!pending ? (
        "Clear Chat"
      ) : (
        <Button variant={"destructive"}>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Clearing...
        </Button>
      )}
    </Button>
  );
};
