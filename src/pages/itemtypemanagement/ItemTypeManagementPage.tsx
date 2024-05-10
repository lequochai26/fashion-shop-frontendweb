import { FormEventHandler, useEffect, useState } from "react";

import Controller from "../../controllers/Controller";
import LoadItemItypeController, { LoadItemTypeControllerParam } from "../../controllers/itemtypemanagement/LoadItemTypeController";
import LoadingPage from "../loadingpage/LoadingPage";
import DeleteItemTypeController, { DeleteItemTypeParam } from "../../controllers/itemtypemanagement/DeleteItemTypeController";
import { redirect } from "../../utils/Redirector";
import LoadItemTypeByKeywordController, { LoadItemTypeByKeywordParam } from "../../controllers/itemmanagement/LoadItemTypeByKeyWordController";

import UpdateItemTypeController, { UpdateItemTypeParam } from "../../controllers/itemtypemanagement/UpdateItemTypeController";

import AddItemTypeController, { AddItemTypeParam } from "../../controllers/itemtypemanagement/AddItemTypeController";
import LoadLoggedInUserController, { LoadLoggedInUserParam } from "../../controllers/LoadLoggedInUserController";
import NoAccessPage from "../noaccesspage/NoAccessPage";
import ItemType from "../../entities/itemtype/ItemType";

export default function ItemTypeManagementPage(){
    //state
    const [ access, setAccess ] = useState<boolean | undefined>(undefined);
    const[itemType,setItemType] = useState<ItemType[] | undefined>(undefined);
    const[itemTypeInfo,setItemTypeInfo] = useState<any>({});
  

    const[keyword,setKeyword]= useState<string>("");

    const[insertItemType,setInsert] = useState(false);
    const[updateItemType,setUpdate] = useState(false);

   

    
    

    //controller
    const loadItemTypeController : Controller<LoadItemTypeControllerParam> = new LoadItemItypeController();
    const deleteItemTypeController : Controller<DeleteItemTypeParam> = new DeleteItemTypeController();
    const loadItemTypeByKeywordController: Controller<LoadItemTypeByKeywordParam> = new LoadItemTypeByKeywordController();
    const addItemTypeController : Controller<AddItemTypeParam> = new AddItemTypeController();
    const updateItemTypeController : Controller<UpdateItemTypeParam>= new UpdateItemTypeController();
    const loadLoggedInUserController: Controller<LoadLoggedInUserParam> = new LoadLoggedInUserController();

    //method
    function init(){
        loadLoggedInUserController.execute({
            onSuccess(user) {
                if (user.permission !== 'MANAGER') {
                    setAccess(false);
                    return;
                }

                setAccess(true);
            },
            onFailed(code, message) {
                setAccess(false);

                if (code !== 'NOT_LOGGED_IN' && code !== 'USER_NOT_EXIST') {
                    alert(`Code: ${code}, Message: ${message}`);
                }
            },
            onError(error) {
                alert(`Đã có lỗi xảy ra trong quá trình xử lý!`);
                console.error(error);
            },
        });

        loadItemTypeController.execute(
            {
                onSuccess:async function (itemType:ItemType[]) {
                    setItemType(itemType);
                },
                onError:console.error
            }
        )
    }

    //open,close form
    async function isOpenInserItemType() {
        setInsert(true);
        
    }
    async function isCloseInserItemType() {
        setInsert(false);
        
    }

    async function isOpenUpdateItemType() {
        setUpdate(true);
        
    }
    async function isCloseUpdateItemType() {
        setUpdate(false);
        
    }

    //insert
    async function onAddItemType(event:any) {
        event.preventDefault();

        if(!itemTypeInfo.id || !itemTypeInfo.name){
            alert("Vui lòng điền thông tin");
            return;
        }

        addItemTypeController.execute(
            {
                itemTypeInfo,
                onSuccess:function(){
                    alert("Thêm loại sản phẩm thành công");
                    redirect("/management/itemtype");

                },
                onFailed:function(code,message){
                    alert(`Code:${code} - Message${message}`)
                },
                onError:function(error){
                    console.error(error);
                }
            }
        )
    }

    // update 
    function onChangedFields({target}: any){
        setItemTypeInfo({...itemTypeInfo,[target.name]: target.value});
       

    }

    const onUpdate: FormEventHandler= async function (event) {
            event.preventDefault();
            if(!itemTypeInfo.id || !itemTypeInfo.name){
                alert("Vui lòng cập nhập thông tin cần cập nhập");
                return;
            }

        
            updateItemTypeController.execute({
                itemType : itemTypeInfo,
                onSuccess:() =>{
                    alert("Cập nhập thông tin thành công");
                },
                onFailed:function(code:string,message:string){
                    alert(`Code ${code},message : ${message}`)
                },
                onError:(error:any) =>{
                console.error(error);
                }
            })

       
        
    }

  

    //search by keyword
    async function onKeywordChange(event:any) {
        setKeyword(event.target.value);
    }
    async function onSearchButtonClick() {
        loadItemTypeByKeywordController.execute(
            {
                keyword,
                onSuccess:function(itemType){
                    setItemType(itemType);
                },
                onError:function(error:any){
                    console.error(error);
                }
            }
        )
        
    }

    //load itemtype
    async function onLoadItemType() {
        setItemType(undefined);
        loadItemTypeController.execute(
            {
                onSuccess:setItemType,
                onError:function(error:any){
                    console.error(error)
                }
            }
        )
        
    }
    
    //delete itemtype
    async function deleteItemType(event:any,id : string){
        //prevent default
        event.preventDefault();

        const confirmation = window.confirm("Bạn có chắc chắn muốn xóa loại sản phẩm này không?");

        if (confirmation) {
            deleteItemTypeController.execute(
                {
                    id:id,
                    onSuccess:async function () {
                        alert("Xóa thành công");
                        redirect("/management/itemtype");
                    },
                    onError: console.error
                }
            )
        }


    }

    useEffect(()=>{
        init();
    },[])

    return(
        (access === undefined || itemType === undefined)
        ?
        <LoadingPage/>
        :
        !access
        ?
        <NoAccessPage />
        :
        (
            <div className="w-full h-fit">
                
                    {/* Search-bar */}
            <div className="w-full h-16 flex items-center justify-start border border-black border-solid">
                        {/* Keyword input field */}
                <input type="text" placeholder="Từ khóa tìm kiếm" className="border border-black border-solid rounded-md p-2 pl-4 w-1/2 ml-3"
                        value={keyword} onChange={onKeywordChange}/>

                            {/* Search button */}
                <button className="bg-white p-2 pl-3 pr-3 border border-black border-solid rounded-md ml-3 hover:bg-gray-300"
                        onClick={onSearchButtonClick}>
                            Tìm kiếm
                </button>

                            {/* Reload button */}
                <button className="bg-white p-2 pl-3 pr-3 border border-black border-solid rounded-md ml-3 hover:bg-gray-300"
                        onClick={onLoadItemType}>
                            Tải lại
                </button>

                <button className="bg-green-600 text-white p-2 pl-3 pr-3 border border-black border-solid rounded-md ml-[250px] hover:bg-green-700 "
                        onClick={isOpenInserItemType}>
                            Thêm
                </button>
                        { insertItemType &&
                            (
                                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                                    <div className="bg-white rounded-lg shadow-lg p-6">
                                        <div className="mb-4">
                                                <input
                                                    type="text"
                                                    name="id"
                                                    className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-2"
                                                    placeholder="Mã loại sản phẩm"
                                                    required={true}
                                                    onChange={onChangedFields}
                                                />
                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-4"
                                                    placeholder="Tên loại sản phẩm"
                                                    required={true}
                                                    onChange={onChangedFields}
                                                />
                                        </div>
                                        
                                        <div className="flex justify-end">
                                            <button onClick={isCloseInserItemType} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                                                Hủy
                                            </button>
                                            
                                            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg ml-2 hover:bg-blue-600"
                                                onClick={(event)=>onAddItemType(event)}
                                            >Thêm</button>
                                        </div>
                                    </div>
                                </div>
                            )}
            </div>   

                <div >
                    <table  className=" w-full border border-black overflow-hidden border-collapse">
                            <thead>
                                <th className="sticky top-0 border border-black ">Mã</th>
                                <th className="sticky top-0 border border-black ">Tên</th>
                                <th className="sticky top-0 border border-black ">Hành động</th>
                            </thead>

                        {
                            itemType.map(
                                function(itemType : ItemType){
                                    return(

                                        <tbody className="text-center">
                                            <tr key={itemType.id}>
                                                {/*id*/}
                                                <td className="border border-black ">{itemType.id}</td>
                                                {/* name */}
                                                <td className="border border-black ">{itemType.name}</td>
                                                <td className="border border-black ">
                                                    <div >
                                                        <button 
                                                            className="border border-black rounded-lg p-2 w-[60px] bg-sky-500 text-white hover:bg-sky-600 mr-2" onClick={isOpenUpdateItemType}>Sửa</button>
                                                            { updateItemType &&
                                                                            (
                                                                                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-10">
                                                                                    <div className="bg-white rounded-lg shadow-lg p-6">
                                                                                        <div className="mb-4">
                                                                                                <input
                                                                                                    type="text"
                                                                                                    name="id"
                                                                                                    className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-2"
                                                                                                    placeholder="Mã loại sản phẩm"
                                                                                                    required={true}
                                                                                                    onChange={onChangedFields}
                                                                                                    value={itemType.id}
                                                                                                ></input>
                                                                                                <input
                                                                                                    type="text"
                                                                                                    name="name"
                                                                                                    className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-4"
                                                                                                    placeholder="Tên loại sản phẩm"
                                                                                                    required={true}
                                                                                                    onChange={onChangedFields}
                                                                                                    value={itemType.name}
                                                                                                   
                                                                                                ></input>
                                                                                                
                                                                                        </div>
                                                                                        
                                                                                        <div className="flex justify-end">
                                                                                            <button onClick={isCloseUpdateItemType} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                                                                                                Hủy
                                                                                            </button>
                                                                                            
                                                                                            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg ml-2 hover:bg-blue-600"
                                                                                                onClick={(event)=>onUpdate(event)}
                                                                                            >Sửa</button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                            }
                                                        {/* delete     */}
                                                        <button 
                                                            className="border border-black rounded-lg p-2 w-[60px] bg-red-600 text-white hover:bg-red-700"
                                                            onClick={(event) => deleteItemType(event,itemType.id)}>
                                                            Xóa</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    );
                                }
                            )
                        }
                    </table>
                </div>

                    
            </div>
        ) 
    )
}