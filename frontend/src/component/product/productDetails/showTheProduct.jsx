import React, { useEffect, useState } from "react";
import './showProduct.css'
import { API } from "../../../constants/api";
import { formatBDTPrice } from "../productCard";
import ProductRating from "../productRating/manageRating";
import RatingReview from "../productRating/RatingNReview";
import SwiperGallery from "./SwiperGallery";
import { useDispatch, useSelector } from "react-redux";
import { IsItemInCart } from "../../../redux/actions";
import ColorVariantsGallery from "./variantGallery";

const ShowTheProduct = ({product, variants, pid})=> {

    const cart = useSelector((state)=>state.cart)
    const dispatch = useDispatch()
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [covers, setCovers] = useState();
    const [selectedColorVariant, setSelectedColorVariant] = useState(null);
    const [selectedSizeVariant, setSelectedSizeVariant] = useState(null);
    const [price, setPrice] = useState(variants.price)
    const [productColorVariants, setProductColorVariants] = useState([])
    const scvId = selectedColorVariant && selectedColorVariant.id ? selectedColorVariant.id : 0
    const svId = selectedSizeVariant && selectedSizeVariant.id ? selectedSizeVariant.id : 0
    const [showCounter, setShowCounter] = useState(false)
    const [inCartQuantity, setInCartQuantity] = useState(0)

    console.log(cart.items);
    
    const coverImageUrl = variants.cover.data.attributes.url;
    const initialPrice = variants.price

    const colorVariantImages = variants.color_variants.data.map(colorVariant => {
        const colorVariantImage = colorVariant.attributes.image.data;
        return colorVariantImage.attributes.url;
    });

    const colorVariants = variants.color_variants.data.map((variant)=>{
        const thumbImage = variant.attributes.image.data.attributes.formats.thumbnail.url
        return {
            id: variant.id,
            hex: variant.attributes.color.data.attributes.hex,
            name: variant.attributes.color.data.attributes.name,
            additionalPrice: variant.attributes.additionalPrice,
            thumbImage: API + thumbImage,
          };
    })

    const handleSelectVariant = (variant) => {
        setSelectedColorVariant(variant);
        setPrice((prevPrice) => initialPrice + variant.additionalPrice);
        // Handle other actions related to the selected color
      };

    console.log(colorVariants);
    const allImages = [coverImageUrl, ...colorVariantImages];

    

    useEffect(() => {
        setCovers(allImages);
        setProductColorVariants(colorVariants);
    
        // Find the item in the cart
        const itemInCart = cart.items.find(item => 
            item.productId === pid &&
            item.colorVariantId === scvId &&
            item.sizeVariantId === svId
        );
    
        if (itemInCart) {
            console.log(itemInCart);
            setInCartQuantity(itemInCart.quantity)
            setShowCounter(true); // Assuming you want to show the counter if the item is in the cart
        } else {
            setShowCounter(false);
            setInCartQuantity(0)
        }
    }, [selectedColorVariant, cart, scvId, svId, pid]);


    return(
        <div className="theProduct">
            <div>
                <div className="flex g20">
                    <div className="image">
                        {covers && <SwiperGallery images={covers}/>}
                    </div>
                    <div className="info f1">
                        <h1 className="productTitle">{product.title}</h1>
                        <div className="flex x-center space-between g20">
                            <div>
                                <p className="price">{ formatBDTPrice(price)} ৳</p>
                                <p className="instock">In Stock: { product.instock }</p>
                            </div>

                            {
                                !showCounter ? 
                                <button onClick={
                                    ()=>{
                                        dispatch({
                                            type: "ADD_TO_CART",
                                            payload: {
                                                productId: pid,
                                                colorVariantId: scvId,
                                                sizeVariantId: svId,
                                                price: price,
                                            }
                                        })
                                    }
                                } className="fUllAddToCart">ADD TO CART</button>
                                : <div className="inCartBtn flex">
                                    <div  className="decrement f2">
                                        <button onClick={()=>{
                                            dispatch({
                                                type: "DECREASE_BY_ONE",
                                                payload: {
                                                    productId: pid,
                                                    colorVariantId: scvId,
                                                    sizeVariantId: svId,
                                                }
                                            })
                                        }}>-</button>
                                    </div>
                                    <p className="quantity f3">{inCartQuantity}</p>
                                    <div className="increment f2">
                                        <button onClick={
                                            ()=>{
                                                dispatch({
                                                    type: "ADD_TO_CART",
                                                    payload: {
                                                        productId: pid,
                                                        colorVariantId: scvId,
                                                        sizeVariantId: svId,
                                                        price: price,
                                                    }
                                                })
                                            }
                                        }>+</button>
                                    </div>
                                </div>
                            }

                        </div>
                        <ProductRating rating={product.product_ratings.data}/>

                        <ColorVariantsGallery selectedVariant={selectedColorVariant} onSelectVariant={handleSelectVariant} variants={productColorVariants}/>
                    </div>
                </div>
                <div>
                    <RatingReview ratingInfos={product.product_ratings.data}/>
                    extra informations
                </div>
            </div>
        </div>
    )
}

export default ShowTheProduct