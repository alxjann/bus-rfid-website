import { useEffect } from "react";
import { useState } from "react"

function View() {
    const [countA, setCountA] = useState(0);

    useEffect(() => {
        const fetchCount = () => {
            fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/stop/a`)
                .then(res => res.json())
                .then(data => {
                    setCountA(data.passengerCount);
                })
        }
        fetchCount();
		const interval = setInterval(fetchCount, 1000);
		return () => clearInterval(interval);
     }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-800">
            STOP A
            </h1>
            <p className="mt-4 text-3xl md:text-6xl text-gray-600">
                {countA}
            </p>
        </div>
        </div>
    );
}

export default View;