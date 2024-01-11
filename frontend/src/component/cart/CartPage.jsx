import React from "react";
import Header from "../Header/header";
import { useSelector } from "react-redux";

const CartPage = ()=>{
    const cartItems = useSelector((state)=>state.cart.items)
    console.log(cartItems);
    return (
        <div>
            <Header />
            <h1>Cart Page</h1>
            {
                cartItems.map((item, i)=>{
                    return(
                        <CartItem key={i} item={item} />
                    )
                })
            }
        </div>
    )
}

export default CartPage

const CartItem = ({item})=> {
    return (
        <div>
            productId {item.productId} <br />
            price {item.price} <br />
            quantity {item.quantity} <br />
            colorVariantId {item.colorVariantId} <br />
            sizeVariantId {item.sizeVariantId}
        </div>
    )
}