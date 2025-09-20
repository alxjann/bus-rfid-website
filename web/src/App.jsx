import './index.css'
import { Routes, Route  } from "react-router-dom";

import Home from './Home.jsx';


function App() {
    return (
        <>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route index element={<Home />} />
			</Routes>
        </>
    )
}

export default App
//D1 0B AC 97

//93 DE 99 FE