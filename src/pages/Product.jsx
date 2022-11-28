
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
  const listProducts = useSelector(state => state.products)
  const navigate = useNavigate()

  const [quantity, setQuantity] = useState(0)
  const [confirm, setConfirm] = useState(false)

  useEffect(() => {
    console.log("mi ID")
    console.log(id)
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

  const filterProducts = listProducts.filter(item => item.id!=product.id).map((item) =><ProductItem key={item.id} prodObj={item} />) 
   
    return (
        <div className="bg-yellow-300">
          <div className="flex justify-around content-center">
            <button className="font-medium text-xl p-2" onClick={()=>navigate(-1)}>Back</button>
            <div className="font-medium text-xl bg-slate-400 flex my-3 p-2 rounded-full">
              <Link to={'/cart'} className=" m-auto">
                <i className="fa-solid fa-cart-shopping"></i>
              </Link>
            </div>
          </div>
            <h1><mark>{product.title}</mark></h1>
            <q>{product.desc}</q>
            <div>
            <button className="bg-blue-300 p-2 m-1" onClick={decrement}>-</button>
                {quantity}
            <button className="bg-blue-300 p-2 m-1" onClick={increment} >+</button>
            <button className="bg-blue-300 p-2 m-1" onClick={() => setConfirm(true)} >Add To Cart</button>
            </div>
            <div className="snap-x flex snap-mandatory w-5/6 mx-auto overflow-scroll bg-red-200">
            {product.images?.map(item =><div className="snap-center bg-red-500 w-full flex-shrink-0 flex items-center justify-center text-8xl" key={item.id}><img src={item.url}/></div>)}
            </div>
            <h2 className="my-5">Productos Relacionados</h2>
                {filterProducts}
            </div>
    )
}
export default Product;