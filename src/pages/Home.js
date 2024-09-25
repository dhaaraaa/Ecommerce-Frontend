import { Fragment, useEffect, useState } from 'react'
import ProductCard from '../Components/ProductCard'
import { useSearchParams } from 'react-router-dom';

export default function Home() {
  // in this usestate we store the data of getproducts api
  const [products, setproducts] = useState([]);
  // this searchparam is works as click the product that product url kept on showing on top 
  // this params change the name on the url as =wrist, =oppo
  const [searchParams, setsearchparams]=useSearchParams()
  useEffect(() => {
    // this empty array works as onetime while refresh 
    fetch(process.env.REACT_APP_API_URL + '/products?'+searchParams)
    .then(res =>res.json())
    .then(res => setproducts(res.products))
  }, [searchParams])     
// [searchParams] whenever the name changes on this it kept on change on api url
  return <Fragment>
    <h1 id="products_heading" className='text-center mt-4 font-black text-2xl'>Latest Products</h1>
    <section id="products" className="container mt-5 text-center text-xl font-black">
      <div className="row">
        {
          products.map(product =><ProductCard product={product}/>)
        }


      </div>
    </section>

  </Fragment>

}