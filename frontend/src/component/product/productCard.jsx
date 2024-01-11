import React, { useEffect, useState } from "react";
import { API } from "../../constants/api";
import "./product.css"
import CategoriesList from "./categorieslist";
import axios from "axios";
import Loader from "../loader/loader";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentProductId } from "../../redux/actions";
import CartButton from "./util/cartButton";

export function formatBDTPrice(number) {
    if (typeof number !== 'number') {
      // If the input is not a number, return an empty string or handle accordingly
      return '';
    }
  
    // Convert the number to a string
    const numString = number.toString();
  
    // Split the string into whole and decimal parts (if any)
    const [wholePart, decimalPart] = numString.split('.');
  
    // Add commas to the whole part in groups of three from the right
    const formattedWholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
    // If there is a decimal part, add a comma after the first two digits
    const formattedDecimalPart = decimalPart ? `.${decimalPart}` : '';
  
    // Combine the whole and decimal parts
    const formattedNumber = `${formattedWholePart}${formattedDecimalPart}`;
  
    return formattedNumber;
  }

const ProductCard = ({id})=> {

    const location = useLocation()
    const [coverImage, setCoverImage] = useState(null)
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const productClick =()=> {
        dispatch(setCurrentProductId(id))
        if(location.pathname !== '/product'){
            navigate('/product')
        }
    }
    
    
    function fetchProductData(product) {
            console.log('Product Id: '+ product.attributes.cover);
        if(product.attributes.cover.data){
            setCoverImage(product.attributes.cover.data.attributes.url)
            console.log(product.attributes.cover.data.attributes.url);
        }
        if(product.attributes.categories.data){
            setCategories(product.attributes.categories.data)
            console.log(product.attributes.categories.data);
        }
    }

    const fetchProduct = async ()=> {
        setLoading(true)
        try {
            const response = await axios.get(`${API}/api/products/${id}?populate=*`);
      
            const prod = response.data;
      
            // Display a success toast
            
            setProduct(prod.data)
            console.log(prod.data);
            fetchProductData(prod.data)
      
          } catch (error) {
      
            console.error('Login Error:', error);
          } finally {
            
            setLoading(false)
          }
        
    }

    useEffect(()=>{
        fetchProduct()
        
    }, []);

    
    return(
        loading ? <div className="productCard">
            <Loader />
        </div> :
        <div className="productCard">
            <div className="img">
                {product.attributes != null ? <img src={API+coverImage} alt={product.attributes.title} /> : <h2 style={{textAlign: "center", color: "gray", paddingTop: 100 + 'px'}}>NO PHOTO</h2>}
            </div>
            <div className="info">
                <CategoriesList data={categories}/>
                <h3 onClick={()=>productClick()} className="title hover-effect">{product.attributes && product.attributes.title ? product.attributes.title : 'No title'}</h3>
                <div className="flex x-center space-between g20 pd-y-10">
                    <div>
                        <p className="price">{product.attributes && product.attributes.price ? formatBDTPrice(product.attributes.price) : 'no price'} ৳</p>
                        <p className="instock">In Stock: {product.attributes && product.attributes.instock ? product.attributes.instock : 'No stock'}</p>
                    </div>
                    <CartButton />
                </div>
                
                <p className="desc">{product.attributes && product.attributes.desc ? product.attributes.desc : 'no desc'}</p>
                
                <p className="vendor">From: {product.attributes && product.attributes.vendor.data ? product.attributes.vendor.data.attributes.shopname : 'QuickShop'}</p>
            </div>
        </div>
    )
}

export default ProductCard