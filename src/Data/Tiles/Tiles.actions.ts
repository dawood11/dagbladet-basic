import { ContentType } from './Tiles.types';
import { getRequest } from '../../Services/Requests';

export const getTiles = async () => {
	const url = 'https://storage.googleapis.com/aller-structure-task/test_data.json';

	const tilesData: ContentType[][] = await getRequest(url);

	localStorage.setItem('tiles', JSON.stringify(tilesData));

	return tilesData[0];
};
