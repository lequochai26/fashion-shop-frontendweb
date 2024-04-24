import { useEffect, useState } from "react";
import ItemType from "../../entities/Item/ItemType";
import Controller from "../../controllers/Controller";
import LoadItemItypeController, { LoadItemTypeControllerParam } from "../../controllers/itemtypemanger/LoadItemTypeController";
import LoadingPage from "../loadingpage/LoadingPage";
import DeleteItemTypeController, { DeleteItemTypeParam } from "../../controllers/itemtypemanger/DeleteItemTypeController";
import { redirect } from "../../utils/Redirector";
import LoadItemTypeByKeywordController, { LoadItemTypeByKeywordParam } from "../../controllers/itemmanagementpage/LoadItemTypeByKeyWordController";

export default function ItemTypeManagementPage(){
    //state
    const[itemType,setItemType] = useState<ItemType[]>();
    const[keyword,setKeyword]= useState<string>("");

    const[insertItemType,setInsert] = useState(false);

    //controller
    const loadItemTypeController : Controller<LoadItemTypeControllerParam> = new LoadItemItypeController();
    const deleteItemTypeController : Controller<DeleteItemTypeParam> = new DeleteItemTypeController();
    const loadItemTypeByKeywordController: Controller<LoadItemTypeByKeywordParam> = new LoadItemTypeByKeywordController();

    //method
    function init(){
        loadItemTypeController.execute(
            {
                onSuccess:async function (itemType:ItemType[]) {
                    setItemType(itemType);
                },
                onError:console.error
            }
        )
    }

    //
    async function isOpenInserItemType() {
        setInsert(true);
        
    }
    async function isCloseInserItemType() {
        setInsert(false);
        
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
                        redirect("/itemtypemanagementpage");
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
        !itemType
            ? <LoadingPage/>       
            :(
            <div className="w-full h-fit">
                 
                     {/* Search-bar */}
                     <div className="w-full h-16 flex items-center justify-start border border-black border-solid">
                         {/* Keyword input field */}
                             <input type="text" placeholder="Từ khóa tìm kiếm" className="border border-black border-solid rounded-md p-2 pl-4 w-1/2 ml-3"
                              value={keyword} onChange={onKeywordChange} 
                             />
    
                             {/* Search button */}
                             <button
                                 className="bg-white p-2 pl-3 pr-3 border border-black border-solid rounded-md ml-3 hover:bg-gray-300"
                                 onClick={onSearchButtonClick}
                             >
                                 Tìm kiếm
                             </button>
    
                             {/* Reload button */}
                             <button
                                 className="bg-white p-2 pl-3 pr-3 border border-black border-solid rounded-md ml-3 hover:bg-gray-300"
                                 onClick={onLoadItemType}
                             >
                                 Tải lại
                             </button>
    
                             <button
                                 className="bg-green p-2 pl-3 pr-3 border border-black border-solid rounded-md ml-3 ml-[250px] hover:bg-gray-300 "
                                  onClick={isOpenInserItemType}
                             >
                                 Thêm
                             </button>
                             { insertItemType &&(
                                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                                <div className="bg-white rounded-lg shadow-lg p-6">
                                  <div className="mb-4">
                                        <input
                                            type="text"
                                            className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-2"
                                            placeholder="Mã loại sản phẩm"
                                        />
                                        <input
                                            type="text"
                                            className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-4"
                                            placeholder="Tên loại sản phẩm"
                                        />
                                  </div>
                                  <div className="flex justify-end">
                                    <button onClick={isCloseInserItemType} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                                      Hủy
                                    </button>
                                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg ml-2 hover:bg-blue-600">Thêm</button>
                                  </div>
                                </div>
                              </div>
                             )

                             }
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
                                                                className="border border-black rounded-lg p-2 w-[60px] hover:bg-gray-300 mr-2">Sửa</button>
                                                            <button 
                                                                className="border border-black rounded-lg p-2 w-[60px] hover:bg-gray-300"
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