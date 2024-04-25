import { useEffect, useState } from "react"
import Item from "../../entities/Item/Item"
import { useLocation } from "react-router-dom";
import GetItemController, { GetItemControllerParam } from "../../controllers/itemdetail/GetItemController";
import Controller from "../../controllers/Controller";
import { API_URL } from "../../utils/APIFetcher";
import AddToCartController, { AddToCartParam } from "../../controllers/itemdetail/AddToCartController";
import LoadingPage from "../loadingpage/LoadingPage";

interface Metadata {
    size?: string;
    color?: string;
    amount?: number;
    price?: number;
}

export default function ItemDetailPage() {
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
    const [metadata, setMetadata] = useState<Metadata | undefined>(undefined);

    useEffect(() => {
        if (metadata?.size && metadata.color) {
            const result = item?.metadata.mappings.find((mapping: Metadata) => {
                return mapping.size === metadata.size && mapping.color === metadata.color;
            });

            if (result) {
                setMetadata(result);
            }
        }
    }, [metadata])

    useEffect(
        function () {
            if (id) {
                getItemController.execute(
                    {
                        id: id,
                        onSuccess: (item: Item) => {
                            setItem(item);
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

    const dongVietNam = "\u20AB";
    const getPriceDefault = () => {
        const result = item?.metadata.mappings.sort((a: any, b: any) => a.price - b.price);
        console.log(result);
        return `${result[0].price} - $${result[result.length - 1].price}`;
    }
    const sumAmount = (mappings: any) => {
        let totalAmount = 0;
        mappings.forEach((item: any) => {
            totalAmount += item.amount;
        });
        return totalAmount;
    };

    const onAddToCartButtonClick = (item: Item) => {
        console.log(metadata)
        if (item.metadata && (metadata?.color === undefined || metadata.size === undefined)) {
                alert("Vui lòng lựa chọn phân loại trước khi thêm vào giỏ hàng!");
                return;
        }

        addToCartController.execute(
            {
                item: item,
                metadata: metadata ? {
                    size: metadata?.size,
                    color: metadata?.color
                } : undefined,
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
                        <p className="text-lg">Giá: ${item.metadata ? (metadata?.price ? metadata.price : (item && getPriceDefault())) : item.price}</p><br />

                        {/* Amount */}
                        <p>Số lượng: {item.metadata ? (metadata?.amount ? metadata.amount : (item && sumAmount(item.metadata.mappings))) : item.amount}</p><br />

                        {/* Description */}
                        <p> Mô tả: {item && item.description} </p>

                        {/* Metadate */}
                        <br /><p>Phân loại: {!item.metadata && "Không có phân loại"}</p>

                        {
                            (item && item.metadata) && (
                                <>
                                    <p>Size:
                                        {
                                            item.metadata.options.size.map(
                                                (size: string) => (
                                                    <>
                                                        <input type="radio" name="size" id={size} value={size} className="mr-1 ml-3" onChange={onChangedMetadata} />
                                                        <label htmlFor={size} className="mr-5"> {size} </label>
                                                    </>
                                                )
                                            )
                                        }
                                    </p>

                                    {/* Color */}
                                    <br /><p>Màu:
                                        {
                                            item.metadata.options.color.map(
                                                (color: string) => (
                                                    <>
                                                        <input type="radio" name="color" id={color} value={color} className="mr-1 ml-2" onChange={onChangedMetadata} />
                                                        <label htmlFor={color} className="mr-5">{color}</label>
                                                    </>
                                                )
                                            )
                                        }
                                    </p>
                                </>
                            )
                        }



                        {/* {
                            (item && metadata?.size && metadata.color) && */}
                        <>
                            <br /><br /><button
                                id="myButton"
                                type="submit"
                                className="border border-black rounded p-1 ml-40 cursor-pointer "
                                onClick={() => onAddToCartButtonClick(item)}
                            >
                                Thêm vào giỏ hàng
                            </button>
                        </>
                        {/* } */}

                    </div>
                </div>
            </div>
            )
    )
}