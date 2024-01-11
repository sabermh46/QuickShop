import { useSelector } from 'react-redux';

export function IsItemInCart (productId, colorVariantId, sizeVariantId) {
    const items = useSelector(state => state.cart.items);
    const item = items.find(item => 
        item.productId === productId 
        && item.colorVariantId === colorVariantId 
        && item.sizeVariantId === sizeVariantId
    );
    return item ? item.quantity : 0;
};

const IsProductInCart = (productId) => {
  const items = useSelector(state => state.cart.items);
  const productInCart = items.some(item => item.productId === productId);
  return productInCart;
};

export const addCategory = (category) => ({
    type: 'ADD_CATEGORY',
    payload: category
  });
  
  export const removeCategory = (category) => ({
    type: 'REMOVE_CATEGORY',
    payload: category
  });
  
  export const filterProductsByCategory = () => ({
    type: 'FILTER_PRODUCTS_BY_CATEGORY'
  });

  export const setCurrentProductId = (id) => ({
    type: 'SET_PRODUCT_ID',
    payload: id
  })
  
export const setAddressBook = (id)=> ({
  type: 'ADBOOK_ID',
  payload: id
})