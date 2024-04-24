import RestResponse from "../../interfaces/RestResponse";
import { apiFetch } from "../../utils/APIFetcher";
import Controller from "../Controller";

export default class CreateUserControlelr implements Controller<CreateUserControlelrParam> {
 // Constructors:
 public constructor() {

 }

 // Methods:
 public async execute({ userInfo, onSuccess, onError, onFailed }: CreateUserControlelrParam): Promise<void> {
     // Create form data
     const formData: FormData = new FormData();

     formData.set("email", userInfo.email);
     formData.set("password", userInfo.password);
     formData.set("avatar", userInfo.avatar);
     formData.set("fullName", userInfo.fullName);
     formData.set("address", userInfo.address);
     formData.set("phoneNumber", userInfo.phoneNumber);
     formData.set("gender", `${userInfo.gender}`);
     formData.set("permission",userInfo.permission);

     // Make request
     await apiFetch({
         method: "POST",
         path: "/user?method=new",
         body: formData,
         onSuccess: async function (response: Response) {
             const { success, code, message }: RestResponse<undefined> = await response.json();

             if (success) {
                 onSuccess();
             }
             else {
                 onFailed(code as string, message as string);
             }
         },
         onFailed: async function (error: any) {
             onError(error);
         }
     });
 }
}

export interface CreateUserControlelrParam {
    userInfo: any,
    onSuccess(): void,
    onFailed(code: string, message: string): void;
    onError(error: any): void;
}