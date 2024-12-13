import React, { useEffect, useState } from "react";
import Products from "../../../components/Products";
import { useFetch } from "../../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { request } from "../../../api";
import { useSelector } from "react-redux";

const ManageProduct = () => {
  const navigate = useNavigate();
  const { data, loading } = useFetch("/product/get");
  const [product, setProduct] = useState([]);
  const token = useSelector((s) => s.token.value);

  const fetchProducts = () => {
    request
      .get("/product/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setProduct(res.data.products))
      .catch((error) => console.error("Error fetching product:", error));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      request
        .delete(`/product/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          console.log("Product deleted successfully.");
          fetchProducts();
        })
        .catch((error) => console.error("Error deleting product:", error));
    }
  };
  return (
    <div>
      {loading && <p>Loading...</p>}
      <Products isAdmin={true} data={data} />
    </div>
  );
};

export default ManageProduct;
