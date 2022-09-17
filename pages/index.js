import { useState } from 'react';
import axios from 'axios';
import { products } from '../data';

export default function Home() {
  return (
    <div className={"container"}>
      {
        products.map( (product, index) => {
          return (<Products key={index} product={product} />)
        })
      }
    </div>
  )
}


const Products = ({product}) => {
  const [loading, setLoading] =  useState(false);
  
  const coinbase = async () => {
    setLoading(true)
    try {
      const data = await axios.post('/api/init', { id: product.id })
      setLoading(false)
      window.open(data.data.hosted_url, '_blank');
    } catch (e) {
      console.error(e)
      setLoading(false)
    }
  }

  return (
    <div>
      <h4>{product.name}</h4>
      <p>{product.description}</p>
      <p>Price: {product.price} {product.currency}</p>
      <button onClick={coinbase} disabled={loading}> Pay With Crtpto </button>
    </div>
  )
}