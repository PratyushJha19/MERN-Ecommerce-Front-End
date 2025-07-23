import Layout from "../components/Layout/Layout";
import React, { useEffect, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import axios from "axios";

const OrderSuccess = () => {
  return (
    <Layout>
      <h1 className="text-center">Order Placed Successfully</h1>
    </Layout>
  );
};

export default OrderSuccess;
