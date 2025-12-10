import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'
import { addProduct } from '../../services/api'

const AddProduct = () => {

   const[image,setImage]=useState(false);
   const[productDetails,setProductDetails]=useState({
    name:"",
    image :"",
    category : "women",
    new_price : "",
    old_price :""
   })

   const imageHandler=(e)=>{
    setImage(e.target.files[0]);/*Image will be added in Image state*/
    // For JSON-Server, we'll use a local image path or base64
    // In a real app, you'd upload to a cloud service or use base64
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductDetails({...productDetails, image: reader.result});
      };
      reader.readAsDataURL(e.target.files[0]);
    }
   }

   const changeHandler=(e)=>{
    setProductDetails({...productDetails,[e.target.name]:e.target.value})
   }

  
   const Add_Product=async()=>
   {
    try {
      // Prepare product data
      const product = {
        name: productDetails.name,
        category: productDetails.category,
        new_price: parseFloat(productDetails.new_price),
        old_price: parseFloat(productDetails.old_price),
        image: productDetails.image || "/src/assets/product_1.png", // Default image if none selected
        available: true
      };

      // Add product using JSON-Server
      const result = await addProduct(product);
      
      if (result) {
        alert("Product Added Successfully!");
        // Reset form
        setProductDetails({
          name: "",
          image: "",
          category: "women",
          new_price: "",
          old_price: ""
        });
        setImage(false);
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert("Failed to add product. Please try again.");
    }
   }   
   

  return (
    <div className='add-product'>
      <div className='addproduct-itemfield'>
        <p>Product Title</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type Here' />
      </div>
      <div className='addproduct-price'>
      <div className='addproduct-itemfield'>
        <p>Price</p>
        <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type Here' />
      </div>
      <div className='addproduct-itemfield'>
        <p>Offer Price</p>
        <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type Here' />
      </div>
     </div>
     <div className='addproduct-itemfield'>
        <p>Product Category</p>
        <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
          <option value="women">Women</option>
          <option value="men">men</option>
          <option value="kids">kids</option>
        </select>
      </div>
        <div className="addproduct-itemfield">
          <label htmlFor="file-input">
            <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumbnail-img' alt=""></img>
          </label>
          <input onChange={imageHandler} type="file" name="image" id="file-input" hidden/>
        </div>
      <button onClick={()=>{Add_Product()}} className='addproduct-btn'>ADD</button>
    </div>
  )
}

export default AddProduct