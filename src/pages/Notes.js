import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import NoteCard from '../components/card/NoteCard'
import Masonry from 'react-masonry-css'

const Notes = () => {
	const [notes, setNotes] = useState([])

	useEffect(() => {
		fetch('http://localhost:8000/notes')
			.then((res) => res.json())
			.then((data) => setNotes(data))
	}, [])

	const breakPoints = {
		default: 3,
		1100: 2,
		700: 1,
	}

	const deleteHandler = async (id) => {
		await fetch(`http://localhost:8000/notes/${id}`, {
			method: 'DELETE',
		})

		const newNotes = notes.filter((note) => note.id !== id)
		setNotes(newNotes)
	}

	return (
		<Container>
			{/* <Grid container spacing={3}>
				{notes.map((note) => (
					<Grid item xs={12} md={6} lg={4} item key={note.id}>
						<NoteCard deleteHandler={deleteHandler} note={note} />
					</Grid>
				))}
			</Grid> */}

			<Masonry
				breakpointCols={breakPoints}
				className='my-masonry-grid'
				columnClassName='my-masonry-grid_column'
			>
				{notes.map((note) => (
					<div>
						<NoteCard deleteHandler={deleteHandler} note={note} />
					</div>
				))}
			</Masonry>
		</Container>
	)
}

export default Notes

// json-server --watch data/db.json --port 8000
