import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createUser, loginUser } from "../services";

const SignUp = ()=>{

    const navigate = useNavigate()
    const {handleSubmit,register} = useForm();
    const [userObj,setUserObj] = useState({});

    const onSubmit = (data)=>{
        setUserObj(data)
        console.log(data)        
    }

    useEffect(()=>{
        if(userObj.email){
        createUser(userObj)
        loginUser({email:userObj.email,password:userObj.password})
            .then(res =>{
                localStorage.setItem('Token',res.token)
            })
            .then(()=>{
                navigate('/shop')
            })
        }
    },[userObj])

    return(
        <div  className="grid place-items-center  h-screen bg-yellow-300">
            <div className="text-5xl font-extrabold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-orange-500">
                    Sign Up 
                </span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-5/6">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first_name">
                First Name
                </label>
                <input id="first_name" type='text' placeholder='Your Name' required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...register('name')}/>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
                </label>
                <input id="email" type='email' placeholder='Your Email' required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...register('email')}/>
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
                </label>
                <input id="password" type='password' required placeholder='Your Password' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" {...register('password')}/>
            </div>
           <input type='submit' value="Sign Up" className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-full"/>
        </form>
            <p className="text-center text-gray-500 text-xs">
            &copy;2022 Deskrel-Corp. All rights reserved.
            </p>
      </div>
    )
}
export default SignUp;