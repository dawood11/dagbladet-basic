import './App.css';

import React from 'react';
import TilesList from './Component/Tiles/TilesList/TilesList';

const App: React.FC = () => {
	return (
		<div>
			<div className={'header'}>
				<h1 className={'header-title'}>Dagbladet</h1>
			</div>
			<TilesList />
		</div>
	);
};

export default App;
