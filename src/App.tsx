import React from "react";
import Calendar from "./Calendar";
import "./styles/index.css";
function App() {
	return (
		<>
			<div className='my-3 text-lg font-extrabold text-teal-700 text-center'>
				React Calender
			</div>
			<div className='flex justify-center items-center'>
				<Calendar />
			</div>
		</>
	);
}

export default App;
