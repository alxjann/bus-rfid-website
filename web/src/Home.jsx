import { backendUrl } from "./server.js"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { UsersIcon } from "lucide-react"
import { useEffect } from "react"

function Home() {
	const [countA, setCountA] = useState(0);
	const [lastUpdateA, setLastUpdateA] = useState('');

	useEffect(() => {
		const fetchCount = () => {
			fetch(`${VITE_REACT_APP_API_URL}/api/stop/a`)
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
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-2xl font-bold">STOP A</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex items-center gap-3">
							<UsersIcon className="h-4 w-4 text-muted-foreground" />
							<div className="text-2xl font-semibold">
								{countA}
							</div>
						</div>
						<div className="text-sm text-muted-foreground mt-2">
							{lastUpdateA}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-2xl font-bold">STOP B</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex items-center gap-3">
							<UsersIcon className="h-4 w-4 text-muted-foreground" />
							<div className="text-2xl font-semibold">2</div>
						</div>
						<div className="text-sm text-muted-foreground mt-2">Last Update 5 minutes ago</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-2xl font-bold">STOP C</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex items-center gap-3">
							<UsersIcon className="h-4 w-4 text-muted-foreground" />
							<div className="text-2xl font-semibold">5</div>
						</div>
						<div className="text-sm text-muted-foreground mt-2">Last Update 5 minutes ago</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-2xl font-bold">STOP D</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex items-center gap-3">
							<UsersIcon className="h-4 w-4 text-muted-foreground" />
							<div className="text-2xl font-semibold">13</div>
						</div>
						<div className="text-sm text-muted-foreground mt-2">Last Update 5 minutes ago</div>
					</CardContent>
				</Card>
			</div>
		</div>
    
	)
}

export default Home