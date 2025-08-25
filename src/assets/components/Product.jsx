import FetchApi from "./Custom-Hook/FetchApi";


const Product = () => {
 
  let {fetchData} = FetchApi("https://fakestoreapi.com/products")
  return (
    <div className="productContent">
      <h1>Product Items : {fetchData.length} </h1>
    </div>
  );
};

export default Product;
