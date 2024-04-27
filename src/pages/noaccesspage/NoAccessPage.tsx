import { redirect } from "../../utils/Redirector";


export default function NoAccessPage() {
    // Event handlers:
    async function onBackButtonClick() {
        redirect("/");
    }

    // Design:
    return (
        <div className="w-full h-full flex flex-col justify-center">
            <p
                className="font-bold text-3xl text-center mb-5"
            >
                Không thể truy cập vào trang này!
            </p>

            <div
                className="flex flex-row justify-center"
            >
                <button className="border border-black border-solid rounded-md py-2 px-5" onClick={onBackButtonClick}>
                    Quay về trang chủ
                </button>
            </div>
        </div>
    );
}