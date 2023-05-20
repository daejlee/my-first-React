import { useEffect, useState } from "react";
import Movie from "../components/Movie"

function Home(){
	const [loading, setLoading] = useState(true);
	const [movies, setMovies] = useState([]);
	const [minScore, setMinScore] = useState(0);
	const [curScore, setCurScore] = useState(5);
	const onSubmitt = (event) => {
		event.preventDefault();
		if (minScore <= 0 || minScore >= 10){
			setCurScore(0);
			return ;
		}
		setCurScore(minScore);
		setLoading(true);
		fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=${minScore}&sort_by=year`)
		.then((response) => response.json())
		.then((json) => {
			setMovies(json.data.movies);
			setLoading(false);
		});
	}
	useEffect(() => {
		fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=5.0&sort_by=year`)
		.then((response) => response.json())
		.then((json) => {
			setMovies(json.data.movies);
			setLoading(false);
		});
	}, []);
	console.log(movies);
	return (
	<div>
		{loading ? (
		<h1>Loading...</h1>
		) : (
		<div>
			<h1>🍿 Welcome to the Theatre! 🍿</h1>
			<hr/>
			<form onSubmit={onSubmitt}>
				<label htmlFor="minScore">Minimum Rating : </label>
				<input
					id="minScore"
					type="number"
					value={minScore}
					onChange={(e) => setMinScore(e.target.value)}
					placeholder="between 0 and 10"
					required
				/>
				<button type="submit">Search</button>
			</form>
			{curScore !== 0 ? (
			<h2>You are viewing movies that rated higher than {curScore}.</h2>) : (
			<h2>Invalid input. Please enter a number between 0 and 10.</h2>
			)}
			<h2>Click on movie's title if you want detail of it! 😙</h2>
			<hr/>
			{movies.map((movie) => (
				<Movie
				key={movie.id} //when rendering comps inside of map
				id={movie.id}
				coverImg={movie.medium_cover_image}
				title={movie.title}
				summary={movie.summary}
				genres={movie.genres}
				/>
			))}
		</div>
		)}
	</div>
	);
}

export default Home;