class JsonDataHandler {
	private data: Record<string, any>;

	constructor() {
		this.data = {};
	}

	setData(newData: Record<string, any>): void {
		this.data = { ...this.data, ...newData };
	}

	getData(): Record<string, any> {
		return this.data;
	}

	readValue(key: string): any {
		return this.data[key];
	}

	writeValue(key: string, value: any): void {
		this.data[key] = value;
	}
}

export const objJsonDataHandler = new JsonDataHandler();
