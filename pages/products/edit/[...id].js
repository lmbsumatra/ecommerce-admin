import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditProductPage() {
  const [productInfo, setProductInfo] = useState();
  const router = useRouter();
  const { id } = router.query;

  console.log("Router object:", router);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id=" + id).then((response) => {
      setProductInfo(response.data);
    });
  }, [id]);

  return (
    <Layout>
      <h1>Edit Product</h1> Product ID: {id}
      {productInfo && <ProductForm {...productInfo} />}
    </Layout>
  );
}
