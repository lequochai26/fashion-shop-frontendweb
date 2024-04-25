import { useState } from "react";

export default function NewItemPagePopup({ mode, option, selection, onSuccess, onCancel }: NewItemPagePopupParam) {
    // States:
    const [ content, setContent ] = useState<string>("");

    // Event handlers:
    async function onContentChange(event: any) {
        const target: HTMLInputElement = event.target;
        setContent(target.value);
    }

    // Design:
    return (
        <div className="fixed left-0 top-0 h-screen w-screen flex flex-col justify-center items-center bg-black bg-opacity-50">
            <div className="h-fit w-fit bg-white border border-black border-solid rounded-md p-3">

                {/* Title */}
                {
                    (mode === "NEW_SELECTION" || mode === "EDIT_SELECTION")
                    &&
                    <div className="text-lg font-bold">
                        Phân loại: { option }
                    </div>
                }
                
                {/* Input field */}
                <input
                    type="text"
                    placeholder={
                        mode === "EDIT_OPTION"
                        ?
                        `Tên phân loại: ${option}`
                        :
                        mode === "EDIT_SELECTION"
                        ?
                        `Tên lựa chọn: ${selection}`
                        :
                        mode === "NEW_OPTION"
                        ?
                        "Tên phân loại"
                        :
                        "Tên tùy chọn"
                    }
                    value={content}
                    onChange={onContentChange}
                    className="border border-black border-solid p-2 rounded-md w-80 mb-7"
                />

                {/* Actions */}
                <div className="text-right">
                    {/* Cancel button */}
                    <button
                        className="cursor-pointer p-1 px-3 rounded-md text-white bg-red-600 mr-3"
                        onClick={onCancel}
                    >
                        Hủy
                    </button>

                    {/* Submit button */}
                    {
                        mode === "NEW_OPTION" || mode === "NEW_SELECTION"
                        ?
                        <button
                            className="cursor-pointer p-1 px-3 rounded-md text-white bg-green-600"
                            onClick={() => onSuccess(content)}
                        >
                            Thêm
                        </button>
                        :
                        <button
                            className="cursor-pointer p-1 px-3 rounded-md text-white bg-sky-500"
                            onClick={() => onSuccess(content)}
                        >
                            Sửa
                        </button>
                    }
                </div>

            </div>
        </div>
    );
}

export interface NewItemPagePopupParam {
    mode: "NEW_OPTION" | "NEW_SELECTION" | "EDIT_OPTION" | "EDIT_SELECTION";
    option?: string | undefined;
    selection?: string | undefined;
    onSuccess(content: string): void;
    onCancel(): void;
}