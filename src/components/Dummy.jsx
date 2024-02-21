import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../Redux/features/cartSlice';


const Dummy = () => {
    // Use useSelector to get the products data from the Redux store

    const dispatch = useDispatch()
    const products = useSelector((state) => state.allCart);


    console.log('data', products);

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])




    return (
        <div>
            <h2>Hello, I am testing to get all data</h2>
            {/* {products.map((product) => (
                <div key={product.id}>
                    <p>{product.name}</p>
                </div>
            ))} */}
        </div>
    );
};

export default Dummy;
