import Item from "../../entities/Item/Item";
import RestResponse from "../../interfaces/RestResponse";
import { apiFetch } from "../../utils/APIFetcher";
import Controller from "../Controller";

export default class GetItemController implements Controller<GetItemControllerParam> {
    //Methods:
    public async execute({ id, onSuccess, onError }: GetItemControllerParam): Promise<void> {
        apiFetch(
            {
                method: 'GET',
                path: `/item?method=get&id=${id}`,
                onSuccess: async function (response: Response) {
                    const body: RestResponse<Item> =  await response.json();

                    if(body.success) {
                        onSuccess(body.result as Item);
                    }
                },
                onFailed: async function (error: any) {
                    onError(error);
                }
            }
        );
    }
}

export interface GetItemControllerParam {
    id: string
    onSuccess: (item: Item) => void
    onError: (error: any) => void
} 