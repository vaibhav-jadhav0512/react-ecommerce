import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import AdminProductCards from "../../../components/cards/AdminProductCards";
import { getProducts } from "../../../functions/product";

const AllProducts = () => {
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setloading(true);
    getProducts(1, 10)
      .then((res) => {
        setproducts(res.data);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>All Products</h4>
          )}
          <div className="row">
            {products.map((p) => (
              <div className="col-md-4" key={p.slug}>
                <AdminProductCards product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
