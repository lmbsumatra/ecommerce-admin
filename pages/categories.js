import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Categories() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState("");
  
  useEffect(() => {
    function fetchCategories() {
      axios.get("/api/categories").then((result) => {
        setCategories(result.data);
      });
    }
    fetchCategories();
  }, []);

  async function saveCategory(event) {
    event.preventDefault();
    try {
      await axios.post("/api/categories", { name, parentCategory });
      setName("");
    } catch (error) {
      console.error("Error saving category:", error);
      // Display a user-friendly error message
      alert(
        "An error occurred while saving the category. Please try again later."
      );
    }
  }

  return (
    <Layout>
      <h1>Categories</h1>
      <label>New Category Name</label>
      <form onSubmit={saveCategory} className="flex gap-1">
        <input
          className="mb-0"
          type="text"
          placeholder={"Category Name"}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <select
          className="mb-0"
          value={parentCategory}
          onChange={(event) => setParentCategory(event.target.value)}
        >
          <option value="0">No Parent Category</option>
          {categories.length > 0 &&
            categories.map((category) => (
              <option value={category._id}>{category.name}</option>
            ))}
        </select>
        <button type={"submit"} className="btn-primary py-1">
          Save
        </button>
      </form>
      <table className="basic mt-4">
        <thead>
          <td>Category Name</td>
          <td>Parent Category</td>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category) => (
              <tr>
                <td>{category.name}</td>
                <td>{category?.parent?.name}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
