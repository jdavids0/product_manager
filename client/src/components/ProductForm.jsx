import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const ProductForm = () => {
    const[formInfo, setFormInfo] = useState({
        title: '',
        description: '',
        price: '',
    })

    const changeHandler = (e) => {
        setFormInfo({
            ...formInfo,
            [e.target.name] : e.target.value
        })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/products', 
            formInfo)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    return (
        <>
            <div className="mt-3"></div>
                <form className="d-flex flex-column" onSubmit={submitHandler}>
                    <div className="form-group">
                        <div><label htmlFor="title">Title:</label></div>
                        <div><input type="text" name="title" onChange={changeHandler} /></div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea onChange={changeHandler} name="description" rows="1"></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price:</label>
                        <input type="number" name="price" onChange={changeHandler} min="0" step="0.01" />
                    </div>
                    <div>
                        <input type="submit" className="btn btn-dark" value="Create"/>
                    </div>
                </form>
        </>
    )
}

export default ProductForm;