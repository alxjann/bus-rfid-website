import './index.css'
import { Routes, Route  } from "react-router-dom";

import Home from './Home.jsx';
import View from './View.jsx';


function App() {
    return (
        <>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route index element={<Home />} />
                <Route path="/view" element={<View />} />
			</Routes>
        </>
    )
}

export default App