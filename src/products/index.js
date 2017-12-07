import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import * as ProductsApi from '../api/products-api';
import ProductList from './product-list';
import ProductDetail from './product-detail';
import ProductForm from './product-form';
import AppAlert from '../app-alert';

class Products extends Component {
  constructor(props) {
    super(props);

    this.state = { products: [] };

    this.onAddProduct = this.onAddProduct.bind(this);
    this.onUpdateProduct = this.onUpdateProduct.bind(this);
    this.onRemoveProduct = this.onRemoveProduct.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    ProductsApi.getAll()
      .then(products => {
        console.log('SUCCESS: Get products successfully completed!');
        this.setState({ products });
      })
      .catch(error => {
        console.log(
          'ERROR: Unable to retrieve products from the server.',
          error
        );
      });
  }

  onAddProduct(product) {
    ProductsApi.add(product)
      .then(newProduct => {
        console.log('SUCCESS: New product successfully added!');
        this.setState(prevState => {
          prevState.products.push(newProduct);
          return { products: prevState.products };
        });
        this.props.history.push('/products');
      })
      .catch(error => {
        console.log('ERROR: Failed to add new product.', error);
      });
  }

  onUpdateProduct(product) {
    ProductsApi.update(product)
      .then(updatedProduct => {
        console.log(
          `SUCCESS: Product successfully updated for id '${updatedProduct.id}'!`
        );
        this.setState(prevState => {
          const foundProduct = prevState.products.find(
            p => p.id === updatedProduct.id
          );

          if (foundProduct) {
            foundProduct.name = updatedProduct.name;
            foundProduct.description = updatedProduct.description;
            foundProduct.price = updatedProduct.price;
            foundProduct.isAvailable = updatedProduct.isAvailable;
          }

          return { products: prevState.products };
        });
        this.props.history.push('/products');
      })
      .catch(error => {
        console.log(
          `ERROR: Failed to update product. (id: ${product.id})`,
          error
        );
      });
  }

  onRemoveProduct(id) {
    ProductsApi.remove(id)
      .then(() => {
        console.log(`SUCCESS: Product successfully deleted for id '${id}'!`);
        this.setState(prevState => {
          const products = prevState.products.filter(
            product => product.id !== id
          );
          return { products };
        });
        this.props.history.push('/products');
      })
      .catch(error => {
        console.log(`ERROR: Failed to delete product. (id: ${id})`, error);
      });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-12">
            <h3>Products</h3>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-sm-4">
            <ProductList products={this.state.products} />
          </div>
          <div className="col-xs-12 col-sm-6">
            <Switch>
              <Route
                path="/products/new"
                render={props => (
                  <ProductForm
                    match={props.match}
                    addProduct={this.onAddProduct}
                    newProduct="true"
                  />
                )}
              />
              <Route
                exact
                path="/products/:id"
                render={props => {
                  return (
                    <ProductDetail
                      match={props.match}
                      removeProduct={this.onRemoveProduct}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/products/:id/edit"
                render={props => (
                  <ProductForm
                    match={props.match}
                    updateProduct={this.onUpdateProduct}
                    newProduct="false"
                  />
                )}
              />
              <Route
                render={() => (
                  <AppAlert
                    type="info"
                    message="Select a product from the list."
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default Products;
