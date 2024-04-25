import { FormEventHandler, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Controller from '../../controllers/Controller';
import LoginPageController, { LoginParam } from '../../controllers/general/LoginPageController';
import { redirect } from '../../utils/Redirector';
import NoAccessPage from '../noaccesspage/NoAccessPage';
import CheckLoggedInController, { CheckLoggedInParam } from '../../controllers/login/CheckLoggedInController';
import LoadLoggedInUserController, { LoadLoggedInUserParam } from '../../controllers/LoadLoggedInUserController';
import ReactFacebookLogin, { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from 'react-facebook-login';
import LoginWithFacebookController, { LoginWithFacebookParam } from '../../controllers/login/LoginWithFacebookController';
import LoadingPage from '../loadingpage/LoadingPage';



export default function LoginPage(){
   //state
   const [email,setEmail] = useState<string>("");
   const [password,setPassword] = useState<string>("");
   const [loggedIn,setLoggedIn] = useState<boolean | undefined>(undefined);

   //controller
   const loginPageController : Controller<LoginParam> = new LoginPageController();
   const checkLoggedInController : Controller<CheckLoggedInParam> = new CheckLoggedInController();
   const loadLoggedInUserController: Controller<LoadLoggedInUserParam> = new LoadLoggedInUserController();
   const loginWithFacebookController: Controller<LoginWithFacebookParam> = new LoginWithFacebookController();

   //event handlers
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
    const handlerLogin: FormEventHandler = async function (event) {
        event.preventDefault();

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
  
    async function onFacebookLogin(userInfo: ReactFacebookLoginInfo | ReactFacebookFailureResponse) {
        loginWithFacebookController.execute({
            userInfo,
            onSuccess(code) {
                if (code) {
                    redirect("/thirdpartyaccountregistrationfinish");
                }
                else {
                    redirect("/");
                }
            },

            onFailed(code, message) {
                alert(`Code: ${code}, Message: ${message}`);
            },

            onError(error) {
                alert("Đã có lỗi xảy ra trong quá trình thực thi!");
                console.error(error);
            },
        });
    }
  
   return(
    <div>
        {
            loggedIn === undefined
            ?
            <LoadingPage />
            :
            loggedIn
            ? 
            <NoAccessPage/>
            :(

                <div className="w-fit h-fit flex flex-col justify-start items-center mt-14">
                    <img
                        alt="Fashion Shop's Logo"
                        src="/logo.png"
                        className="w-48 h-48"
                    />

                    <form className="w-fit h-fit flex flex-col" onSubmit={handlerLogin}>
                        <div className=''>
                                {/* email */}
                                <p>
                                    <input
                                        className='shadow appearance-none border rounded py-2 px-3 text-gray-700 w-full my-2 text-xl'
                                        type="email" name='email' placeholder="Email" required={true} onChange={onField}
                                    />
                                </p>

                                {/* password */}
                                <p>
                                    <input
                                        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 w-full my-2 text-xl"
                                        type="password"
                                        placeholder="Mật khẩu"
                                        required={true} onChange={onField}
                                    />
                                </p>

                                {/* button */}
                                <p className="text-center">
                                    <button className="w-1/2 h-9 rounded-md bg-gray-200 hover:text-blue-500 my-2 text-lg">
                                        Đăng nhập
                                    </button>
                                </p>

                                {/* Facebook login button */}
                                <p className="text-center my-2">
                                    <ReactFacebookLogin
                                        appId='1455981415339533'
                                        callback={onFacebookLogin}
                                    />
                                </p>
                                
                                {/* Register link */}
                                <p>
                                    <Link to={'/register'} className="text-black-500 my-2 text-base">Chưa có tài khoản ? Đăng ký ngay !</Link>
                                </p>
                        </div>
                    </form>
                
                </div>
            )

            
        }
    </div>
   
   

   );
}



