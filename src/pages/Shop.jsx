import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import ProductItem from "../components/ProductItem"
import { setCategoriesThunk, setProductThunk } from "../redux/actions"

const Shop = () => {

    const dispatch = useDispatch()
    const productArr = useSelector(state => state.products)
    const categoriesArr = useSelector(state => state.categories)
    console.log(productArr)
    const [currentCategory, setCurrentCategory] = useState('')
    const [filterValue , setFilterValue] = useState('')

    useEffect(() => {
        dispatch(setProductThunk(currentCategory))
        dispatch(setCategoriesThunk())
    }, [dispatch, currentCategory])


    const list = productArr.map((item) => <ProductItem key={item.id} prodObj={item} />)
    const listFilterByName = productArr.filter( product => product.title.toUpperCase().includes(filterValue.toUpperCase())).map(product => <Link key={product.id} to={`/shop/${product.id}`}>{product.name}</Link>)
    const categoriesList = categoriesArr.map(item => <option key={item.id} value={item.id}>{item.name}</option>) 

    return (
        <div className="bg-yellow-300 min-h-screen">
            <h1 className="py-5 text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-orange-500">
            Las joyas del Infinito
            </h1>
            <nav className="mb-4 border">
                <ul className="flex">
                    <li className="p-1">
                        <Link to={''}>Ofertas</Link>
                    </li>
                    <li>
                        <div>
                            <input className="w-full h-full p-1" placeholder="Search Product" onChange={e => setFilterValue(e.target.value)}></input>
                            {
                                filterValue ? <div className="">{listFilterByName}</div> : null
                            }
                        </div>
                    </li>
                    <li >
                        <select className="px-1 py-2" onChange={(e)=>setCurrentCategory(e.target.value)}>
                        <option value=''>All Products</option>
                            {categoriesList}
                        </select>
                    </li>
                    <li className="p-0.5">
                        <Link to={'/cart'} className="">
                            <i className=" text-xl  fa-solid fa-cart-shopping"></i>
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="pb-4 sm:columns-2 lg:columns-3">
            {list}
            </div>
        </div>
    )
}
export default Shop