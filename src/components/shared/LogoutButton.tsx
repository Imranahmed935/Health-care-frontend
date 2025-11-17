"use client";



import { userLogout } from "@/services/auth/userLogout";
import { Button } from "../ui/button";

const LogoutButton = () => {
  const handleLogout = async () => {
    await userLogout();
  };
  return (
    <Button variant={"destructive"} onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;