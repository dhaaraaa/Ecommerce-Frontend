import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
export default function ProductDetails({cartitems ,setcartitems}) {

    const [product , setProduct] = useState(null);
    const [qty , setqty]=useState(1);
    const {id}=useParams();


    useEffect(()=>{
        fetch(process.env.REACT_APP_API_URL + '/product/'+id)
        .then(res =>res.json())
        .then(res => setProduct(res.product))
    },[])

    function addTocart(){
        const itemexist=cartitems.find((item)=> item.product._id == product._id)
        // find((item)=> item.product._id == product._id) one time alone add to cart a work panna vaika
        if(!itemexist){
            const newitem ={product, qty}
            setcartitems((state)=> [...state, newitem]);
            toast.success('Cart item is added successfully')
        }
        // if.. addcart dont have a item it will add a item
        // toast.success act as css that means it gives us green line search it on toastify doc
    }

    function increaseqty(){
        if (product.stock == qty){
            return;
        }
        setqty((state) => state + 1);
    }
    // this increaseqty is + and instock iruka varaiku adhu increase panradhu

    function decreaseqty(){
        if(qty > 1){
            setqty((state)=> state - 1);
        }
    }
    return product && <div classNameName="container container-fluid">
        <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
                <img src={product.images[0].image} alt="sdf" height="500" width="500" />
            </div>

            <div className="col-12 col-lg-5 mt-5">
                <h3>{product.name}</h3>
                <p id="product_id">Product #{product._id}</p>

                <hr />

                <div className="rating-outer">
                    <div className="rating-inner" style={{width:`${product.ratings/5*100}%`}}></div>
                </div>


                <hr />

                <p id="product_price">{product.price}</p>
                <div className="stockCounter d-inline">
                    <span className="btn btn-danger minus " onClick={decreaseqty}>-</span>

                    <input type="number" className="form-control count d-inline" value={qty} readOnly />

                    <span className="btn btn-primary plus" onClick={increaseqty}>+</span>
                </div>
                <button type="button" id="cart_btn" onClick={addTocart} disabled={product.stock== 0} className="btn btn-primary d-inline ml-4">Add to Cart</button>

                <hr />

                <p>Status: <span id="stock_status" className={product.stock > 0 ? 'text-success' :' text-danger'}>{product.stock > 0 ? 'In Stock':'Out of Stock'}</span></p>

                <hr />

                <h4 className="mt-2">Description:</h4>
                <p>{product.description}</p>
                <hr />
                <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>

                <div className="rating w-50"></div>

            </div>

        </div>

    </div>
}