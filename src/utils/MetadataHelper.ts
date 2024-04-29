export default class MetadataHelper {
    // Static methods:
    public static toStringMetadata(metadata: any): string {
        let result = "";

        for (const key of Object.keys(metadata)) {
            result += `${result !== "" ? ", " : ""}${key}: ${metadata[key]}`;
        }

        return result;
    }

    // Constructors:
    private constructor() {

    }
}