import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const ProductForm = (props) => {
    const[formInfo, setFormInfo] = useState({
        title: '',
        description: '',
        price: '',
    });

    // state variable in which to stare validation errors
    const [errors, setErrors] = useState({});

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
        .then(res => {
            // log response after posting form
            console.log(res)

            // if there are validation errors, then save them inside state variable obj
            // res.data.error == presence of validation errors
            if(res.data.error){
                // res.data.error.errors == actual validation errors
                setErrors(res.data.error.errors);
            }
            // if there are no errors and product successfully created, reset state variable to clear out form
            else {
                setFormInfo({
                    title: '',
                    description: '',
                    price: '',
                    })
                props.setNewProductToggle(!props.NewProductToggle);
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <>
            <div className="mt-3"></div>
                <form className="d-flex flex-column" onSubmit={submitHandler}>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input type="text" name="title" onChange={changeHandler} />
                    </div>
                    <p className="text-danger">{errors.title?.message}</p>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea onChange={changeHandler} name="description" rows="1"></textarea>
                    </div>
                    <p className="text-danger">{errors.description?.message}</p>
                    <div className="form-group">
                        <label htmlFor="price">Price:</label>
                        <input type="number" name="price" onChange={changeHandler} min="0" step="0.01" />
                    </div>
                    <p className="text-danger">{errors.price?.message}</p>
                    <div className="mb-3">
                        <input type="submit" className="btn btn-dark" value="Create"/>
                    </div>
                </form>
        </>
    )
}

export default ProductForm;