import React from 'react'
import './ListProduct.css'
import { useEffect,useState } from 'react'
import cross_icon from '../../assets/cross_icon.png'
import { getAllProducts, removeProduct } from '../../services/api'


const ListProduct = () => {

   
  const[allproducts,setAllProducts]=useState([]);
  
  const fetchInfo=async()=>{
    try {
      const data = await getAllProducts();
      setAllProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Don't show alert, just log error - page will still load
      setAllProducts([]); // Set empty array so page doesn't break
    }
  }
  
  useEffect(()=>{
    fetchInfo();
  },[])/*[] is kept to run it only once*/

  
  const remove_product = async(id)=>{
    try {
      await removeProduct(id);
      alert('Product removed successfully');
      await fetchInfo(); // Refresh the list
    } catch (error) {
      console.error('Error removing product:', error);
      alert('Failed to remove product');
    }
  }


  return (
    <div className='list-product'>
         <h1>All Products List</h1>
         <div className="listproduct-format-main">
          <p>Products</p>
          <p>Title</p>
          <p>Old price</p>
          <p>New Price</p>
          <p>Category</p>
          <p>Remove</p>
         </div>
         <div className="listproduct-allproducts">
          <hr/>
             {allproducts.map((product,index)=>{
               return <><div key ={index} className="listproduct-format-main listproduct-format">
                 <img src={product.image} alt="" className="listproduct-product-icon" />
                 <p>{product.name}</p>
                 <p>${product.old_price}</p>
                 <p>${product.new_price}</p>
                 <p>{product.category}</p>
                 <img onClick={()=>{remove_product(product.id)}} src={cross_icon} alt="" className='listproduct-remove-icon' />
               </div>
               <hr/>
               </>
             })}
         </div>
    </div>
  )
}

export default ListProduct