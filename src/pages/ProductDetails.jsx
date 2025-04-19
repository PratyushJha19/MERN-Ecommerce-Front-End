import { useEffect, useState } from "react";
import React from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const navigate = useNavigate();

  // Initial Product Details
  useEffect(() => {
    if (params?.slug) {
      getProduct();
    }
  }, [params?.slug]);

  // get Product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.singleProduct);
      getSimilarProduct(
        data?.singleProduct._id,
        data?.singleProduct.category._id
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Get Related Product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="600px"
            width="350px"
          />
        </div>
        <div className="col-md-6 ">
          <h1 className="text-center">Product Details</h1>
          <h6>Name: {product.name}</h6>
          <h6>Description: {product.description}</h6>
          <h6>Price: ₹ {product.price}</h6>
          <h6>Name: {product.name}</h6>
          <h6>Category: {product?.category?.name}</h6>
          <button to="" class="btn btn-secondary ms-1">
            Add to Cart
          </button>
        </div>
      </div>

      <hr />

      {relatedProduct?.length > 0 && (
        <div className="row container">
          <h1>Similar Products</h1>
          <div className="d-flex flex-wrap">
            {relatedProduct?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 50)}</p>
                  <p className="card-text">₹ {p.price}</p>
                  <button
                    to=""
                    class="btn btn-primary ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button to="" class="btn btn-secondary ms-1">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ProductDetails;
