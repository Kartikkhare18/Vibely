import React from "react";
import LogoutButton from "./shared/LogoutButton";
import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SearchBar from "./Searchbar";
import Friends from "./Friends";

const LeftSidebar = async () => {
  const authUser = await auth();
  return (
    <div className="bg-white rounded-lg m-2 md:w-[25%] w-[50%] border-2 border-gray-300">
      <div className="p-4 bg-[#E3E6E8] flex items-center justify-between border-b border-gray-300 pb-3 rounded-t-lg">
        <div className="flex items-center gap-2">
          {authUser && (
            <>
              <Avatar>
                <AvatarImage src={authUser.user?.image!} alt="@shadcn" />
              </Avatar>
              <h1 className="font-medium">{authUser?.user?.name!}</h1>
            </>
          )}
        </div>
        <div>
          <LogoutButton />
        </div>
      </div>
      <div className="p-2 overflow-y-auto">
        <SearchBar />
        <Friends />
      </div>
    </div>
  );
};

export default LeftSidebar;
