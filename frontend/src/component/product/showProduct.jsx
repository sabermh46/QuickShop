import React, { useState, useEffect } from "react";
import ProductCard from "./productCard";
import { API } from "../../constants/api";
import "./product.css"
import Loader from "../loader/loader";
import axios from "axios";
const ShowProduct = ()=>  {
    const [products, setProducts] = useState([]);
    const[loading, setLoading] = useState(null)
    const[error, setError] = useState(null)

    useEffect(() => {
        // Fetch products here
        const fetchProducts = async () => {
          try {
            // Set loading to true while fetching
            setLoading(true);
    
            // Simulate API call to fetch products
            const response = await axios(`${API}/api/products`);
            const data = await response.data;
            const arrayData = data.data
            console.log(arrayData);
            // Set products and loading to false
            setProducts(arrayData);
            setLoading(false);
          } catch (error) {
            // Set error and loading to false in case of an error
            setError(error);
            setLoading(false);
          }
        };
    
        // Call the fetchProducts function
        fetchProducts();
      }, []);

    return(
            error ? (
                <p>Error: {error.message}</p>
            ) : (
                <div className="AllProducts">
                    {Array.isArray(products) ? (
                        products.map((product) => (
                            <ProductCard key={product.id} id={product.id} />
                        ))
                    ) : (
                        <p>No products available</p>
                    )}
                    
                </div>
            )
    )
}

export default ShowProduct