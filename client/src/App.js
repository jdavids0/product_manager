import React, {useState} from 'react';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import './App.css';

import ProductForm from './components/ProductForm';
import AllProducts from './components/AllProducts';
import OneProduct from './components/OneProduct';
import EditProduct from './components/EditProduct'

function App() {

  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <BrowserRouter>
      <div className="App d-flex flex-column align-items-center">
        <h1>Product Manager</h1>
        <Switch>
          <Route exact path='/'>
            <ProductForm toggle={isSubmitted} />
            <hr />
            <AllProducts toggle={isSubmitted} />
          </Route>
          {/* could say :id or :_id here */}
          <Route exact path='/products/:_id'>
            <OneProduct />
          </Route>
          <Route exact path='/products/edit/:_id'>
            <EditProduct />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
