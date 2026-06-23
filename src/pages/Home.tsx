import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

import "../styles/HomePage.css";


//product interface hai

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
}


function Home () {

  //storing the product data
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading,setLoading]=useState(false);

  //router hooks
  const location =useLocation();
  const navigate = useNavigate();

  //get query parameters
  const params = new URLSearchParams(location.search);
  const category = params.get("category") || "";
  const sort = params.get("sort")|| "";

  //cart contex
  const context =useContext(CartContext);
  const addToCart = context?.addToCart;


  //fetch all categories data
  useEffect(() => {

    fetch("https://api.escuelajs.co/api/v1/categories")
    .then((res)=>res.json())
    .then((data)=>setCategories(data))
    .catch((err)=>console.log(err));
  },[]);


 

  
  // fetech products basd on cat and sort it

  useEffect(() => {
    const fetchProducts = async () => {
    setLoading(true);

    try {
      let url ="https://api.escuelajs.co/api/v1/products";
       
       if(category) 
        {
          url = `https://api.escuelajs.co/api/v1/categories/${category}/products`;
        }

        const res = await fetch(url);
        const data = await res.json();

        //sort by price low to high
        if(sort==="asc")
        {
          data.sort((a:any,b:any)=>
            a.price-b.price);
        }

        //sort by price high to low
        if(sort==="desc")
        {
          data.sort((a:any,b:any)=>
          b.price-a.price
          );

        }
      setProducts(data);

    } catch(error) {
      console.log(error);
    }

    setLoading(false);

    };

    fetchProducts();
  },[category,sort]);



const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {

  const newParams = new URLSearchParams(location.search);

  if(e.target.value) {
    newParams.set("category",e.target.value);

  }
  else {
     newParams.delete("category");

  }

  navigate(`/?${newParams.toString()}`);
};


const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const newParams = new URLSearchParams(location.search);

  if (e.target.value) {
    newParams.set("sort", e.target.value);
  } else {
    newParams.delete("sort");
  }

  navigate(`/?${newParams.toString()}`);
};

  return(

    <>
    <div className="homePage">
      <h1>Products</h1>
       <div>
         <Link to="/cart">
          <button>Go To Cart</button>
         </Link>

       </div>
      <div className="filterBox">
        <select value={category} onChange={handleCategory}>
          <option value="">All Categories</option>

          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
         ) )

          }

        </select>

         <select value={sort} onChange={handleSort}>
          <option value={""}>Sort</option>
          <option value="asc">Low To High</option>
          <option value="desc">High To Low</option>
         </select>

      </div>

      {loading ? (
        <h2 className="loading">Loading...</h2>

      ):(

        <div className="productContainer">
          {products.map((product) => (
          <div key={product.id} className="productCard">
            <img
            src={product.images?.[0]}
            alt={product.title}
            />

            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p>

                <Link to={`/product/${product.id}`} >View Details</Link>   
                
                 <button onClick={() =>{if(addToCart) {addToCart(product)}}}>Add To Cart</button>

          </div>

          ))}
        </div>
      )}
    </div>
    </>
  );

}

export default Home;
