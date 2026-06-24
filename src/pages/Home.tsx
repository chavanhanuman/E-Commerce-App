import { useContext, useEffect, useState,useRef } from "react";
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

//i USE category interface to define structure of category object.
interface  Category{id:number;name:string};


function Home () {

  //storing the product data
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading,setLoading]=useState(false);

  //router hooks
  const location =useLocation();
  const navigate = useNavigate();

  //get query parameters
  const params = new URLSearchParams(location.search);

  //const category = params.get("category") || "";
  const sort = params.get("sort")|| "";
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [showCategories,setShowCategories] =useState(false);

  const selectedCategories = params.get("category")?.split(",")||[];
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


 


  useEffect(() => {
    const handleClickOutSide = (event:MouseEvent) => {
      
      if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node))
      {
        setShowCategories(false);
      }
    };
    document.addEventListener("mousedown",handleClickOutSide);

    return () => {
      document.removeEventListener("mousedown",handleClickOutSide);
    };
  },[]);

  
  // fetech products basd on cat and sort it

  useEffect(() => {
    const fetchProducts = async () => {
    setLoading(true);

    try {
      
      let data=[];
      if(selectedCategories.length>0){

        const requests = selectedCategories.map((categoryId)=>
        fetch(`https://api.escuelajs.co/api/v1/categories/${categoryId}/products`)
        .then((res)=>res.json())
      );
    const results = await Promise.all(requests);
    data=results.flat();
      } else {
        const res = await fetch("https://api.escuelajs.co/api/v1/products");

        data = await res.json();
      }
    

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

    } catch(error){
      console.log(error);
    }

    setLoading(false);

    };

    fetchProducts();
  },[location.search]);



  const handleCategory = (categoryId: number) => {

    const newParams = new URLSearchParams(location.search);
    let updatedCategories = [...selectedCategories];

    if(updatedCategories.includes(String(categoryId)))
    {
      updatedCategories=updatedCategories.filter((id) => id !==String(categoryId));
    }
    else
    {
      updatedCategories.push(String(categoryId));

    }


    if(updatedCategories.length>0) 
    {
      newParams.set("category",updatedCategories.join(","));

    }
    else 
      {
      newParams.delete("category");
    }
    navigate(`/?${newParams.toString()}`);
  };





const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const newParams = new URLSearchParams(location.search);

  if(e.target.value) 
  {
    newParams.set("sort", e.target.value);
  } 
  else
 {
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
       
       <div className="customDropDown" ref={dropdownRef}>
         
         <button type="button" className="dropdownBtn" onClick={() => setShowCategories(!showCategories)}>All Categories</button>
         
         {showCategories && (
          <div className="dropdownMenu">
            {categories.map((cat) =>(
              <label key={cat.id} className="categoryItem">
                <input type="checkbox" checked={selectedCategories.includes(String(cat.id))}
                onChange={() => handleCategory(cat.id)}
                />
                {cat.name}
              </label>
            ))}

          </div>
         )}
        </div>

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
