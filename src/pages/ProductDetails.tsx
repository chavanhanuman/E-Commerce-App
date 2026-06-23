import React, {useContext,useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

import { getProductById } from "../services/api";
import "../styles/ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] =useState<any>(null);

  const context = useContext(CartContext);

  const navigate = useNavigate();


 
   useEffect(() => {
    const fetchProduct =async () => {
      try {
        const data = await getProductById(id as string);

        setProduct(data);

      } catch(error) {
        console.log(error);
      }
    };
    fetchProduct();
   }, [id]);



  if (!context) {
    return <h2>Context Error</h2>;
  }

  const { addToCart } = context;

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <> 
    <div className="backSection">
      
      <button onClick={() => navigate("/")} > Back To Home</button>
    
    </div>

    <div className="productDetailsPage">
     
      <h1>{product.title}</h1>

      <img src={product.images?.[0]} alt={product.title} className="productImage" />

      <p>{product.description}</p>

      <h2>$ {product.price}</h2>

      <button className="addCartBtn" onClick={() => addToCart(product)} >Add To Cart</button>
    </div>
    </>
  );
};

export default ProductDetails;