import { useEffect } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
//now we can get id !!

function Detail(){
	const { id } = useParams();
	const getMovie = async() => {
		const json = await(
			await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
			).json();
			console.log(json);
	};
	useEffect(() => {
		getMovie();
	}, []);
	return <h1>Detail</h1>;
}
//challenge: add loading, and show movie details by putting json as state
export default Detail;