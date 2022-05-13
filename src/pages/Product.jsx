
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductItem from "../components/ProductItem";
import { setInfoProductThunk, setProductThunk } from "../redux/actions";
import { addProductToCart } from "../services";

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.productInfo);
  const filterProducts = useSelector(state => state.products)
  const navigate = useNavigate()

  const [quantity, setQuantity] = useState(0)
  const [confirm, setConfirm] = useState(false)
  const [filtProd, setFiltProd] = useState([])

  useEffect(() => {
    dispatch(setInfoProductThunk(id));
  }, [dispatch, id]);

  useEffect(() => {
    if(quantity && confirm){
      addProductToCart({
        product: id,
        quantity: quantity
      })
        .then((res) => {
          console.log(res)
          setConfirm(false)
        })
    }
  }, [quantity, confirm, id])

  useEffect(() => {
    if(product.category){
      dispatch(setProductThunk(product.category.id))
    }
    console.log(product)
  }, [dispatch, product])

  const decrement = () => {
    setConfirm(false)
    if(quantity > 0){
      setQuantity(quantity - 1)
    }
  }
  const increment = () => {
    setConfirm(false)
    setQuantity(quantity + 1)
  }

   
    return (
        <div>
          <button onClick={()=>navigate(-1)}>Back</button>
          <Link to={'/cart'}>
            <i className="fa-solid fa-cart-shopping"></i>
          </Link>
            <h1><mark>{product.name}</mark></h1>
            <p>{product.description}</p>
            <button onClick={decrement}>-</button>
                {quantity}
            <button onClick={increment} >+</button>
            <button onClick={() => setConfirm(true)} >Add To Cart</button>
            <div className="snap-x flex snap-mandatory w-5/6 mx-auto overflow-scroll bg-red-200">
            {product.images?.map(item =><div className="snap-center bg-red-500 w-full flex-shrink-0 flex items-center justify-center text-8xl" key={item.id}><img src={item.url}/></div>)}
            </div>
            <h2 className="my-5">Productos Relacionados</h2>
                {filterProducts.map((item) =><ProductItem key={item.id} prodObj={item} />)}
            </div>
    )
}
export default Product;