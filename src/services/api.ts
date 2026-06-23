


const BASE_URL = "https://api.escuelajs.co/api/v1";



export const getCategories = async () => {
  const res = await fetch(`${BASE_URL}/categories`);
  return res.json();
};




export const getProductById = async (
  id:string
) => {
  const res =await fetch(`${BASE_URL}/products/${id}`

  );
  return res.json();
}