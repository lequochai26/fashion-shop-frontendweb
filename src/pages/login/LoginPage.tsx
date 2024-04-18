import { useState } from 'react';
import { Link, redirect } from 'react-router-dom';
import Controller from '../../controllers/Controller';



export default function Login(){
   
  
  
   return(
       <div className="w-650 h-350 text-center  mt-20 ml-64">
       <img
           alt="Fashion Shop's Logo"
           src="/logo.png"
           className="w-48 h-48 mb-5 ml-6 mr-auto "
       />
       <div className=''>
       {/* input */}
       <input
           className='shadow appearance-none border rounded w-200 h-30 py-2 px-3 text-gray-700 mb-4 mx-auto mr-52'
           type="email" 
       /><br/>
       <input
           className="shadow appearance-none border rounded w-200 h-30 py-2 px-3 text-gray-700 mb-4 mx-auto mr-52"
           type="password"
           placeholder="Password"
           required 
       /><br/>
       {/* button */}
       <button className="w-52 h-9 mb-4 rounded-md bg-gray-200 hover:text-blue-500 mx-auto mr-52" >
           Đăng nhập
       </button><br/>
       <Link to={''} className="text-black-500 mx-auto mr-52">Chưa có tài khoản ? Đăng ký ngay !</Link>
       </div>
           
   </div>
   
   

   );
}



