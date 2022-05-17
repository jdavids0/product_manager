import React from 'react';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import './App.css';

import ProductForm from './components/ProductForm';
import AllProducts from './components/AllProducts';

function App() {
  return (
    <BrowserRouter>
      <div className="App d-flex flex-column align-items-center">
        <h1>Product Manager</h1>
        <Switch>
          <Route exact path='/'>
            <ProductForm />
            <AllProducts />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
