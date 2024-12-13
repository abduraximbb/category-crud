import React, { useEffect, useState } from "react";
import { request } from "@/api";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "./BackButton";

const CategoryCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState({ name: "", description: "" });
  const token = useSelector((s) => s.token.value);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      request
        .get(`/product-category/get/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setCategory(res.data))
        .catch((error) => console.error("Error fetching category:", error));
    }
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const endpoint = id
      ? `/product-category/update/${id}`
      : "/product-category/create";

    try {
      const response = await request({
        method: id ? "PATCH" : "POST",
        url: endpoint,
        data: category,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Category saved:", response.data);
      navigate("/admin/manage-category");
    } catch (err) {
      console.error(err);
      setError("Failed to save category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-900 via-blue-800 to-green-700 flex items-center justify-center text-white">
      <div className="bg-gray-900 text-white p-8 rounded-lg shadow-2xl w-full max-w-lg">
        <h2 className="text-3xl font-extrabold text-center mb-6">
          {id ? "Update Category" : "New Category"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
              type="text"
              name="name"
              placeholder="Category Name"
              value={category.name}
              onChange={(e) =>
                setCategory({ ...category, name: e.target.value })
              }
              required
            />
          </div>
          <div>
            <textarea
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
              name="description"
              placeholder="Category Description"
              rows="4"
              value={category.description}
              onChange={(e) =>
                setCategory({ ...category, description: e.target.value })
              }
              required
            ></textarea>
          </div>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <div className="flex justify-between items-center">
            <BackButton />
            <button
              type="submit"
              disabled={loading}
              className={`py-2 px-4 rounded-lg text-white font-semibold transition duration-200 shadow-lg ${
                loading
                  ? "bg-green-500 opacity-50 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {loading ? "Saving..." : id ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryCreate;
