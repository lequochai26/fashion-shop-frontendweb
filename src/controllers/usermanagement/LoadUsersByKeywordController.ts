import User from "../../entities/User";
import RestResponse from "../../interfaces/RestResponse";
import { apiFetch } from "../../utils/APIFetcher";
import Controller from "../Controller";

export default class LoadUsersByKeywordController implements Controller<LoadUsersByKeywordParam> {
    // Constructors:
    public constructor() {

    }

    // Methods:
    public async execute({ keyword, onSuccess, onError }: LoadUsersByKeywordParam): Promise<void> {
        // Keyword validatingS
        if (!keyword) {
            alert("Vui lòng nhập từ khóa tìm kiếm!");
            return;
        }

        // API Fetching
        await apiFetch({
            method: "GET",
            path: `/user?method=getByKeyword&keyword=${keyword}`,
            onSuccess: async function (response: Response) {
                // Get body
                const body: RestResponse<User[]> = await response.json();

                // Check if success true
                if (body.success) {
                    onSuccess(body.result as User[]);
                }
                else {
                    alert(`Code: ${body.code}, Message: ${body.message}`);
                }
            },
            onFailed: async function (error: any) {
                onError(error);
            },
        });
    }
}

export interface LoadUsersByKeywordParam {
    keyword: string;
    onSuccess(users: User[]): void;
    onError(error: any): void;
}