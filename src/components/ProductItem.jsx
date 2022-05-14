import { Link } from "react-router-dom";

const ProductItem = ({prodObj})=>{
    return(
            <Link to={`/shop/${prodObj.id}`}>
                <div className=" bg-red-400 w-5/6 mx-auto border-8 border-indigo-400">
                    <div className="h-10 font-medium text-lg ">
                        <h1 className="pt-1 underline underline-offset-8 decoration-2">{prodObj.name}</h1>
                    </div>
                    <img src={prodObj.images[0]?.url}/>
                </div>
            </Link>
    )
}
export default ProductItem;