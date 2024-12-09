import type { Connection } from 'mysql2/promise';
import { createConnection } from 'mysql2/promise';

interface DbCfg {
	host: string;
	user: string;
	password: string;
	database: string;
}

interface QueryRes<T extends Record<string, any>> {
	rowCount: number;
	colNames: string[];
	data: T[];
}

class DbHandler<T extends Record<string, any>> {
	private readonly err = ['BD config not defined', 'BD conn not exist', 'No results', 'Index out of range'];

	private conn: Connection | null = null;
	private results: QueryRes<T> | null = null;

	constructor() {
		const envConfig = process.env.DB_CONFIG;
		if (envConfig) {
			const dbConfig: DbCfg = JSON.parse(envConfig);
			this.connect(dbConfig);
		} else {
			throw new Error(this.err[0]);
		}
	}

	private async connect(config: DbCfg) {
		this.conn = await createConnection(config);
	}

	async disconnect() {
		if (this.conn) {
			await this.conn.end();
			this.conn = null;
		}
	}

	async execQuery(query: string): Promise<QueryRes<T>> {
		if (!this.conn) throw new Error(this.err[1]);

		const [rows, fields] = await this.conn.query(query);
		this.results = {
			rowCount: (rows as any).length,
			colNames: fields.map((field: any) => field.name),
			data: rows as T[]
		};
		return this.results;
	}

	getRowCount(): number {
		return (
			this.results?.rowCount ??
			(() => {
				throw new Error(this.err[2]);
			})()
		);
	}

	getColNames(): string[] {
		return (
			this.results?.colNames ??
			(() => {
				throw new Error(this.err[2]);
			})()
		);
	}

	getAllData(): T[] {
		return (
			this.results?.data ??
			(() => {
				throw new Error(this.err[2]);
			})()
		);
	}

	getCell(_rowIndex: number, _colIndex: number): any {
		if (this.results && _rowIndex < this.results.rowCount && _colIndex < this.results.colNames.length) {
			return this.results.data[_rowIndex][this.results.colNames[_colIndex]];
		}
		throw new Error(this.err[3]);
	}

	filterData(callback: (_row: T) => boolean): T[] {
		return (
			this.results?.data.filter(callback) ??
			(() => {
				throw new Error(this.err[2]);
			})()
		);
	}
}

export const objDbHandler = new DbHandler();
