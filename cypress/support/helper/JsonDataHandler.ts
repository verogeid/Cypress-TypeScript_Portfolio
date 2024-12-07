import * as fs from 'fs';
import * as path from 'path';

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

	saveToFile(fileName: string, customPath?: string): void {
		const filePath = path.join(customPath || this.defaultPath, `${fileName}.json`);
		fs.writeFile(filePath, JSON.stringify(this.data, null, 2), 'utf-8', err => {
			if (err) {
				console.error('Error writing file:', err);
			}
		});
	}

	loadFromFile(fileName: string, customPath?: string): void {
		const filePath = path.join(customPath || this.defaultPath, `${fileName}.json`);
		fs.readFile(filePath, 'utf-8', (err, data) => {
			if (err) {
				if (err.code === 'ENOENT') {
					console.error(`El archivo ${fileName}.json no existe en la carpeta ${customPath || this.defaultPath}.`);
				} else {
					console.error('Error reading file:', err);
				}
			} else {
				this.data = JSON.parse(data);
			}
		});
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
