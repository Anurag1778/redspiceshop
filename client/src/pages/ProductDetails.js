import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/cart';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`);
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = (item) => {
    setCart([...cart, item]);
    localStorage.setItem('cart', JSON.stringify([...cart, item]));
    toast.success('Item Added to Cart');
  };

  return (
    <Layout title={'Product-Details'}>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-md-6'>
            {product._id && (
              <img src={`/api/v1/product/product-photo/${product._id}`} className='img-fluid' alt={product.name} />
            )}
          </div>
          <div className='col-md-6'>
            <h1 className='text-center product-details mt-5'>Product Details</h1>
            {product.name && <h4>Name: {product.name}</h4>}
            {product.description && <h4>Description: {product.description}</h4>}
            {product.price && <h4>Price: ₹{product.price}</h4>}
            {product.category && <h4>Category: {product.category.name}</h4>}
            <button className='btn btn-danger' onClick={() => handleAddToCart(product)}>
              ADD TO CART
            </button>
          </div>
        </div>
        <hr />
        <div className='row container'>
          {relatedProducts.length < 1 && <p className='text-center'>No Similar Products Found</p>}
          <h6 className='text-center mt-4 mb-4'>Similar Products</h6>
          <div className='row'>
            {relatedProducts.map((p) => (
              <div key={p._id} className='col-md-4 mb-4'>
                <div className='card'>
                  <img src={`/api/v1/product/product-photo/${p._id}`} className='card-img-top' alt={p.name} />
                  <div className='card-body'>
                    <h5 className='card-title'>{p.name}</h5>
                    <p className='card-text'>{p.description.substring(0, 30)}...</p>
                    <p className='card-text'>₹{p.price}</p>
                    <button className='btn btn-dark' onClick={() => handleAddToCart(p)}>
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
