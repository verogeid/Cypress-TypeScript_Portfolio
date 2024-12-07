class JsonDataHandler {
	private data: Record<string, any>;
	private defaultPath: string;

	constructor() {
		this.data = {};
		this.defaultPath = '@data/Elements';
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

	async saveToFile(fileName: string, customPath?: string): Promise<void> {
		// Solo carga las librerías si son necesarias
		const { writeFile } = await import('fs/promises');
		const path = await import('path');

		const filePath = path.join(customPath || this.defaultPath, `${fileName}.json`);
		await writeFile(filePath, JSON.stringify(this.data, null, 2), { encoding: 'utf-8' });
	}

	async loadFromFile(fileName: string, customPath?: string): Promise<any> {
		// Solo carga las librerías si son necesarias
		const { readFile, stat } = await import('fs/promises');
		const path = await import('path');

		const filePath = path.join(customPath || this.defaultPath, `${fileName}.json`);
		try {
			await stat(filePath); // Verifica si el archivo existe
			const fileContent = await readFile(filePath, 'utf-8');
			this.data = JSON.parse(fileContent);
			return this.data;
		} catch (error) {
			if (error instanceof Error) {
				const err = error as NodeJS.ErrnoException;
				if (err.code === 'ENOENT') {
					throw new Error(`El archivo ${fileName}.json no existe en la carpeta ${customPath || this.defaultPath}.`);
				}
			}
			throw error; // Re-lanza otros errores
		}
	}
}

export const objJsonDataHandler = new JsonDataHandler();

/*****************************************************
 // Cargar datos desde el fixture
	cy.fixture('miFixture').then((data) => {
    	objJsonDataHandler.setData(data);
	}); */

/*	// Guardar datos en un fixture
	objJsonDataHandler.saveToFile('miFixture');
*****************************************************/
