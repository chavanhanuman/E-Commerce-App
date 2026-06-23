import React, { useContext} from "react";
import { CartContext } from "../context/CartContext";

import { useNavigate } from "react-router-dom";
import "../styles/Cart.css";
const Cart = () => {
  //getcart context Data

  const context = useContext(CartContext);


  //navigate between pages

  const navigate =useNavigate();

//checking context availability

  if (!context) {
    return <h2>Cart Context Not Found</h2>;
  }

  //destructure cart data
  const {
    cartItems,
    removeFromCart,
    totalItems,
    totalPrice,
  } = context;

 

  return (
    <div className="cartPage">

      <h1 className="cartTitle">My Cart</h1>

      <div> 
        <button onClick={()=> navigate("/")}>Back To Home</button>
      </div>
     
      <div className="cartSummary">

        <h3>Total Items: {totalItems}</h3>
        <h3>Total Price: $ {totalPrice}</h3>
      
      </div>

      <div className="cartContainer">   
      {cartItems.length === 0 ? (
        <h2>Cart is Empty</h2>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="cartItem">
            
            <img
              src={item.images?.[0]} alt={item.title} className="cartImg"/>

            <div className="cartInfo">
            
              <h3>{item.title}</h3>

              <p className="cartPrice">$ {item.price}</p>

              <button onClick={() => removeFromCart(item.id)} className="removeBtn">Remove</button>
            </div>
          </div>
        ))
      )}
      </div>

      <footer className="cartFooter">
  Total Items: {totalItems} | Total Price: $ {totalPrice}
</footer>
    </div>
  );
};

export default Cart;