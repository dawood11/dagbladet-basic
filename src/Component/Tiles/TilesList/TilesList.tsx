import './TilesList.css';

import { ContentType, TileType } from '../../../Data/Tiles/Tiles.types';
import React, { useCallback, useEffect, useState } from 'react';

import Tile from '../Tile/Tile';
import { getTiles } from '../../../Data/Tiles/Tiles.actions';

const TilesList: React.FC = () => {
	const [isFetching, setIsFetching] = useState(false);
	const [contentList, setContentList] = useState<ContentType[]>([]);
	const [listItems, setListItems] = useState<ContentType[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [hasMore, setHasMore] = useState<boolean>(true);

	const loadItemsEachLazyLoad = 5;

	const handleScroll = useCallback(() => {
		if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) {
			return;
		}
		setIsFetching(true);
	}, [isFetching]);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const newTiles = await getTiles();

			setContentList(newTiles);
			const newLazyList = newTiles.slice(0, loadItemsEachLazyLoad);

			setListItems([...newLazyList]);
			setHasMore(true);
			setLoading(false);
		};

		fetchData();
	}, []);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, [handleScroll]);

	const fetchMoreListItems = useCallback(async () => {
		if (!hasMore) {
			await setIsFetching(false);

			return;
		}

		await setListItems(prevState => [...prevState, ...contentList.slice(prevState.length, prevState.length + loadItemsEachLazyLoad)]);
		await setIsFetching(false);
		if (listItems.length === contentList.length) {
			setHasMore(false);
		}
	}, [contentList, hasMore, listItems]);

	useEffect(() => {
		if (!isFetching) {
			return;
		}
		fetchMoreListItems();
	}, [fetchMoreListItems, isFetching]);

	return (
		<>
			<div>
				{
					loading
						? <p>Loading...</p>
						: <div className={'root'}>
							{
								listItems.map((content: ContentType, i) =>
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
			{isFetching && 'Fetching more list items...'}
		</>
	);
};

export default TilesList;
