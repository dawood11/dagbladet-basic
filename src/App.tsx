import './App.css';

import Footer from './Component/Footer/Footer';
import Header from './Component/Header/Header';
import React from 'react';
import TilesList from './Component/Tiles/TilesList/TilesList';

const App: React.FC = () => {
	return (
		<div>
			<Header />
			<TilesList />
			<Footer />
		</div>
	);
};

export default App;
