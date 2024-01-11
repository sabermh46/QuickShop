import React, { useEffect, useState } from "react";
import './CatHeader.css'
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { removeCategory } from "../../redux/actions";
import axios from "axios";
import { API } from "../../constants/api";
import CategoriesList from "../product/categorieslist";

const CategoryName = ({category})=> {

    const dispatch = useDispatch();

    return (
        <div onClick={()=>{dispatch(removeCategory(category))}} key={category.id} className="categoryName">
            <p className="name">{category.name}</p>
            <div className="remove"></div>
        </div>
    )
}

const CategoryPageHeader = ()=> {

    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)

    const katgory = useSelector((state)=> state.category)
    const dispatch = useDispatch()
    console.log(katgory);

    const fetchCats = async ()=> {
        setLoading(true)
        try {
            const response = await axios.get(`${API}/api/categories`);
      
            const prod = response.data;
      
            // Display a success toast
            
            setCategories(prod.data)
            console.log(prod.data);
      
          } catch (error) {
      
            console.error('Login Error:', error);
          } finally {
            
            setLoading(false)
          }
        
    }

    useEffect(()=>{
        fetchCats()
    }, [])

    return (
        <div className="CategoryPageHeader flex space-between">
            
                <div className="f1">
                    <h2>All Categories</h2>
                    <div className="allCats flex g10">
                        {
                            <CategoriesList data={categories}/>
                        }
                    </div>
                </div>
                <div>
                <h2>Selected Categories</h2>
                    <div className="selectedCategories flex g10 f1">
                    {   katgory.selectedCategories.length != 0 ?
                        katgory.selectedCategories.map((cat)=>{
                            return(
                                <CategoryName key={cat.id} category={cat}/>
                            )
                        }) : <div className="categoryName"><div className="name">All &nbsp;</div></div>
                    }
                    </div>
                </div>
            
        </div>
    )
}

export default CategoryPageHeader