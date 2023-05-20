import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import YouTube from 'react-youtube';
import styles from "./Detail.module.css"; // npm install react-youtube
//now we can get id !!

function Detail(){
	const [loading, setLoading] = useState(true);
	const { id } = useParams();
	const [movie, setMovie] = useState([]);
	const [stars, setStars] = useState("");
	const getStars = (rating) => {
		let stars = "";
		let i = 1;
		for (i; i < rating / 2; i++)
			stars += '★';
		i--;
		if (rating - i * 2 >= 0.5)
			stars += '☆';
		return stars;
	};
	const getMovie = async () => {
		const json = await (await 
		fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
		)).json();
		console.log(json.data.movie);
		setMovie(json.data.movie);
		setStars(getStars(json.data.movie.rating));
		setLoading(false);
		};
	useEffect(() => {
		getMovie();
	});
	return (
	<div>
		{loading ? (
		<h1>Detail page loading...</h1>
		) : (
		<div>
				<a href={movie.url} target="_blank" rel="noreferrer">
					<h1>{movie.title_long}</h1>
				</a>
				<img src={movie.large_cover_image} alt={movie.title} href={movie.url}/>
				<hr/>
				<h2>About this movie... 🧐</h2>
				<p className={styles.description}>{movie.description_full}</p>
				<h2>IMDb Rating : {stars}</h2>
				<h2>Genres : </h2>
				<ul className={styles.genre}>
					{movie.genres.map((g) => (
					<li key={g}>{g}</li>
					))}
				</ul>
				<h2>Runtime : {parseInt(movie.runtime / 60)}hr {movie.runtime % 60}min</h2>
				<h2>Language : {movie.language}</h2>
				<h2>Youtube Trailer : </h2>
				<YouTube
					videoId={movie.yt_trailer_code}
					opts={{width: "650", height: "500"}}
				/>
		</div>)
		}
	</div>
	);
}
//challenge: add loading, and show movie details by putting json as state
export default Detail;