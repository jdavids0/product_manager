import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllProducts = () => {
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/products')
            .then(res => {
                console.log(res.data.results);
                setProductList(res.data.results);
            })
            .catch(err => {
                console.log('error: ', err);
            })
    },[])

    return (
        <>
            <h2>All Products</h2>
            <div className="cards d-flex justify-content-center flex-wrap">
                {
                    // first map input represent item in list, 2nd represents index of item
                    productList.map((productObj, idx) => {
                        // console.log(productList);
                        return (
                            <div key={idx} className="card" style={{width: "18rem"}}>
                                {/* <img src="..." className="card-img-top" alt="..." /> */}
                                    <div className="card-body">
                                        <h5 className="card-title">{productObj.title}</h5>
                                        <p className="card-text">{productObj.description}</p>
                                        <p className="card-text">${productObj.price}</p>
                                        <a href="#" className="btn btn-primary">Buy</a>
                                    </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default AllProducts;