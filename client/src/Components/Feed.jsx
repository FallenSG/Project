import { ImageList, ImageListItem, ImageListItemBar, Typography, Link, Grid, styled } from '@mui/material'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Loading from '../Components/Loading'
import { Divider } from '../Components/GutterDivider'

function HomeFeed({ bookCatg, catgTitle, routeName = "" }) {
	return (
		<>
			<Grid
				container
				direction="row"
				justifyContent="space-between"
				alignItems="center"
			>
				<Grid item>
					<Typography variant="h6">{catgTitle}</Typography>
				</Grid>

				<Grid item>
					<Link
						href={`/book/${routeName}`}
						variant="body1"
						underline="none"
						component="button"
					>
						More..
					</Link>
				</Grid>
			</Grid>

			<Divider />

			<ImageList
				sx={{ height: 'inherit', pt: '10px' }}
				cols={8}
				spacing={1}
			>
				{bookCatg.map((book) => (
					<ImageListItem key={book._id}>
						<img
							src={book.img}
							alt='Not Found'
							loading="lazy"
						/>
						<ImageListItemBar
							sx={{ width: '10vw' }}
							title={book.title}
							position="below"
						/>
					</ImageListItem>
				))}
			</ImageList>
		</>
	)
}

export default function Feed() {
	const [fetchDone, setFetchDone] = useState(true);
	const [bookData, setBookData] = useState({});

	useEffect(() => {
		async function fetchData() {
			const resp = await axios.get('/book');
			setBookData(resp.data.data[0]);
			setFetchDone(false)
		}
		fetchData();
	}, [fetchDone]);

	if (!Object.keys(bookData).length) return <Loading />

	return (
		<>
			<HomeFeed catgTitle={'New Arrival'}
				bookCatg={bookData['newArrival']} routeName={'newest'} />
			<HomeFeed catgTitle={'Popular Books'}
				bookCatg={bookData['popRating']} routeName={'popular'} />
			<HomeFeed catgTitle={'Hot Rated'}
				bookCatg={bookData['hotRating']} routeName={'hot'} />
			<HomeFeed catgTitle={'Rank'}
				bookCatg={bookData['ranking']} routeName={'ranking'} />
		</>
	)
}
