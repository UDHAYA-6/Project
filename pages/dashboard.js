import React, { useEffect } from "react";
import AdminBoard from "@/components/Dashboard/AdminBoard";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
const dashboard = () => {
  return (
    <div>
      <AdminBoard />
    </div>
  );
};

export default dashboard;
