import React, {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import { API } from "../../constants/api";
import Loader from "../loader/loader";
import ProductCard from "../product/productCard";
import Header from "../Header/header";
import './showProductBycat.css'
import { useSelector } from "react-redux";
import CategoryPageHeader from "./CatHeader";
import axios from "axios";

const ShowProductbyCategories = () => {
    const katgory = useSelector((state) => state.category);
    console.log(katgory);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API}/api/products?populate=*`);
                setProducts(response.data.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        const fetchProductsByCategories = async () => {
            const categoryIds = katgory.selectedCategories.map(cat => cat.id);
            const filterParams = categoryIds.map(id => `filters[categories][id][$in]=${id}`).join('&');
            const api = `/api/products?${filterParams}&populate=*`;

            try {
                setLoading(true);
                const response = await axios.get(`${API}${api}`);
                setProducts(response.data.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        if (katgory.selectedCategories.length > 0) {
            fetchProductsByCategories();
        } else {
            fetchAllProducts();
        }
    }, [katgory.selectedCategories]);

    return (
        <div className="category">
            <Header />
            <CategoryPageHeader />
            {loading ? (
                <div>
                    <Loader />
                </div>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : (
                <div className="AllProducts">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <ProductCard key={product.id} id={product.id} />
                        ))
                    ) : (
                        <p>No products available</p>
                    )}
                </div>
            )}
            <div style={{height: 40 + 'px'}}></div>
        </div>
    );
};


export default ShowProductbyCategories