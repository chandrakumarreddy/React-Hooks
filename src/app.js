import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function App() {
	const [news, setNews] = useState([]);
	const [query, setQuery] = useState("react hooks");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const searchInputRef = useRef();
	useEffect(() => {
		searchResults();
	}, []);
	const searchResults = async () => {
		setLoading(true);
		try {
			const res = await axios.get(
				`https://hn.algolia.com/api/v1/search?query=${query}`
			);

			setLoading(false);
			setNews(res.data.hits);
		} catch (err) {
			setError(true);
		}
	};
	const handleSubmit = e => {
		e.preventDefault();
		searchResults();
	};
	const clearSearch = () => {
		setQuery("");
		searchInputRef.current.focus();
	};
	return (
		<div>
			<h1>Search results are </h1>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={query}
					onChange={e => setQuery(e.target.value)}
					ref={searchInputRef}
				/>
				<button type="submit">search</button>
				<button type="button" onClick={clearSearch}>
					clear
				</button>
			</form>
			{!error && loading ? (
				<h1>Loading ...</h1>
			) : (
				<div>
					<ul>
						{news.map(item => (
							<li key={item.objectID}>{item.title}</li>
						))}
					</ul>
				</div>
			)}
			{error && <h1>Something went wrong</h1>}
		</div>
	);
}
