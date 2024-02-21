import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    carts: [],
    status: "idle",
    error: null,
    products: [], 
}

// Async action to fetch product data
export const fetchProducts = createAsyncThunk("cartSlice/fetchProducts", async () => {
    try {
        const response = await axios.get('https://dummyjson.com/products');
        console.log('response', response);
        return response.data;
    } catch (error) {
        throw Error("Error fetching product data");
    }
});

// card slice

const cartSlice = createSlice({
    name: "cartSlice",
    initialState,
    reducers: {

        // add to cart
        addToCart: (state, action) => {

            const itemIndex = state.carts.findIndex((item) => item.id === action.payload.id)

            if (itemIndex >= 0) {
                state.carts[itemIndex].qnty += 1
            }
            else {
                const temp = { ...action.payload, qnty: 1 }
                state.carts = [...state.carts, temp]
            }
        },

        // remove item 

        removeFromCart: (state, action) => {
            const dataFiler = state.carts.filter((item) => item.id !== action.payload)
            state.carts = dataFiler;
        },

        // remove single item or decrease item qty

        removeSingleItems: (state, action) => {
            const Item_Decrease = state.carts.findIndex((item) => item.id === action.payload.id);

            if (state.carts[Item_Decrease].qnty >= 1) {
                state.carts[Item_Decrease].qnty -= 1
            }
        },

        // remove all carts empty cart

        clearCarts: (state, action) => {
            state.carts = []
        }

    },
    
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const { addToCart, removeFromCart, removeSingleItems, clearCarts } = cartSlice.actions;

export default cartSlice.reducer;