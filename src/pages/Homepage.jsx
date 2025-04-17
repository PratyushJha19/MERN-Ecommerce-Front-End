import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { UseAuth } from "../context/auth";

const Homepage = () => {
  const [auth, setAuth] = UseAuth();
  return (
    <Layout title={"Nainika Couture - Shop now"}>
      <div className="row">
        <div className="col-md-3">
          <h6 className="text-center">Filter by category</h6>
        </div>
        <div className="col-md-9">
          <h1>All Products</h1>
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
