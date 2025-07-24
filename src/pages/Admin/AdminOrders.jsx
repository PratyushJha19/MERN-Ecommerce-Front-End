import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { UseAuth } from "../../context/auth";
import { Select } from "antd";

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Processed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);

  const { Option } = Select;
  const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = UseAuth();
  const navigate = useNavigate();

  const getAllOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/all-orders`
      );
      setOrders(data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getAllOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`,
        { status: value }
      );
      getAllOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="Admin - Orders">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
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
                      <td>
                        <Select
                          bordered="true"
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
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
    </Layout>
  );
};

export default AdminOrders;
