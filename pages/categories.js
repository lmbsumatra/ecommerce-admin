import Layout from "@/components/Layout";

export default function Categories() {
  return (
    <Layout>
      <h1>Categories</h1>
      <label>New Category Name</label>
      <div className="flex gap-1">
        <input className="mb-0" type="text" placeholder={"Category Name"} />
        <button className="btn-primary py-1">Save</button>
      </div>
    </Layout>
  );
}
