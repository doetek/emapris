import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import elect from "../components/elect.png"
import { Link } from 'react-router-dom';
// import data from '../data';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: '',
  });
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

      // setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <Helmet>
        <title>Emapris</title>
      </Helmet>
      <div className="row-1">
		<div className="col-2">
			<h1> Emapris Your Online Store <br /> Start Shopping</h1>
			<p>Success is not always about greatness. It is about consistency. Consistent <br/>hard work gains success. Greatness will come.</p>
			<Link to='/signup' className="btnn">Explore Now &#x2192;</Link>
</div>
<div className="col-2">
<img src={elect} alt="img" />
</div>
</div>

      <h1 className='feature-heading'>Featured Products</h1>
      <div className="products" >
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox style={{background:"white"}}>
            No internet <br />
          Try: <br />
          Checking the network cables, modem, and router
          Reconnecting to Wi-Fi <br />
          Running Windows Network Diagnostics <br />

          ERR_INTERNET_DISCONNECTED
          
          </MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
export default HomeScreen;
