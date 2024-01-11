import React, { useEffect, useState } from "react";
import Header from "../../Header/header";
import { useSelector } from "react-redux";
import axios from "axios";
import { API } from "../../../constants/api";
import ShowTheProduct from "./showTheProduct";
import ShowProduct from "../showProduct";
import Loader from "../../loader/loader";

const ProductDetails = ()=> {

    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState({})
    const [details, setDetails] = useState(null);

    const prodId = useSelector((state)=> state.product)

    const fetchProduct = async ()=> {
        setLoading(true)
        try {
            const response = await axios.get(`${API}/api/products/${prodId.selectedProductId}?populate=*`);
      
            const nextResponst = await axios.get(`${API}/api/products/${prodId.selectedProductId}?populate=cover,color_variants.color,color_variants.image,size_variants.size`);
            const prod = response.data;

            const variant = nextResponst.data;

            // console.log(variant);
            
            setProduct(prod.data)
            setDetails(variant.data)
            // console.log(prod.data);
      
          } catch (error) {
      
            console.error('Login Error:', error);
          } finally {
            
            setLoading(false)
          }
    }

    useEffect(()=> {
        fetchProduct()
    }, [prodId])

    return (
        <div>
            <Header/>
            {loading ? <Loader/> : product.attributes && product.attributes ? <ShowTheProduct pid={product.id} product={product.attributes} variants={details.attributes}/> : <ShowProduct />}
            <div style={{height: 40 + 'px'}}></div>
        </div>
    )
}


export default ProductDetails