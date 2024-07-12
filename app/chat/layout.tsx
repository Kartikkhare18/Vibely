import ChatSidebar from "@/components/LeftSidebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen ">
      <ChatSidebar />
      {children}
    </div>
  );
};
export default Layout;
