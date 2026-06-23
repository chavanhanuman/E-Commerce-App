

import React,{createContext,useState,useEffect,} from "react";

//cart product structure

interface CartItem {
  id: number;
  title: string;
  price: number;
  images: string[];
}

//cart context data types

interface CartContextType {
  cartItems: CartItem[];

  addToCart: (product: CartItem) => void;

  removeFromCart: (id: number) => void;

  totalItems: number;

  totalPrice: number;
}

//create cart context
export const CartContext =
  createContext<CartContextType | null>(null);

  //provice props
interface Props {
  children: React.ReactNode;
}

//
const CartProvider = ({ children }: Props) => {

  //store cart products
 // const [cartItems, setCartItems] = useState<CartItem[]>(
  //  []
  //);

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
  const savedCart = localStorage.getItem("cart");

  return savedCart ? JSON.parse(savedCart) : [];
});

 
  //load cart data from local storage

  useEffect(() => {
    const savedCart =
      localStorage.getItem("cart");

    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // save cart data in local storage
  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  // Add product to cart

  const addToCart = (product: CartItem) => {
    const exists = cartItems.find((item) =>item.id===product.id);

    //check product already exists

    if(exists) {
      alert("This Product Already added your Cart!");
      return;
    }

    setCartItems((prev) => [...prev,product]);
    alert("Product Added Successfully");
  }

  // Remove product from cart

  const removeFromCart = (id: number) => {
    const updatedCart = cartItems.filter(
      (item) => item.id !== id
    );

    setCartItems(updatedCart);
  };

  // Count total products

  const totalItems = cartItems.length;

  // Calculte total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;