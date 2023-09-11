import propTypes from "prop-types"
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styles from "./Movie.module.css";

function Movie({ id, coverImg, title, summary, genres }) {
	return (
	<div>
		<div>
			<img src={coverImg} alt={title}/>
		</div>
		<div>
			<h2>
				<Link
				to={`/movie/${id}`}
				style={{ textDecoration: 'none', color: '#820000' }}
				>{title}</Link>
			</h2>
			<p className={styles.description}>{summary.length > 235 ? `${summary.slice(0, 235) + ' ...'}` : summary}</p>
			<ul className={styles.genre}>
				{genres.map((g) => (
				<li key={g}>{g}</li>
				))}
			</ul>
		</div>
		<hr/>
	</div>
	);
}

Movie.propTypes = {
	id: propTypes.number.isRequired,
	coverImg: propTypes.string.isRequired,
	title: propTypes.string.isRequired,
	summary: propTypes.string.isRequired,
	genres: propTypes.arrayOf(propTypes.string).isRequired,
};

export default Movie;