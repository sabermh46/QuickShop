import React from "react";
import "./product.css"
import { useNavigate, useLocation } from "react-router-dom";
import ProductCard from "./productCard";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addCategory } from "../../redux/actions";

const CategoriesList = ({data})=> {

    
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const handleCategoryClick = (category) => {

        // Check if currently on '/category' page
        if (location.pathname === '/category') {
            // Dispatch an action to add the category
            dispatch(addCategory(category));
        } else {
            // Navigate to the category page
            dispatch(addCategory(category));
            navigate('/category');
        }
    };

    return(
        <div className="CatList">
            {
                data.map((cat)=>{
                    return(
                        <div className="catsName" onClick={()=>{handleCategoryClick({id:cat.id, name: cat.attributes.name})}} key={cat.id}>{cat.attributes.name}</div>
                    )
                })
            }
        </div>
    )
}

export default CategoriesList