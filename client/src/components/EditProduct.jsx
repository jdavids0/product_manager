import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams, useHistory} from 'react-router-dom';

const EditProduct = () => {
    const[productInfo, setProductInfo] = useState({
        title: '',
        description: '',
        price: ''
    });

    const [errors, setErrors] = useState({});
    const {_id} = useParams();
    const history = useHistory();


    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/${_id}`)
        .then(res => {
            console.log(res);
            setProductInfo({
                ...productInfo,
                title: res.data.results[0].title,
                description: res.data.results[0].description,
                price: res.data.results[0].price
            })
        })
        .catch(err => console.log(err))
    }, [])

    const changeHandler = (e) => {
        setProductInfo({
            ...productInfo,
            [e.target.name] : e.target.value
        })
    }

    const updateProduct = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/products/${_id}`, 
            productInfo)
        .then(res => {
            console.log(res)

            /* // if there are validation errors, then save them inside state variable obj
            // res.data.error == presence of validation errors
            if(res.data.error){
                // res.data.error.errors == actual validation errors
                setErrors(res.data.error.errors);
            }
            // if there are no errors, reset state variable to clear out form
            else {
            setProductInfo({
                title: '',
                description: '',
                price: '',
                })
            } */
            history.push(`/products/${_id}`);
        })
        .catch(err => console.log(err, productInfo));
    }

    return (
        <>  
            <h3>Edit {productInfo.title}</h3>
            <div className="mt-3"></div>
                <form className="d-flex flex-column" onSubmit={updateProduct}>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input type="text" name="title" value={productInfo.title} onChange={changeHandler} />
                    </div>
                    <p className="text-danger">{errors.title?.message}</p>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea onChange={changeHandler} name="description" value={productInfo.description} rows="1"></textarea>
                    </div>
                    <p className="text-danger">{errors.description?.message}</p>
                    <div className="form-group">
                        <label htmlFor="price">Price:</label>
                        <input type="number" name="price" value={productInfo.price} onChange={changeHandler} min="0" step="0.01" />
                    </div>
                    <p className="text-danger">{errors.price?.message}</p>
                    <div className="mb-3">
                        <input type="submit" className="btn btn-dark" value="Update"/>
                    </div>
                </form>
        </>
    )
}

export default EditProduct;