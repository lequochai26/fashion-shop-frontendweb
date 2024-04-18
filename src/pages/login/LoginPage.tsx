import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Controller from '../../controllers/Controller';
import LoginPageController, { LoginParam } from '../../controllers/general/LoginPageController';
import { redirect } from '../../utils/Redirector';
import NoAccessPage from '../noaccesspage/NoAccessPage';
import CheckLoggedInController, { CheckLoggedInParam } from '../../controllers/CheckLoggedInController';
import LoadLoggedInUserController, { LoadLoggedInUserParam } from '../../controllers/LoadLoggedInUserController';



export default function LoginPage(){
   //state
   const [email,setEmail] = useState<string>("");
   const [password,setPassword] = useState<string>("");
   const [loggedIn,setLoggedIn] = useState<boolean>(false);

   //controller
   const loginPageController : Controller<LoginParam> = new LoginPageController();
   const checkLoggedInController : Controller<CheckLoggedInParam> = new CheckLoggedInController();
   const loadLoggedInUserController: Controller<LoadLoggedInUserParam> = new LoadLoggedInUserController();

   //event handler
   async function onField(event:any) {
    //target
        const target : HTMLInputElement = event.target;

        if(target.name === "email"){
            setEmail(target.value);
        }else{
            setPassword(target.value);
        }


    }

    //login
    async function handlerLogin() {
        loginPageController.execute({
            email,
            password,
            onSuccess : async function () {
                redirect("/");
            },
            onError : async function (error) {
                alert("Không thể đăng nhập");
                console.error(error);
                
            }
        });
        
    }
    //innit
    function init(){
        checkLoggedInController.execute({
            loadLoggedInUserController,
            onSuccess: function (loggedIn: boolean) {
                setLoggedIn(loggedIn);
            },
            onError : function(error:any){
                console.error(error);
            }
        });
    }
    //check login
    useEffect( init,[]);
  
  
   return(
    <div>
        {
            loggedIn ? 
                <NoAccessPage/>
            :(

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
                                type="email" name='email' onChange={onField}
                            /><br/>
                            <input
                                className="shadow appearance-none border rounded w-200 h-30 py-2 px-3 text-gray-700 mb-4 mx-auto mr-52"
                                type="password"
                                placeholder="Password"
                                required onChange={onField}
                            /><br/>
                            {/* button */}
                            <button className="w-52 h-9 mb-4 rounded-md bg-gray-200 hover:text-blue-500 mx-auto mr-52" onClick={handlerLogin} >
                                Đăng nhập
                            </button><br/>
                            <Link to={''} className="text-black-500 mx-auto mr-52">Chưa có tài khoản ? Đăng ký ngay !</Link>
                    </div>
                
                </div>
            )

            
        }
    </div>
   
   

   );
}



