import React, { useState, useEffect } from "react";
import axios from "axios";
import { UseAuth } from "../../context/auth";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = UseAuth();
  const navigate = useNavigate();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/orders`
      );
      setOrders(data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title="User Orders">
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>All orders</h1>
            <div className="border shadow">
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Status</th>
                    <th scope="col">Buyer</th>
                    <th scope="col">Order Date</th>
                    <th scope="col">Payment</th>
                    <th scope="col">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((o, i) => (
                    <>
                      <tr key={o._id}>
                        <th>{i + 1}</th>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).fromNow()}</td>
                        <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                      <tr>
                        <td colSpan="6">
                          {o?.products?.map((p) => (
                            <div
                              key={p._id}
                              className="row mb-3 p-2 shadow-sm border rounded align-items-center"
                            >
                              {/* Image Section */}
                              <div className="col-md-3 text-center">
                                <img
                                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                  alt={p.name}
                                  className="img-fluid rounded"
                                  style={{
                                    height: "150px",
                                    objectFit: "cover",
                                  }}
                                />
                              </div>

                              {/* Text + Button Section */}
                              <div className="col-md-9">
                                <div className="d-flex align-items-center justify-content-start gap-3">
                                  <div>
                                    <h5>{p.name}</h5>
                                    <p className="mb-1">Price: ₹{p.price}</p>
                                    <p className="text-muted small mb-0">
                                      {p.description.substring(0, 150)}...
                                    </p>
                                  </div>
                                  <div>
                                    <button
                                      className="btn btn-primary"
                                      onClick={() =>
                                        navigate(`/product/${p.slug}`)
                                      }
                                    >
                                      More Info
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
