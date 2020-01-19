import './Tile.css';

import React, { useState } from 'react';

interface IProps {
	type: string;
	width: number;
	url: string;
	title: string;
	imageUrl: string;
}

const Tile: React.FC<IProps> = (props: IProps) => {
	const [hovered, setHovered] = useState<boolean>(false);
	const { url, title, imageUrl } = props;
	const width = props.width / 12 * 100;

	const handleClick = () => {
		console.log('clicked');
		// history.push(url);
	};

	return (
		<a
			href={url}
			className={'title-link'}
			style={{ textDecoration: hovered ? 'underline' : 'none' }}
		>
			<div
				style={{ width: width + '%' }}
				className={'tile'}
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				onClick={handleClick}
			>
				<img
					src={imageUrl}
					alt={title}
					className={'img'}
				/>
				<h2>{title}</h2>
				{/* </Link> */}
			</div>
		</a>
	);
};

export default Tile;
