import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useParams, useHistory} from 'react-router-dom';

const OneProduct = () => {
    // state variable to store one product data
    const [productInfo, setProductInfo] = useState({});
    
    const {_id} = useParams();
    const history = useHistory();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/${_id}`)
        .then(res =>{
            console.log(res.data.results);
            setProductInfo(res.data.results[0]);

        })
        .catch(err => console.log(err));
    }, [])

    const deleteProduct = () => {
        axios.delete(`http://localhost:8000/api/products/${_id}`)
            .then(res => {
                console.log(res);
                history.push('/')
            })
            .catch(err => console.log('this is the error -->', err));
    }


    return(
        <div>
            <h3>Title: {productInfo.title}</h3>
            <h3>Description: {productInfo.description}</h3>
            <h3>Price: ${productInfo.price}</h3>
            <div className="d-flex justify-content-between">
                <button className="btn btn-dark"><Link to='/' style={{color: "white"}}>Home</Link></button>
                <button className="btn btn-dark" onClick={deleteProduct}>Delete</button>
            </div>
        </div>
    )
}

export default OneProduct;