import { useEffect, useState } from "react"
import CreateCard from "./components/createCard";

function Home() {
	const [countA, setCountA] = useState(0);
	const [lastUpdateA, setLastUpdateA] = useState('');

	useEffect(() => {
		const fetchCount = () => {
			fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/stop/a`)
				.then(res => res.json())
				.then(data => {
					setCountA(data.passengerCount);

					const date = new Date(data.lastUpdated);
					const now = new Date();

					const diff = Math.floor((now - date) / 1000);

					const hours = Math.floor(diff / 3600);
					const minutes = Math.floor((diff % 3600) / 60);
					const seconds = diff % 60;

					let formattedTime;

					if (hours > 0) {
						formattedTime = `${hours}h ${minutes}m`;
					} else if (minutes > 0) {
						formattedTime = `${minutes}m ${seconds}s`;
					} else {
						formattedTime = `${seconds}s`;
					}

					setLastUpdateA("Last Update " + formattedTime + " ago");
				})
				.catch(err => console.error(err));
		};

		fetchCount();
		const interval = setInterval(fetchCount, 1000);
		return () => clearInterval(interval);
	}, []);

 
  	return (
    	<div className="w-full p-6 flex justify-center">
      		<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 w-full max-w-6xl md:mt-20">

				<CreateCard title="STOP A" count={countA} lastUpdate={lastUpdateA} />
				<CreateCard title="STOP B" count={5} lastUpdate="Last Update 5 minutes ago" />
				<CreateCard title="STOP C" count={10} lastUpdate="Last Update 10 minutes ago" />
				<CreateCard title="STOP D" count={15} lastUpdate="Last Update 15 minutes ago" />
				<CreateCard title="STOP E" count={18} lastUpdate="Last Update 20 minutes ago" />
				<CreateCard title="STOP F" count={13} lastUpdate="Last Update 5 minutes ago" />
				<CreateCard title="STOP G" count={5} lastUpdate="Last Update 10 minutes ago" />
				<CreateCard title="STOP H" count={3} lastUpdate="Last Update 15 minutes ago" />
			</div>
		</div>
    
	)
}

export default Home