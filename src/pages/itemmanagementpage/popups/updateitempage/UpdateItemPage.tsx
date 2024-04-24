import { useEffect, useState } from "react";
import Metadata, { Mapping } from "../../../../entities/Item/Metadata";
import ItemType from "../../../../entities/itemtype/ItemType";
import Brand from "../../../../entities/brand/Brand";
import Controller from "../../../../controllers/Controller";
import LoadAllItemTypesController, { LoadAllItemTypesParam } from "../../../../controllers/LoadAllItemTypesController";
import LoadingPage from "../../../loadingpage/LoadingPage";
import LoadAllBrandsController, { LoadAllBrandsParam } from "../../../../controllers/LoadAllBrandsController";
import Item from "../../../../entities/Item/Item";
import { makeAPIUrl } from "../../../../utils/APIFetcher";

export default function UpdateItemPage({ item, onSubmit, onCancel }: UpdateItemPageParam) {
    // States:
    const [ target, setTarget ] = useState<Item>(item);
    const [ form, setForm ] = useState<{ [ index: string ]: any, metadata?: Metadata | undefined }>({ gender: item.gender, price: item.price, buyPrice: item.buyPrice, amount: item.amount, metadata: (item.metadata && new Metadata(item.metadata)) });
    const [ selection, setSelection ] = useState<any | undefined>(undefined);
    const [ itemTypes, setItemTypes ] = useState<ItemType[] | undefined>(undefined);
    const [ brands, setBrands ] = useState<Brand[] | undefined>(undefined);

    // Controllers:
    const loadAllItemTypesController: Controller<LoadAllItemTypesParam> = new LoadAllItemTypesController();
    const loadAllBrandsController: Controller<LoadAllBrandsParam> = new LoadAllBrandsController();
    // Init:
    function init() {
        loadAllItemTypesController.execute({
            onSuccess: setItemTypes,
            onFailed(code, message) {
                alert(`Code: ${code}, Message: ${message}`);
            },
            onError(error) {
                alert("Đã có lỗi xảy ra trong quá trình thực thi!");
                console.error(error);
            },
        });

        loadAllBrandsController.execute({
            onSuccess: setBrands,
            onFailed(code, message) {
                alert(`Code: ${code}, Message: ${message}`);
            },
            onError(error) {
                alert("Đã có lỗi xảy ra trong quá trình thực thi!");
                console.error(error);
            },
        });
    }
    useEffect(init, []);

    // Operations:
    function getNumber(target: "amount" | "price" | "buyPrice"): number {
        if (selection && form.metadata) {
            const mapping = form.metadata.getMapping(selection);

            if (mapping) {
                return mapping[target];
            }
        }

        return form[target];
    }

    // Event handlers:
    async function onFieldChange(event: any) {
        // Get target
        const target: HTMLInputElement = event.target;

        // Avatar case
        if (target.name === 'avatar') {
            setForm({ ...form, [ target.name ]: target.files && target.files.length > 0 && target.files[0] });
            return;
        }

        // Images case
        if (target.name === "images") {
            setForm({ ...form, [ target.name ]: (target.files && Array.from(target.files)) });
            return;
        }

        // Gender case
        if (target.name === 'gender') {
            setForm({ ...form, [ target.name ]: (target.value === 'Nam') });
            return;
        }

        // Price buyPrice amount case
        if (target.name === 'price' || target.name === 'buyPrice' || target.name === 'amount') {
            const val = target.valueAsNumber;
            
            if (Number.isNaN(val) || val < 0) {
                return;
            }

            if (selection && form.metadata) {
                const mapping: Mapping | undefined = form.metadata.getMapping(selection);

                if (mapping) {
                    mapping[target.name] = val;
                    setForm({ ...form });
                    return;
                }
            }

            setForm({ ...form, [ target.name ]: val });
        }

        // Default case
        setForm({ ...form, [ target.name ]: target.value });
    }

    async function onSelectionChange(option: string, selectionName: string) {
        setSelection({ ...selection, [option]: selectionName });
    }

    // Styles:
    const fieldStyle: string = "w-4/5 p-2 text-xl border border-black border-solid rounded-md";

    // Design:
    return (
        <div className="fixed left-0 top-0 w-screen h-screen bg-black bg-opacity-50 flex flex-col justify-center items-center">
            {
                !itemTypes || !brands
                ?
                <LoadingPage />
                :
                // New item page
                <div className="w-3/4 h-5/6 bg-white border border-black border-solid overflow-y-scroll flex flex-row justify-between flex-wrap">
                    {/* Left panel */}
                    <div className="w-fit flex flex-col justify-start p-3">
                        {/* Avatar */}
                        <div>
                            <label htmlFor="avatar" className="cursor-pointer">
                                <img
                                    alt="Avatar select"
                                    src={
                                        form.avatar
                                        ? URL.createObjectURL(form.avatar)
                                        : makeAPIUrl(target.avatar)
                                    }
                                    className="w-56 h-56"
                                />
                            </label>

                            <input
                                type="file"
                                id="avatar"
                                name="avatar"
                                className="hidden"
                                onChange={onFieldChange}
                            />
                        </div>
                    </div>

                    {/* Right panel */}
                    <div
                        className="flex-1 flex flex-col justify-start p-3 text-lg"
                    >
                        {/* Id */}
                        <div className="mb-7">
                            <label className='font-bold text-xl'>
                                { target.id }
                            </label>
                        </div>

                        {/* Name */}
                        <div className="mb-7">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                onChange={onFieldChange}
                                value={form.name}
                                placeholder={`Tên sản phẩm: ${item.name}`}
                                className={fieldStyle}
                            />
                        </div>

                        {/* Gender */}
                        <div className="flex flex-row justify-start items-center mb-7">
                            <label
                                className="font-bold mr-3"
                            >
                                Giới tính phù hợp:
                            </label>

                            <input
                                type="radio"
                                id="genderMale"
                                name="gender"
                                value="Nam"
                                checked={form.gender}
                                onChange={onFieldChange}
                            />

                            <label htmlFor="genderMale" className="mr-3">
                                Nam
                            </label>

                            <input
                                type="radio"
                                id="genderFemale"
                                name="gender"
                                value="Nữ"
                                checked={!form.gender}
                                onChange={onFieldChange}
                            />

                            <label htmlFor="genderFemale">
                                Nữ
                            </label>
                        </div>

                        {/* Price */}
                        <div className="flex flex-row justify-start items-center mb-7">
                            <label
                                className="font-bold mr-3"
                            >
                                Đơn giá:
                            </label>

                            <input
                                type="number"
                                name="price"
                                className={`${fieldStyle} flex-1 mr-10`}
                                value={getNumber("price")}
                                onChange={onFieldChange}
                            />
                        </div>

                        {/* Buy price */}
                        <div className="flex flex-row justify-start items-center mb-7">
                            <label
                                className="font-bold mr-3"
                            >
                                Giá nhập:
                            </label>

                            <input
                                type="number"
                                name="buyPrice"
                                className={`${fieldStyle} flex-1 mr-10`}
                                value={getNumber("buyPrice")}
                                onChange={onFieldChange}
                            />
                        </div>

                        {/* Amount */}
                        <div className="flex flex-row justify-start items-center mb-7">
                            <label
                                className="font-bold mr-3"
                            >
                                Số lượng tồn:
                            </label>

                            <input
                                type="number"
                                name="amount"
                                className={`${fieldStyle} flex-1 mr-10`}
                                value={getNumber("amount")}
                                onChange={onFieldChange}
                            />
                        </div>

                        {/* Description */}
                        <div className="h-40 mb-7">
                            <textarea
                                name="description"
                                placeholder={`Mô tả: ${item.description}`}
                                className="w-full h-full border border-black border-solid rounded-md p-2"
                                value={form.description}
                                onChange={onFieldChange}
                            >
                            </textarea>
                        </div>

                        {/* Metadata */}
                        <div
                            className="flex flex-col justify-start mb-3"
                        >
                            {/* Title */}
                            <div className="flex flex-row justify-start items-center">
                                <label className="font-bold text-xl mr-5">
                                    Phân loại:
                                </label>
                            </div>

                            {
                                form.metadata
                                &&
                                Object.entries(form.metadata.Options).map(
                                    ([ option, selections ]) => (
                                        <>
                                            {/* Option */}
                                            <div
                                                className="flex flex-row justify-start items-center"
                                            >
                                                <label
                                                    className="mr-3 cursor-pointer"
                                                >
                                                    { option }
                                                </label>
                                            </div>

                                            {/* Selections */}
                                            <div
                                                className="flex flex-row justify-start items-center flex-wrap"
                                            >
                                                {
                                                    selections.map(
                                                        selectionStr => (
                                                            <div className="m-1">
                                                                <input
                                                                    name={option}
                                                                    type="radio"
                                                                    className="mr-1"
                                                                    onChange={
                                                                        () => onSelectionChange(option, selectionStr)
                                                                    }
                                                                    checked={
                                                                        selection
                                                                        ?
                                                                        selection[option] === selectionStr
                                                                        :
                                                                        false
                                                                    }
                                                                />

                                                                <label
                                                                    className="mr-3 cursor-pointer"
                                                                >
                                                                    { selectionStr }
                                                                </label>
                                                            </div>
                                                        )
                                                    )
                                                }

                                                
                                            </div>
                                        </>
                                    )
                                )
                            }
                        </div>

                        {/* ItemType */}
                        <div className="mb-7">
                            <select
                                className={fieldStyle}
                                name="type"
                                onChange={onFieldChange}
                                value={
                                    form.type
                                    ?
                                    form.type
                                    :
                                    item.type?.id
                                }
                            >
                                <option value={undefined}>
                                    Không
                                </option>

                                {
                                    itemTypes.map(
                                        itemType => (
                                            <option value={itemType.id}>{ itemType.name }</option>
                                        )
                                    )
                                }
                            </select>
                        </div>

                        {/* Brand */}
                        <div className="mb-7">
                            <select
                                className={fieldStyle}
                                name="brand"
                                onChange={onFieldChange}
                                value={
                                    form.brand
                                    ?
                                    form.brand
                                    :
                                    item.brand?.id
                                }
                            >
                                <option value={undefined}>
                                    Không
                                </option>

                                {
                                    brands.map(
                                        brand => (
                                            <option value={brand.id}>{ brand.name }</option>
                                        )
                                    )
                                }
                            </select>
                        </div>

                        {/* Images */}
                        <div className="text-nowrap overflow-x-scroll">
                            {/* Images */}
                            {
                                form.images
                                ?
                                form.images.map(
                                    (image: any) => (
                                        <div className="inline-block border border-black border-solid">
                                            <img
                                                alt="Select images"
                                                src={URL.createObjectURL(image)}
                                                className="w-28 h-28"
                                            />
                                        </div>
                                    )
                                )
                                :
                                item.images
                                &&
                                item.images.map(
                                    image => (
                                        <div className="inline-block border border-black border-solid">
                                            <img
                                                alt="Select images"
                                                src={makeAPIUrl(image)}
                                                className="w-28 h-28"
                                            />
                                        </div>
                                    )
                                )
                            }

                            {/* Select images */}
                            <div className="inline-block border border-black border-solid">
                                <label htmlFor="images">
                                    <img
                                        alt="Select images"
                                        src="/select_image.png"
                                        className="cursor-pointer w-28 h-28"
                                    />
                                </label>

                                <input
                                    type="file"
                                    id="images"
                                    name="images"
                                    className="hidden"
                                    onChange={onFieldChange}
                                    multiple={true}
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="text-right">
                            {/* Cancel button */}
                            <button
                                className="border border-black border-solid p-1 px-4 rounded-md cursor-pointer"
                                onClick={onCancel}
                            >
                                Hủy
                            </button>

                            {/* Submit button */}
                            <button
                                className="p-1 px-4 rounded-md bg-sky-500 text-white cursor-pointer ml-5"
                                onClick={() => {onSubmit(form)}}
                            >
                                Sửa
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export interface UpdateItemPageParam {
    item: Item;
    onSubmit(form: { [ index: string ]: any, metadata?: Metadata | undefined }): void;
    onCancel(): void;
}