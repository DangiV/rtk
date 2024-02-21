import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, clearCarts, removeFromCart, removeSingleItems } from '../Redux/features/cartSlice';

const Cards = () => {
    const { carts } = useSelector((state) => state.allCart);
    const [totalPrice, setToalPrice] = useState(0)

    const dispatch = useDispatch()

    console.log('data', carts);

    const AddData = (item) => {
        dispatch(addToCart(item))
    }

    const removeData = (id) => {
        dispatch(removeFromCart(id))
    }

    const DecreseQnty = (id) => {
        dispatch(removeSingleItems(id))
    }

    const EmptyCarts = () => {
        dispatch(clearCarts())
    }

    // count total price function 

    const totalAmount = () => {
        let Total = 0
        carts.map((item) => {
            Total = item.price * item.qnty + Total
        })
        setToalPrice(Total)
    }



    // total amount useEffect
    useEffect(() => {
        totalAmount();
    }, [totalAmount]);


    return (
        <>
            <div className='row justify-content-center m-0'>
                <div className='col-md-8 mt-5 mb-5 cardsdetails'>
                    <div className="card">
                        <div className="card-header bg-dark p-3">
                            <div className='card-header-flex'>
                                <h5 className='text-white m-0'>Cart Calculations{carts.length > 0 ? `(${carts.length})` : ""}</h5>
                                {
                                    carts.length > 0 ? <button className='btn btn-danger mt-0 btn-sm' onClick={() => EmptyCarts()}>
                                        <i className='fa fa-trash-alt mr-2'></i><span>EmptyCart</span></button>
                                        : ""
                                }
                            </div>
                        </div>
                        <div className="card-body p-0">
                            {
                                carts.length === 0 ? <table className='table cart-table mb-0'>
                                    <tbody>
                                        <tr>
                                            <td colSpan={6}>
                                                <div className='cart-empty'>
                                                    <i className='fa fa-shopping-cart'></i>
                                                    <p>Your Cart Is Empty</p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                    :
                                    <table className='table cart-table mb-0 table-responsice-sm'>
                                        <thead>
                                            <tr>
                                                <th>Action</th>
                                                <th>Product</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Qty</th>
                                                <th className='text-right'><span className='amount'>Total Amount</span> </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                carts.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>
                                                                <button className='prdct-delete' onClick={() => removeData(item.id)}> <i className='fa fa-trash-alt mr-2'></i></button>
                                                            </td>
                                                            <td><div className='product-img'><img src={item.imgdata} alt="not found" /></div></td>
                                                            <td><div className='product-name'><p>{item.dish}</p></div></td>
                                                            <td>{item.price}</td>
                                                            <td>
                                                                <div className='prduct-qty-container'>
                                                                    <button className='prdct-qty-btn' type='button' onClick={item.qnty <= 1 ? () => removeData(item.id) : () => DecreseQnty(item)}>
                                                                        <i className='fa fa-minus'></i>
                                                                    </button>
                                                                    <input type="text" className='qty-input-box' value={item.qnty} disabled />
                                                                    <button className='prdct-qty-btn' type='button' onClick={() => AddData(item)}>
                                                                        <i className='fa fa-plus'></i>
                                                                    </button>
                                                                </div>
                                                            </td>
                                                            <td className='text-right'>{item.qnty * item.price}</td>

                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th></th>
                                                <th colSpan={3}></th>
                                                <th></th>
                                                <th className='text-right'>Total Price <span className='ml-2 mr-2'></span> <span className='text-danger'>{totalPrice}</span></th>

                                            </tr>
                                        </tfoot>

                                    </table>
                            }
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Cards
