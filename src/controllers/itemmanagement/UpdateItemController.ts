import Metadata from "../../entities/Item/Metadata";
import RestResponse from "../../interfaces/RestResponse";
import { apiFetch } from "../../utils/APIFetcher";
import Controller from "../Controller";

export default class UpdateItemController implements Controller<UpdateItemParam> {
    // Constructors:
    public constructor() {

    }

    // Methods:
    public async execute({ form, onSuccess, onFailed, onError }: UpdateItemParam): Promise<void> {
        console.log(form);

        // Create form data
        const formData: FormData = new FormData();

        // Id
        if (form.id) {
            formData.set("id", form.id);
        }

        // Name
        if (form.name) {
            formData.set("name", form.name);
        }

        // Gender
        if (form.gender !== undefined) {
            formData.set("gender", `${form.gender}`);
        }

        // Price
        if (form.price !== undefined) {
            formData.set("price", `${form.price}`);
        }

        // BuyPrice
        if (form.buyPrice !== undefined) {
            formData.set("buyPrice", `${form.buyPrice}`);
        }

        // Amount
        if (form.amount !== undefined) {
            formData.set("amount", `${form.amount}`);
        }

        // Description
        if (form.description) {
            formData.set("description", form.description);
        }

        // Metadata
        if (form.metadata) {
            const metadata: Metadata = form.metadata;
            formData.set(
                "metadata",
                JSON.stringify(metadata.toJSON())
            );
        }

        // Avatar
        if (form.avatar) {
            formData.set("avatar", form.avatar);
        }

        // Type
        if (form.type) {
            formData.set("type", form.type);
        }

        // Brand
        if (form.brand) {
            formData.set("brand", form.brand);
        }

        // Images
        if (form.images) {
            for (const image of form.images) {
                formData.append("images", image);
            }
        }

        // API fetching
        await apiFetch({
            method: "PUT",
            path: "/item",
            body: formData,
            async onSuccess(response) {
                const { success, code, message }: RestResponse<undefined> = await response.json();

                if (success) {
                    onSuccess();
                }
                else {
                    onFailed(code as string, message as string);
                }
            },
            async onFailed(error) {
                onError(error);
            },
        });
    }
}

export interface UpdateItemParam {
    form: any,
    onSuccess(): void;
    onFailed(code: string, message: string): void;
    onError(error: any): void;
}