import React from "react";
import Image from "next/image";
import chatLogo from "@/public/chat-logo_black.png";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gray-300 h-screen">
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="bg-white flex flex-col items-center text-center shadow-lg p-10 rounded-sm">
          <div>
            <Image src={chatLogo} alt="snapchat-logo" width={40} height={40} />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default layout;
