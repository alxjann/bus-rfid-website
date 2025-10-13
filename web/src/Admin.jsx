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
    
    const handleStatus = async (status) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/stop/a`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: status })
            });
             
            if (response.ok) {
                alert('Bus status updated to Ready to Board');
            }   
            else {
                alert('Failed to update bus status');
            }
        } catch (error) {
            console.error('Error updating bus status:', error);
            alert('Error updating bus status');
        }
    }

    return (
        <>
            <div className="flex justify-center items-center h-screen">

                <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-2 items-center">
                        <h1 className="text-xl font-bold">Bus Status: </h1>
                        <Button size="lg" onClick={handleStatus('Ready to Board')}>Ready to Board</Button>
                        <Button size="lg" onClick={handleStatus('Awaiting Bus')}>Awaiting Bus</Button>
                        <Button size="lg" onClick={handleStatus('Route Mismatch')}>Route Mismatch</Button>
                    </div>

                    <div className="flex flex-col gap-2 items-center">
                        <h1 className="text-xl font-bold">Clear Passenger: </h1>
                        <Button size="lg" onClick={handleClear}>CLEAR</Button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Admin;