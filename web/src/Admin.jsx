import { Button } from "@/components/ui/button";

function Admin() {
    const handleClear = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/clear/a`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Successfully cleared documents for Stop A');
            } else {
                alert('Failed to clear documents');
            }
        } catch (error) {
            console.error('Error clearing documents:', error);
            alert('Error clearing documents');
        }
    };

    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col gap-5 items-center">
                    <h1 className="text-xl font-bold">Clear Passenger: </h1>
                    <Button size="lg" onClick={handleClear}>CLEAR</Button>
                </div>
            </div>
        </>
    )
}

export default Admin;