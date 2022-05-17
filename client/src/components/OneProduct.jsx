import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';

const OneProduct = () => {
    // state variable to store one product data
    const [productInfo, setProductInfo] = useState({});
    
    const {_id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/${_id}`)
        .then(res =>{
            console.log(res.data.results);
            setProductInfo(res.data.results[0]);

        })
        .catch(err => console.log(err));
    }, [])


    return(
        <div>
            <h3>Title: {productInfo.title}</h3>
            <h3>Description: {productInfo.description}</h3>
            <h3>Price: ${productInfo.price}</h3>
            <p className="btn btn-dark"><Link to='/' style={{color: "white"}}>Home</Link></p>
            {/* <p className="btn btn-dark"><Link to={'/'} style={{color: "white"}}>Home</Link></p> */}
        </div>
    )
}

export default OneProduct;