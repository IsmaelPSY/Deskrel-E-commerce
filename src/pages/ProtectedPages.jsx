import { Navigate, Outlet } from "react-router-dom"

const ProtectedPages = ()=>{
    if(localStorage.getItem('Token')){
        return <Outlet/>
    }else{
        return <Navigate to={'/login'}/>
    }
}
export default ProtectedPages;