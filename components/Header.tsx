import Image from "next/image";
import React from "react";
import Link from "next/link";
import MyAiPhoto from "@/public/myai-asset.png";
import { Button } from "./ui/button";
import { FaLaptop } from "react-icons/fa";
import { auth } from "@/auth";
import { AiOutlineMessage } from "react-icons/ai";

const Header = async () => {
  const authUser = await auth();
  console.log(authUser);
  return (
    <div className="flex justify-between items-center max-w-6xl mx-auto">
      <div>
        <h1 className="text-7xl font-medium">
          Vibely is <br /> now on the <br /> web!
        </h1>
        <h1 className="my-5 text-xl ">
          Chat, Vibe, and video call your friends from <br /> wherever you are.
        </h1>
        {authUser ? (
          <Link href={"/chat"}>
            <Button className="rounded-full gap-2">
              <AiOutlineMessage size="24px" /> <span>Start chat</span>{" "}
            </Button>
          </Link>
        ) : (
          <Link href={"/login"}>
            <Button className="rounded-full gap-2">
              <FaLaptop /> <span>Login to chat</span>{" "}
            </Button>
          </Link>
        )}
      </div>

      <div className="hidden md:block">
        <Image src={MyAiPhoto} width={650} height={650} alt="myai" />
      </div>
    </div>
  );
};

export default Header;
