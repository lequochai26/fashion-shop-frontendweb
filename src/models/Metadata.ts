export default class Metadata {
    // Fields:
    private options: { [ index: string ]: string[] };
    private mappings: Mapping[];

    // Constructors:
    public constructor(metadata?: any | undefined) {
        if (metadata) {
            this.options = metadata.options;
            this.mappings = metadata.mappings;
        }
        else {
            this.options = {};
            this.mappings = [];
        }
    }

    // Methods:
    public toJSON() {
        return {
            options: this.options,
            mappings: this.mappings
        };
    }

    public newOption(name: string): void {
        if (!name) {
            throw new Error(`Tên phân loại không được rỗng!`);
        }

        if (this.options[name]) {
            throw new Error(`Phân loại ${name} đã tồn tại!`);
        }

        this.options[name] = [ 'selection1' ];
        this.resetMappings();
    }

    public renameOption(curName: string, name: string): void {
        if (!name) {
            throw new Error(`Tên phân loại không được rỗng!`);
        }
        
        if (!this.options[curName]) {
            throw new Error(`Phân loại ${curName} không tồn tại!`);
        }

        if (this.options[name]) {
            throw new Error(`Phân loại ${name} đã tồn tại!`);
        }

        this.options[name] = this.options[curName];
        delete this.options[curName];

        for (const mapping of this.mappings) {
            mapping[name] = mapping[curName];
            delete mapping[curName];
        }
    }

    public removeOption(name: string): void {
        if (!this.options[name]) {
            throw new Error(`Phân loại ${name} không tồn tại!`);
        }

        delete this.options[name];
        this.resetMappings();
    }

    public addSelection(option: string, selection: string): void {
        if (!selection) {
            throw new Error(`Tên lựa chọn không được rỗng!`);
        }

        if (!this.options[option]) {
            throw new Error(`Phân loại ${option} không tồn tại!`);
        }

        if (this.options[option].includes(selection)) {
            throw new Error(`Lựa chọn ${selection} đã tồn tại trong phân loại ${option}`);
        }

        this.options[option].push(selection);
        this.resetMappings();
    }

    public renameSelection(option: string, curSelection: string, selection: string): void {
        if (!selection) {
            throw new Error(`Tên lựa chọn không được rỗng!`);
        }

        if (!this.options[option]) {
            throw new Error(`Phân loại ${option} không tồn tại!`);
        }

        if (!this.options[option].includes(curSelection)) {
            throw new Error(`Lựa chọn ${curSelection} không tồn tại!`);
        }

        if (this.options[option].includes(selection)) {
            throw new Error(`Lựa chọn ${selection} đã tồn tại!`);
        }

        this.options[option].splice(
            this.options[option].indexOf(curSelection), 1
        );
        this.options[option].push(selection);

        for (const mapping of this.mappings) {
            if (mapping[option] === curSelection) {
                mapping[option] = selection;
            }
        }
    }

    public removeSelection(option: string, selection: string): void {
        if (!this.options[option]) {
            throw new Error(`Phân loại ${option} không tồn tại!`);
        }

        if (!this.options[option].includes(selection)) {
            throw new Error(`Lựa chọn ${selection} không tồn tại!`);
        }

        this.options[option].splice(
            this.options[option].indexOf(selection), 1
        );

        if (this.options[option].length < 1) {
            delete this.options[option];
        }

        this.resetMappings();
    }

    public getMapping(filter: any): Mapping | undefined {
        for (const mapping of this.mappings) {
            // Get keys of filter and mapping
            const mappingKeys: string[] = Object.keys(mapping).filter(
                key => (key !== "price" && key !== "buyPrice" && key !== "amount")
            );
            const filterKeys: string[] = Object.keys(filter);

            // Diff keys amount case
            if (mappingKeys.length !== filterKeys.length) {
                continue;
            }

            // Matching
            let match: boolean = true;

            for (const key of filterKeys) {
                if (mapping[key] !== filter[key]) {
                    match = false;
                    break;
                }
            }

            // Matches case
            if (match) {
                return mapping;
            }
        }
        
        return undefined;
    }

    // Private methods:
    private resetMappings(): void {
        this.mappings = this.getPossibleMappings();
    }

    private getPossibleMappings(): Mapping[] {
        let mappings: Mapping[] = [];

        let firstLoop = true;
        for (const option of Object.keys(this.options)) {
            const selections: string[] = this.options[option];

            if (firstLoop) {
                for (const selection of selections) {
                    // Create mapping
                    const mapping: Mapping = { [option]: selection, price: 0, buyPrice: 0, amount: 0 };

                    // Push into mappings
                    mappings.push(mapping);
                }
                firstLoop = false;
            }
            else {
                const temps: Mapping[] = Array.from(mappings);
                mappings = [];

                for (const temp of temps) {
                    for (const selection of selections) {
                        mappings.push({ ...temp, [option]: selection });
                    }
                }
            }
        }

        return mappings;
    }

    // Getters / setters:
    public get Options() {
        return this.options;
    }

    public set Options(options) {
        this.options = options;
    }

    public get Mappings() {
        return this.mappings;
    }

    public set Mappings(mappings) {
        this.mappings = mappings;
    }
}

export interface Mapping {
    [ index: string ]: any;
    price: number;
    buyPrice: number;
    amount: number;
}