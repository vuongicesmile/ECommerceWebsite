export const getAllProducts = () => {
  return fetch('https://dummyjson.com/products')
  .then(res => res.json())
  .then(json => console.log(json));
}

export const getProductsByCategory = (category = 'smartphones') => { 
 return fetch(`https://dummyjson.com/products/category/${category}`)
  .then(res => res.json())
  .then(console.log);

}