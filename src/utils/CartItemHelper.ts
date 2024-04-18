export function formatMetadata(metadata: any) {
    let result: string = "";

    for (const key of Object.keys(metadata)) {
        result += `${!result ? '' : ', '}${key}: ${metadata[key]}`;
    }

    return result;
}