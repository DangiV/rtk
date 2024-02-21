import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import '../assets/Style/Common.css'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    const { carts } = useSelector((state) => state.allCart);
    console.log("cart", { carts });
    return (
        <>
            <Navbar style={{ height: "60px", background: "black", color: "white" }}>
                <Container>

                    <NavLink to='/' className="text-decoration-none text-light mx-2">
                        <h3>E-Commarce</h3>
                    </NavLink>

                    <NavLink to='/cards' className="text-decoration-none text-light mx-2">
                        <div id='ex4'>
                            <span className='p1 fa-stack fa-2x has-badge' data-count={carts.length}>
                                <i className="fa-solid fa-cart-shopping"></i>
                            </span>
                        </div>
                    </NavLink>



                </Container>
            </Navbar>

        </>
    )
}

export default NavBar
