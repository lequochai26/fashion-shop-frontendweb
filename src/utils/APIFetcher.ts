export const API_URL: string = "http://localhost:3000";

export async function apiFetch({ path, method, body, onSuccess, onFailed }: MakeRequestParam) {
    try {
        var response = await fetch(
            `${API_URL}${path}`,
            {
                method,
                body: body && (
                    body instanceof FormData
                    ? body
                    : JSON.stringify(body)
                ),
                mode: 'cors',
                credentials: 'include',
                headers: [
                    [ "Content-Type", (
                        body instanceof FormData
                        ? "multipart/form-data"
                        : "application/json"
                    ) ]
                ]
            }
        );
    }
    catch (error: any) {
        onFailed(error);
        return;
    }

    onSuccess(response);
}

export function makeAPIUrl(path: string): string {
    return `${API_URL}${path}`;
}

export interface MakeRequestParam {
    path: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: any | FormData | undefined,
    onSuccess: (response: Response) => Promise<void>,
    onFailed: (error: any) => Promise<void>
}