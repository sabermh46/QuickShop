
// Action Types
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const CHECK_ITEM_IN_CART = 'CHECK_ITEM_IN_CART';
const DECREASE_BY_ONE = 'DECREASE_BY_ONE';

// Initial State
const initialState = {
    items: [],
    grandTotal: 0,
    totalItemCount: 0
};

// Helper Functions
const updateGrandTotal = (items) => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

const updateTotalItemCount = (items) => {
    return items.reduce((count, item) => count + item.quantity, 0);
};

// Reducer
const cartReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_TO_CART:
            const newItem = action.payload;
            const existingItemIndex = state.items.findIndex(
                item => item.productId === newItem.productId 
                    && item.colorVariantId === newItem.colorVariantId 
                    && item.sizeVariantId === newItem.sizeVariantId
            );

            let updatedItems;
            if (existingItemIndex >= 0) {
                // Clone the item and increment its quantity
                const updatedItem = {
                    ...state.items[existingItemIndex],
                    quantity: state.items[existingItemIndex].quantity + 1
                };

                // Clone the entire array and update the item
                updatedItems = [...state.items];
                updatedItems[existingItemIndex] = updatedItem;
            } else {
                // Item does not exist, so add it
                updatedItems = [...state.items, { ...newItem, quantity: 1 }];
            }

            return {
                ...state,
                items: updatedItems,
                grandTotal: updateGrandTotal(updatedItems),
                totalItemCount: updateTotalItemCount(updatedItems)
            };

        case REMOVE_FROM_CART:
            const itemIdToRemove = action.payload;
            const updatedItemsAfterRemoval = state.items.filter(item => 
                item.productId !== itemIdToRemove.productId 
                || item.colorVariantId !== itemIdToRemove.colorVariantId 
                || item.sizeVariantId !== itemIdToRemove.sizeVariantId
            );
        
            return {
                ...state,
                items: updatedItemsAfterRemoval,
                grandTotal: updateGrandTotal(updatedItemsAfterRemoval),
                totalItemCount: updateTotalItemCount(updatedItemsAfterRemoval)
            };

        case CHECK_ITEM_IN_CART:
            const checkItem = action.payload;
            const itemInCart = state.items.find(item => 
                item.productId === checkItem.productId 
                && item.colorVariantId === checkItem.colorVariantId 
                && item.sizeVariantId === checkItem.sizeVariantId
            );
        
            return {
                ...state,
                isInCart: itemInCart ? itemInCart.quantity : 0
            };
        
        case DECREASE_BY_ONE:
            const itemToDecrease = action.payload;
            const existingItemIn = state.items.findIndex(
                item => item.productId === itemToDecrease.productId 
                        && item.colorVariantId === itemToDecrease.colorVariantId 
                        && item.sizeVariantId === itemToDecrease.sizeVariantId
            );

            let updatedIt = [...state.items];
            if (existingItemIn >= 0) {
                if (updatedIt[existingItemIn].quantity > 1) {
                    // Decrease quantity
                    updatedIt[existingItemIn] = {
                        ...updatedIt[existingItemIn],
                        quantity: updatedIt[existingItemIn].quantity - 1
                    };
                } else {
                    // Remove item if quantity becomes 0
                    updatedIt.splice(existingItemIn, 1);
                }
            }

            return {
                ...state,
                items: updatedIt,
                grandTotal: updateGrandTotal(updatedIt),
                totalItemCount: updateTotalItemCount(updatedIt)
            };

        default:
            return state;
    }
};

export default cartReducer;
