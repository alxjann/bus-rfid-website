import { useEffect } from "react";
import { useState } from "react"

function View() {
    const [countA, setCountA] = useState(0);
    const [status, setStatus] = useState("No Passenger");

    useEffect(() => {
        const fetchCount = () => {
            fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/stop/a`)
                .then(res => res.json())
                .then(data => {
                    setCountA(data.passengerCount);
                    setStatus(data.status);
                })
        }
        fetchCount();
		const interval = setInterval(fetchCount, 1000);
		return () => clearInterval(interval);
     }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-5xl lg:text-8xl font-bold">
                STOP A
                </h1>
                <p className="mt-4 text-6xl lg:text-8xl font-bold text-gray-800">
                    {countA}
                </p>
                <h3 className="font-bold pt-10 text-lg lg:text-3xl">Status: {status}</h3>
            </div>
        </div>
    );
}

export default View;