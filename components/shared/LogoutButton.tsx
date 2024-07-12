import React from "react";
import { Button } from "../ui/button";
import { logoutHandler } from "@/lib/serveractions";
import { IoMdLogOut } from "react-icons/io";

const LogoutButton = () => {
  return (
    <form action={logoutHandler}>
      <Button size={"icon"} className="rounded-full">
        <IoMdLogOut size="24px" />
      </Button>
    </form>
  );
};

export default LogoutButton;
