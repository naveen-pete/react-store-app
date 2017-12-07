import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as ProductsApi from '../api/products-api';

class ProductForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {
        name: '',
        description: '',
        price: 0,
        isAvailable: false
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const newProduct = this.props.newProduct === 'true';
    if (!newProduct) {
      this.getProduct();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.url !== prevProps.match.url) {
      this.setState({
        product: {
          name: '',
          description: '',
          price: 0,
          isAvailable: false
        }
      });
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

  handleChange(event) {
    // Retrieve name, value, control type and checked flag of the form control
    const { name, value, type, checked } = event.target;

    // Check whether the form control is a checkbox, if yes, store the
    // checked flag
    let newValue = type === 'checkbox' ? checked : value;

    // Get value as number for numeric fields
    newValue = this.getValueAsNumeric(name, newValue);

    this.setState(prevState => {
      // Assign the updated value
      prevState.product[name] = newValue;

      return { product: prevState.product };
    });
  }

  getValueAsNumeric(fieldName, value) {
    let newValue = value;

    if (fieldName === 'price') {
      newValue = isNaN(parseInt(newValue, 10)) ? 0 : parseInt(newValue, 10);
    }

    return newValue;
  }

  handleSubmit(event) {
    event.preventDefault();

    const { product } = this.state;
    const newProduct = this.props.newProduct === 'true';
    if (newProduct) {
      this.props.addProduct(product);
    } else {
      this.props.updateProduct(product);
    }
  }

  render() {
    const { product } = this.state;
    return (
      <div>
        <h4>Product Form</h4>
        <div className="well well-lg">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="productName">Name</label>
              <input
                type="text"
                className="form-control"
                id="productName"
                name="name"
                value={product.name}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="productDescription">Description</label>
              <textarea
                name="description"
                className="form-control"
                id="productDescription"
                cols="30"
                rows="4"
                value={product.description}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="productPrice">Price</label>
              <input
                type="text"
                className="form-control"
                id="productPrice"
                name="price"
                value={product.price}
                onChange={this.handleChange}
              />
            </div>
            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  name="isAvailable"
                  checked={product.isAvailable}
                  onChange={this.handleChange}
                />
                Available
              </label>
            </div>
            <button type="submit" className="btn btn-primary">
              <span className="glyphicon glyphicon-ok" />
            </button>
            <Link to="/products" className="btn btn-warning">
              <span className="glyphicon glyphicon-remove" />
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

export default ProductForm;
