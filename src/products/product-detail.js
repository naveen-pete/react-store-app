import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as ProductsApi from '../api/products-api';

class ProductDetail extends Component {
  constructor(props) {
    super(props);

    this.state = { product: {} };

    this.onRemove = this.onRemove.bind(this);
  }

  componentDidMount() {
    this.getProduct();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.url !== prevProps.match.url) {
      this.getProduct();
    }
  }

  getProduct() {
    const { params } = this.props.match;
    const id = params['id'];

    if (!id) {
      console.log('Product id is null. Pass a valid Product id.');
      return;
    }

    ProductsApi.get(id)
      .then(product => {
        console.log(
          `SUCCESS: Product details for id '${id}' successfully retrieved!`
        );
        this.setState({ product });
      })
      .catch(error => {
        console.log(
          `ERROR: Unable to retrieve product details. (id: '${id}')`,
          error
        );
      });
  }

  onRemove() {
    this.props.removeProduct(this.state.product.id);
  }

  render() {
    const { product } = this.state;

    return (
      <div>
        <h4>Product Details</h4>
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title">{product.name}</h3>
          </div>
          <div className="panel-body">
            <p>{product.description}</p>
          </div>
          <ul className="list-group">
            <li className="list-group-item">
              Available: {product.isAvailable ? 'Yes' : 'No'}
            </li>
            <li className="list-group-item">Price: {product.price}</li>
          </ul>
        </div>
        <p>
          <Link className="btn btn-primary" to={`/products/${product.id}/edit`}>
            <span className="glyphicon glyphicon-edit" />
          </Link>
          <button className="btn btn-warning" onClick={this.onRemove}>
            <span className="glyphicon glyphicon-trash" />
          </button>
        </p>
      </div>
    );
  }
}

export default ProductDetail;
