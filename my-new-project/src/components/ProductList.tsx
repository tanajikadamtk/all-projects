import { useEffect, useState } from "react";
import { fetchProducts } from "../api/productApi";
interface Product {
    id: number;
    title: string;
    price: number;
    availabilityStatus?: string;
    stock?: number;
    reviews?: { reviewerName: string; comment: string; rating: number }[];
    images: string[] ;
  }

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        console.log(data)
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    // <div>
    //   <h2>Product List</h2>
    //   {loading && <p>Loading...</p>}
    //   {error && <p className="text-danger">Error: {error}</p>}
    //   {!loading &&
    //     !error &&
    //     products.map((item) => (
    //       <div key={item.id} style={{ marginBottom: "10px" }}>
    //         <p>
    //           <strong>{item.title}</strong> - ${item.price}
    //         </p>
    //       </div>
    //     ))}
    // </div>

    <div className="container">
      <h2>Product List</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">Error: {error}</p>}
      {!loading && !error && (
        <table  className="table table-bordered" border={1} cellPadding={10} cellSpacing={0} style={{ width: "100%", textAlign: "left" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Images</th>
              <th>Price ($)</th>
              <th>Availability</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td><img style={{width:"170px", height:"170px"}} src={item.images[0]} alt="images" /></td>
                <td>{item.price.toFixed(2)}</td>
                <td
                  style={{
                    color: item.availabilityStatus === "In Stock" ? "green" : "red",
                  }}
                >
                  {item.availabilityStatus || "N/A"}
                </td>
                <td>{item.stock ?? "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;
