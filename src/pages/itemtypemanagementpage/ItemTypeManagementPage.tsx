import { useEffect, useState } from "react";
import ItemType from "../../entities/Item/ItemType";
import Controller from "../../controllers/Controller";
import LoadItemItypeController, { LoadItemTypeControllerParam } from "../../controllers/itemtypemanger/LoadItemTypeController";
import LoadingPage from "../loadingpage/LoadingPage";
import DeleteItemTypeController, { DeleteItemTypeParam } from "../../controllers/itemtypemanger/DeleteItemTypeController";
import { redirect } from "../../utils/Redirector";

export default function ItemTypeManagementPage(){
    //state
    const[itemType,setItemType] = useState<ItemType[]>();

    //controller
    const loadItemTypeController : Controller<LoadItemTypeControllerParam> = new LoadItemItypeController();
    const deleteItemTypeController : Controller<DeleteItemTypeParam> = new DeleteItemTypeController();

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

    //delete itemtype
    function deleteItemType(event:any,id : string){
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
                             //  value={keyword} onChange={onKeywordChange} 
                             />
    
                             {/* Search button */}
                             <button
                                 className="bg-white p-2 pl-3 pr-3 border border-black border-solid rounded-md ml-3"
                                 // onClick={onSearchButtonClick}
                             >
                                 Tìm kiếm
                             </button>
    
                             {/* Reload button */}
                             <button
                                 className="bg-white p-2 pl-3 pr-3 border border-black border-solid rounded-md ml-3"
                                 // onClick={onReloadButtonClick}
                             >
                                 Tải lại
                             </button>
    
                             <button
                                 className="bg-green p-2 pl-3 pr-3 border border-black border-solid rounded-md ml-3 ml-[250px] hover:bg-gray-300 "
                                 // onClick={onReloadButtonClick}
                             >
                                 Thêm
                             </button>
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