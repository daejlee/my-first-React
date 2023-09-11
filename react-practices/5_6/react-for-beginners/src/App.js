import { useEffect, useState } from 'react';
//cleanup func,, not really used.
function Hello() {
	useEffect(() => {console.log("created :)"); return () => console.log("bye :(");}, []);
	return <h1>Hello</h1>;
}
//we don't hide, we destroy
function App() {
	const [showing, setShowing] = useState(false);
	const onClick = () => setShowing(prev => !prev);
	return (
	<div>
		{showing ? <Hello /> : null}
		<button onClick={onClick}>{showing ? "Hide" : "Show"}</button>
	</div>
	);
}

export default App;
