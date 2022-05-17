import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';

const AllProducts = (props) => {
    const [productList, setProductList] = useState([]);
    const {_id} = useParams();

    useEffect(() => {
        axios.get('http://localhost:8000/api/products')
            .then(res => {
                console.log(res.data.results);
                setProductList(res.data.results);
            })
            .catch(err => {
                console.log('error: ', err);
            })
    },[props.toggle])

    const deleteProduct = (_id) => {
        axios.delete(`http://localhost:8000/api/products/${_id}`)
            .then(res => {
                console.log(res.data.results)
                let filteredList = productList.filter((productObj, idx) => {
                    return idx != _id;
                })
                setProductList(filteredList);
            })
            .catch(err => console.log(err));
    }

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
                                        <h5 className="card-title"><Link to={`/products/${productObj._id}`}>{productObj.title}</Link></h5>
                                        <p className="card-text">{productObj.description}</p>
                                        <p className="card-text">${productObj.price}</p>
                                        <p className="btn btn-dark"><Link style={{color: "white"}} to={`/products/edit/${productObj._id}`}>Edit {productObj.title}</Link></p>
                                        <div><button className="btn btn-dark" onClick={ (e)=> deleteProduct(productObj._id) }>Delete</button></div>
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