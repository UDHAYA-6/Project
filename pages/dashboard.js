import React, { useEffect } from "react";
import AdminBoard from "@/components/Dashboard/AdminBoard";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
const dashboard = () => {
  const router = useRouter();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/admin");
    }
  }, []);
  return (
    <div>
      <AdminBoard />
    </div>
  );
};

export default dashboard;
