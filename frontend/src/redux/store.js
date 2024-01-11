
import { configureStore} from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import cartReducer from './cartReducer';

const initialUserState = {
    id: null,
    addressBook: undefined,
    username: null,
    jwt: null,
    tokenExpiration: null,
  };

  const initialCatState = {
    selectedCategories: [],
    filteredProducts: []
  };

  const initialProductDetailsState = {
    selectedProductId: 0
  }






const userReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case 'LOGIN':
            console.log(action.payload);
            return {
                username: action.payload.username,
                jwt: action.payload.jwt,
                tokenExpiration: action.payload.tokenExpiration,
                id: action.payload.id,
            };
        case 'ADBOOK_ID':
            console.log("Action: "+action.payload);
            return{
              ...state,
              addressBook: action.payload
            }
    
        case 'LOGOUT':
            // Clear user data from local storage
            localStorage.removeItem('user');
            return initialUserState;
        case 'LOAD_USER':
            return action.payload;
        default:
            // Check for token expiration and auto-logout
            if (state.jwt && parseInt(new Date().getTime()) > state.tokenExpiration) {
                return initialUserState;
            }
            return state;
    }
}

const filterLogic = (selectedCategories, allProducts) => {
    if (selectedCategories.length === 0) {
      return allProducts; // If no categories are selected, return all products.
    }
  
    return allProducts.filter(product => {
      // Check if the product's categories intersect with the selected categories.
      const productCategories = product.categories || [];
      return productCategories.some(category => selectedCategories.includes(category.id));
    });
  };

 export function areObjectsEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }


const categoryReducer = (state = initialCatState, action) => {
    switch (action.type) {
        case 'ADD_CATEGORY':
          // Check if a category with similar properties already exists before adding
          if (!state.selectedCategories.some(cat => areObjectsEqual(cat, action.payload))) {
            // Add category and filter products
            return {
              ...state,
              selectedCategories: [...state.selectedCategories, action.payload],
            };
          }
          // If a similar category already exists, return the current state
          return state;
      
        case 'REMOVE_CATEGORY':
          // Remove category and filter products
          return {
            ...state,
            selectedCategories: state.selectedCategories.filter(cat => !areObjectsEqual(cat, action.payload)),
          };
      
        case 'FILTER_PRODUCTS_BY_CATEGORY':
          // Implement logic to filter products based on selectedCategories
          return {
            ...state,
            filteredProducts: filterLogic(state.selectedCategories, state.allProducts),
          };
      
        default:
          return state;
      }
  };

  const productDetailsReducer = (state = initialProductDetailsState, action)=> {
    switch (action.type) {
      case 'SET_PRODUCT_ID':
        
        return {
          ...state,
          selectedProductId: action.payload
        }
    
      default:
        return state;
    }
  }



  const persistConfig = {
    key: 'root',
    storage,
  };
  
  // Modify reducers to be persisted
  const persistedUserReducer = persistReducer(persistConfig, userReducer);
  const persistedCategoryReducer = persistReducer(persistConfig, categoryReducer);
  const persistedSelectedProductReducer = persistReducer(persistConfig, productDetailsReducer);
  const persistedCartReducer = persistReducer(persistConfig, cartReducer);






const store = configureStore({
    reducer: {
        user: persistedUserReducer,
        category: persistedCategoryReducer,
        product: persistedSelectedProductReducer,
        cart: persistedCartReducer
    }
})

export const persistor = persistStore(store)

export default store