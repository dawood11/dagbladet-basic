export interface TileType {
	type: string;
	width: number;
	url: string;
	title: string;
	imageUrl: string;
}

export interface ContentType {
	type: string;
	columns: TileType[];
}
