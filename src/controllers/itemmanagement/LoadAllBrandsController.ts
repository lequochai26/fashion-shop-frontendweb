import Brand from "../../entities/brand/Brand";
import RestResponse from "../../interfaces/RestResponse";
import { apiFetch } from "../../utils/APIFetcher";
import Controller from "../Controller";

export default class LoadAllBrandsController implements Controller<LoadAllBrandsParam> {
    // Constructors:
    public constructor() {

    }

    // Methods:
    public async execute({ onError, onFailed, onSuccess }: LoadAllBrandsParam): Promise<void> {
        await apiFetch({
            method: "GET",
            path: "/brand?method=getAll",
            async onSuccess(response) {
                const body: RestResponse<Brand[]> = await response.json();

                if (body.success) {
                    onSuccess(body.result as Brand[]);
                }
                else {
                    onFailed(body.code as string, body.message as string);
                }
            },
            async onFailed(error) {
                onError(error);
            },
        });
    }
}

export interface LoadAllBrandsParam {
    onSuccess(brands: Brand[]): void;
    onFailed(code: string, message: string): void;
    onError(error: any): void;
}