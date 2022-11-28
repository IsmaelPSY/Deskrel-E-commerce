import { Link } from "react-router-dom";

const ProductItem = ({prodObj})=>{
    console.log(prodObj)
    return(
            <Link to={`/shop/${prodObj._id}`}>
                <div className=" bg-red-400 w-5/6 mx-auto border-8 border-indigo-400">
                    <div className="h-10 font-medium text-lg ">
                        <h1 className="pt-1 underline underline-offset-8 decoration-2">{prodObj.title}</h1>
                    </div>
                    <img src={prodObj.image_url}/>
                </div>
            </Link>
    )
}
export default ProductItem;