import React, { useState } from 'react'
import Cardsdata from '../DataArry';
import '../assets/Style/Cart.css'
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { addToCart } from '../Redux/features/cartSlice'
import { useDispatch } from 'react-redux';

const Home = () => {
    const dispatch = useDispatch()
    const [CardData, setCardData] = useState(Cardsdata)
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState([]);

    // function to add data in cart
    const SendData = (item) => {
        dispatch(addToCart(item))
    }

    // handle seach function 
    const HandleSearch = (e) => {
        const data = e.target.value.toLowerCase();
        if(data === ''){
            setCardData(Cardsdata);
        }
        else{
            const Seachdata = CardData.filter(item => item.dish.toLowerCase().includes(data))
            setCardData(Seachdata)
        }
    }


    // function to filter data by color
    const handleColorFilter = (color) => {
        setSelectedColor(color);

        if (!color) {
            setCardData(Cardsdata);
        } else {
            const colorFilter = Cardsdata.filter(item => item.color === color);
            setCardData(colorFilter);
        }
    };

    // handle filter logic for price start here 
    const handleCategoryFilter = (categoery) => {
        setSelectedCategory(categoery)
        if (!categoery) {
            setCardData(Cardsdata)
        }
        else {
            const filterCategory = Cardsdata.filter(item => item.categoery === categoery)
            setCardData(filterCategory)
        }
    }

    return (
        <>
            <section className='iteam_section mt-4 container'>
                <h2 className='px-4' style={{ fontWeight: 400 }}>Indore Restrorent</h2>
                <div className='row'>
                    <div className='col-3'>
                        <div>
                            <h4>Seach Bar</h4>
                            <div className="input-group">
                                <div className="form-outline" data-mdb-input-init="">
                                    <label className="form-label" htmlFor="form1">
                                        Search
                                    </label>
                                    <input type="search"
                                        id="search"
                                        className="form-control"
                                        onChange={(e) => HandleSearch(e)}
                                    />

                                </div>
                            </div>

                        </div>
                        <div className="filters">
                            <h4>Filters By Color</h4>
                            <button className='w-100 ' onClick={() => handleColorFilter('Black')}>Black</button>
                            <button className=' w-100 mt-1' onClick={() => handleColorFilter('Red')}>Red</button>
                            <button className='w-100 mt-1' onClick={() => handleColorFilter('Green')}>Green</button>
                            <button className='w-100 mt-1' onClick={() => handleColorFilter('Blue')}>Blue</button>
                            <button className='w-100 mt-1' onClick={() => handleColorFilter()}>All</button>
                        </div>

                        <div>
                            <h4>Filters By Categoery</h4>
                            <button className='w-100 mt-1' onClick={() => handleCategoryFilter('men')}>Men</button>
                            <button className='w-100 mt-1' onClick={() => handleCategoryFilter('belt')}>Belt</button>
                            <button className='w-100 mt-1' onClick={() => handleCategoryFilter('food')}>Food</button>
                            <button className='w-100 mt-1' onClick={() => handleCategoryFilter()}>All</button>
                        </div>

                        <div>
                            <h4>Filters By Multi-Color</h4>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    defaultValue=""
                                    id="flexCheckDefault"

                                />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Red
                                </label>
                            </div>

                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    defaultValue=""
                                    id="flexCheckChecked"
                                />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    Black
                                </label>
                            </div>

                        </div>
                    </div>

                    <div className='col-9'>
                        <div className='row mt-2 d-flex justify-content-around align-items-center'>
                            {
                                CardData.map((item, index) => {
                                    return (
                                        <Card style={{ width: '22rem', border: "none" }} className="hove mb-4" key={index}>
                                            <Card.Img variant='top' className='cd' src={item.imgdata} />

                                            <div className='card_body'>
                                                <div className='upper_data d-flex justify-content-between align-items-center'>
                                                    <h4 className='mt-2'>{item.dish} </h4>
                                                    <span>{item.rating} ★</span>
                                                </div>

                                                <div className='lower_data d-flex justify-content-between '>
                                                    <h5>{item.address}</h5>
                                                    <span>{item.price}</span>
                                                </div>
                                                <div className='extra'></div>


                                                <div className="last_data d-flex justify-content-between align-items-center">
                                                    <img src={item.arrimg} className='limg' alt="" />
                                                    <Button style={{ width: "150px", background: "#ff3054db", border: "none" }} variant='outline-light'
                                                        className='mt-2 mb-2'
                                                        onClick={() => SendData(item)}
                                                    >Add TO Cart</Button>
                                                    <img src={item.delimg} className='laimg' alt="" />
                                                </div>

                                            </div>

                                        </Card>
                                    )
                                })
                            }

                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}

export default Home