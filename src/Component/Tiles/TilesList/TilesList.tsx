import './TilesList.css';

import { ContentType, TileType } from '../../../Data/Tiles/Tiles.types';
import React, { useEffect, useState } from 'react';

import Tile from '../Tile/Tile';
import { getTiles } from '../../../Data/Tiles/Tiles.actions';

const TilesList: React.FC = () => {
	const [contentList, setContentList] = useState<ContentType[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const newTiles = await getTiles();

			setContentList(newTiles);
			setLoading(false);
		};

		fetchData();
	}, []);

	return (
		<div>
			{
				loading
					? <p>Loading...</p>
					: <div className={'root'}>
						{
							contentList.map((content: ContentType, i) =>
								<div className={'row'} key={i}>
									{
										content.columns.map((tile: TileType, j) =>
											<Tile
												key={j}
												{...tile}
											/>
										)
									}
								</div>
							)

						}
					</div>

			}
		</div>
	);
};

export default TilesList;
