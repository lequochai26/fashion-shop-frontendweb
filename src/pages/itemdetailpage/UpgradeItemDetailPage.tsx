import { useEffect, useState } from "react"
import Item from "../../entities/Item/Item"
import { useLocation } from "react-router-dom";
import GetItemController, { GetItemControllerParam } from "../../controllers/itemdetail/GetItemController";
import Controller from "../../controllers/Controller";
import { API_URL } from "../../utils/APIFetcher";
import AddToCartController, { AddToCartParam } from "../../controllers/itemdetail/AddToCartController";
import LoadingPage from "../loadingpage/LoadingPage";


export default function UpgradeItemDetailPage() {
    //Get location 
    const location = useLocation();
    //Get query params from location
    const queryParams: URLSearchParams = new URLSearchParams(location.search);
    //Get id
    const id: string | null = queryParams.get('id');

    //Controllers:
    const getItemController: Controller<GetItemControllerParam> = new GetItemController();
    const addToCartController: Controller<AddToCartParam> = new AddToCartController();

    //States:
    const [item, setItem] = useState<Item>();
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
    const [metadata, setMetadata] = useState<any | undefined>(undefined);
    const [isButtonEnabled, setIsButtonEnabled] = useState<Boolean>(false);


    useEffect(() => {
        getMetadataProp();
    }, [metadata])

    const getMetadataProp = () => {
        if (item && item.metadata) {
            var optionsKey = Object.keys(item?.metadata.options);

            if (optionsKey) {
                //Tìm ra một mapping có các thuộc tính giống với thuộc tính của metadata đã được chọn
                const result = item?.metadata.mappings.find((mapping: any) => {
                    return optionsKey.every((key) => {
                        return metadata[key] === mapping[key];
                    })
                })

                if (result) {
                    setMetadata(result);
                    if (result.amount !== 0) {
                        setIsButtonEnabled(true);
                    } else {
                        setIsButtonEnabled(false);
                    }
                }
            }
        }
    }

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
                        },
                        onError: function (error: any) {
                            console.error(error);
                        }
                    }
                )
            }
        }, []);

    //Methods:
    const handleImageClick = (image: string) => {
        setSelectedImage(`${API_URL}` + image);
    }

    const onChangedMetadata = ({ target }: any) => {
        //Get name
        const name = target.name;

        //Get value
        const value = target.value;

        //Set state metadata
        setMetadata({ ...metadata, [name]: value });
    }
    console.log(metadata);

    const dongVietNam = "\u20AB";
    const getPriceDefault = () => {
        const result = item?.metadata.mappings.sort((a: any, b: any) => a.price - b.price);
        return `${result[0].price} - ${dongVietNam}${result[result.length - 1].price}`;
    }
    const sumAmount = (mappings: any) => {
        let totalAmount = 0;
        mappings.forEach((item: any) => {
            totalAmount += item.amount;
        });
        return totalAmount;
    };

    const onAddToCartButtonClick = async (item: Item) => {
        if (metadata) {
            //Create metadata without "price, amount, buyPrice"
            var filteredMetadata = Object.keys(metadata)
                .filter(key => key !== "price" && key !== "amount" && key !== "buyPrice")
                .reduce((obj: any, key) => {
                    obj[key] = metadata[key];
                    return obj;
                }, {});
        }

        addToCartController.execute(
            {
                item: item,
                metadata: metadata ? filteredMetadata : undefined,
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
                                    src={`${API_URL}${image}`}
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
                            <b>Giá:</b>
                            {dongVietNam}{item.metadata ? (metadata?.price !== undefined ? metadata.price : getPriceDefault()) : item.price}
                        </p><br />

                        {/* Amount */}
                        <p>
                            <b>Số lượng: </b>
                            {item.metadata ? (metadata?.amount !== undefined ? metadata.amount : sumAmount(item.metadata.mappings)) : item.amount}
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
                                        Object.keys(item.metadata.options).map(
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
                    item?.metadata.options[optionKey].map(
                        (option: string) => (
                            <div className="inline-block">
                                <input type="radio" name={optionKey} id={optionKey} value={option} className="mr-1 ml-3" onChange={onChangedMetadata} />
                                <label htmlFor={option} className="mr-5"> {option} </label>
                            </div>
                        )
                    )
                }
            </p>
        )
    }
}