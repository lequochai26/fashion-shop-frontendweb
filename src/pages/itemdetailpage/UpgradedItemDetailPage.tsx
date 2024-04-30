import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import Controller from "../../controllers/Controller";
import { API_URL, makeAPIUrl } from "../../utils/APIFetcher";
import LoadingPage from "../loadingpage/LoadingPage";
import UpgradedGetItemController, { UpgradedGetItemParam } from "../../controllers/itemdetail/UpgradedGetItemController";
import Item from "../../entities/Item/model/Item";
import UpgradedAddToCartController, { UpgradedAddToCartParam } from "../../controllers/itemdetail/UpgradedAddToCartController";

export default function UpgradedItemDetailPage() {
    //Get location 
    const location = useLocation();
    //Get query params from location
    const queryParams: URLSearchParams = new URLSearchParams(location.search);
    //Get id
    const id: string | null = queryParams.get('id');

    //Controllers:
    const getItemController: Controller<UpgradedGetItemParam> = new UpgradedGetItemController();

    const addToCartController: Controller<UpgradedAddToCartParam> = new UpgradedAddToCartController();

    //States:
    const [item, setItem] = useState<Item>();
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
    const [isButtonEnabled, setIsButtonEnabled] = useState<Boolean>(false);
    const [metadata, setMetadata] = useState<any | undefined>(undefined);

    useEffect(
        function () {
            if (id) {
                getItemController.execute(
                    {
                        id: id,
                        onSuccess: (item: Item) => {
                            setItem(item);
                            if (!item.metadata && item.amount !== 0) {
                                setIsButtonEnabled(true);
                            }
                        }, onFailed: (code, message) => {
                            alert(`Code: ${code} - Message: ${message}`)
                        },
                        onError: function (error: any) {
                            console.error(error);
                        }
                    }
                )
            }
        }, []);

    useEffect( function() {
        const result = item?.metadata?.getMapping(metadata);
        if(result && result.amount > 0) {
            setIsButtonEnabled(true);
        } else {
            setIsButtonEnabled(false);
        }
    },[metadata])

    //Methods:
    const handleImageClick = (image: string) => {
        setSelectedImage(makeAPIUrl(image));
    }

    const onChangeMapping = ({ target }: any) => {
        //Get name
        const name = target.name;

        //Get value
        const value = target.value;

        //Set state metadata
        setMetadata({ ...metadata, [name]: value });
    }

    const sumAmount = (mappings: any) => {
        let totalAmount = 0;
        mappings.forEach((mapping: any) => {
            totalAmount += mapping.amount;
        });
        return totalAmount;
    };

    function getPriceMapping() {
        if (metadata && item?.getPriceVND(metadata)) {
            return item.getPriceVND(metadata);
        }
        return `${item?.getLowestPriceVND()} - ${item?.getHighestPriceVND()}`
    }

    function getAmountMapping() {
        //Get amount mapping
        const amount = item?.getAmount(metadata);

        //Amount undefined case
        if (amount === undefined) {
            let totalAmount: number = 0;
            item?.metadata?.Mappings.forEach((mapping: any) => {
                totalAmount += mapping.amount;
            });
            return totalAmount;
        }

        return amount;
    }

    const onAddToCartButtonClick = async (item: Item) => {
        addToCartController.execute(
            {
                id: item.id as string,
                metadata: metadata,
                onSuccess: function () {
                    (window as any).reloadGeneralHeader();
                    alert("Thêm sản phẩm vào giỏ hàng thành công!")
                },
                onError: function (error: any) {
                    alert("Đã có lỗi xảy ra!");
                    console.error(error);
                }
            }
        )
    }


    //Element:
    return (
        !item
            ? <LoadingPage />
            : (<div className="flex overflow-x-auto mt-4">

                {/* left content */}
                <div className="w-2/5 ml-56">
                    {/* Item display */}
                    <div className="border border-black mx-auto w-[400px] h-[400px]">
                        <img
                            src={
                                selectedImage ? selectedImage : (item && `${API_URL}${item.avatar}`)
                            }
                            alt="avatar item"
                            className="w-96 h-96 pr-3 pl-6 pt-5"
                        />
                    </div>

                    {/* List ItemImage */}
                    <div className="flex overflow-x-auto mt-3 ml-4 w-[400px] h-[100px]">
                        <img
                            src={
                                item && `${API_URL}${item.avatar}`
                            }
                            alt="ItemImage"
                            className="w-[85px] h-[85px] mr-1 ml-1"
                            onClick={() => handleImageClick(item?.avatar as string)}
                        />
                        {
                            item?.images && item.images.map((image) => (
                                <img
                                    src={makeAPIUrl(image)}
                                    alt="ItemImage"
                                    className="w-[85px] h-[85px] mr-1 ml-1"
                                    onClick={() => handleImageClick(image)}
                                />
                            ))
                        }
                    </div>
                </div>

                {/* Right Content */}
                <div className="w-3/5 mr-40 pl-10">
                    <div className="w-full h-auto text-lg">
                        {/* Name */}
                        <p className="font-bold text-xl">
                            <label className="bg-red-600 mr-2 text-white rounded font-normal text-base"> Mall</label>{item && item.name}
                        </p><br />

                        {/* Price */}
                        <p className="text-lg">
                            <b>Giá: </b>
                            {
                                item.metadata !== undefined
                                    ? getPriceMapping()
                                    : item.getPriceVND()
                            }
                        </p><br />

                        {/* Amount */}
                        <p>
                            <b>Số lượng: </b>
                            {
                                item.metadata !== undefined
                                    ? getAmountMapping()
                                    : item.amount
                            }
                        </p><br />

                        {/* Description */}
                        <p>
                            <b>Mô tả:</b>  {item && item.description}
                        </p>

                        {/* Metadate */}
                        <br /><p>
                            <b>Phân loại:</b> {!item.metadata && "Không có phân loại"}
                        </p>

                        {
                            item.metadata && (
                                <>
                                    {
                                        Object.keys(item.metadata.Options).map(
                                            (optionKey) => (
                                                OptionMetadata(optionKey)
                                            )
                                        )
                                    }
                                </>
                            )
                        }


                        <>
                            <br /><br /><button
                                id="myButton"
                                type="submit"
                                className={`border border-black rounded p-1 ml-40 cursor-pointer ${isButtonEnabled ? '' : 'opacity-50'}`}
                                onClick={() => onAddToCartButtonClick(item)}
                                disabled={!isButtonEnabled}
                            >
                                Thêm vào giỏ hàng
                            </button>
                        </>

                    </div>
                </div>
            </div>
            )
    )

    function OptionMetadata(optionKey: string) {
        return (
            <p>{`${optionKey}:`}
                {
                    item?.metadata?.Options[optionKey].map(
                        (option: string) => (
                            <div className="inline-block">
                                <input type="radio" name={optionKey} id={optionKey} value={option} className="mr-1 ml-3" onChange={onChangeMapping} />
                                <label htmlFor={option} className="mr-5"> {option} </label>
                            </div>
                        )
                    )
                }
            </p>
        )
    }
}