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
		<div className="container mx-auto max-width-md bg-grey-lighter shadow-md px-4 mt-2">
			<form onSubmit={handleSubmit} className="mb-2 pt-4">
				<input
					type="text"
					value={query}
					onChange={e => setQuery(e.target.value)}
					ref={searchInputRef}
					className="border border-dark px-4 py-2 mb-2 rounded mr-2 ml-2"
				/>
				<button
					type="submit"
					className="bg-transparent hover:bg-blue text-blue-dark font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded mr-2"
				>
					search
				</button>
				<button
					type="button"
					onClick={clearSearch}
					className="bg-transparent hover:bg-blue text-blue-dark font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded mr-2"
				>
					clear
				</button>
			</form>
			{!error && loading ? (
				<h1>Loading ...</h1>
			) : (
				<ul className="list-reset px-4 ">
					<h3 className="font-thin pb-2 ">Search results are </h3>
					{news.map(item => (
						<li
							key={item.objectID}
							className="hover:text-blue-dark cursor-pointer py-1 font-thin text-grey-darker"
						>
							{item.title}
						</li>
					))}
				</ul>
			)}
			{error && <h1>Something went wrong</h1>}
		</div>
	);
}
