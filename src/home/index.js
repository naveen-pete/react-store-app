import React from 'react';

const Home = props => {
  const { history } = props;

  return (
    <div>
      <h3>Welcome to My Product Store</h3>
      <p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => history.push('/products')}
        >
          Go to Products
        </button>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => history.push('/customers')}
        >
          Go to Customers
        </button>
      </p>
    </div>
  );
};

export default Home;
