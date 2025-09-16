import { sumProducts } from "@/utils/counterCart";
import sendProductsToServer from "@/utils/SendProductsCart";
import { createContext, useContext, useReducer } from "react";
import { Children } from "react";

export const initialState = {
  products: [],
  itemsCounter: 0,
  total: 0,
  checkOut: false,
};
const dataContext = createContext() 
export function cartReducer(state, action) {
  switch (action.type) {
    case "Add":
      if (!state.products.find((item) => item._id === action.payload._id)) {
        state.products.push({ ...action.payload, quantity: 1 });
      }
      return {
        products: [...state.products],
        checkOut: false,
        ...sumProducts(state.products),
      };
    case "Increase":
      const increaseIndex = state.products.findIndex(
        (item) => item._id === action.payload._id
      );
      state.products[increaseIndex].quantity++;

      return {
        ...state,
        ...sumProducts(state.products),
      };
    case "Decrease":
      const decreaseIndex = state.products.findIndex(
        (item) => item._id === action.payload._id
      );
      state.products[decreaseIndex].quantity--;
      return {
        ...state,
        ...sumProducts(state.products),
      };
    case "Delete":
      const newProducts = state.products.filter(
        (item) => item._id !== action.payload._id
      );
      return {
        products: newProducts,
        checkOut: false,
        ...sumProducts(state.products),
      };
    case "CheckOut":
            return {
        products: [],
        itemsCounter: 0,
        total: 0,
        checkOut: true,
      };
    default:
      throw new Error("Invalid Action");
  }
}


function DataProvider({children}) {
  const [state , dispatch] = useReducer(cartReducer , initialState)
  return (
    <dataContext.Provider value={{state , dispatch}}>
      {children}
    </dataContext.Provider>
  )
}
export function useData(){
  return useContext(dataContext)
}
export default DataProvider