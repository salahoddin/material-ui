import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Container from '@material-ui/core/Container'
import AcUnitOutlinedIcon from '@material-ui/icons/AcUnitOutlined'
import SendIcon from '@material-ui/icons/Send'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import { useState } from 'react'
import { FormControlLabel } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import { useHistory } from 'react-router'

const useStyles = makeStyles({
	// btn: {
	// 	fontSize: 50,
	// 	backgroundColor: 'violet',
	// 	'&:hover': {
	// 		backgroundColor: 'blue',
	// 	},
	// },
	// title: {
	// 	textDecoration: 'underline',
	// 	marginBottom: 20,
	// },
	field: {
		marginTop: 20,
		marginBottom: 20,
		display: 'block',
	},
})

export default function Create() {
	const history = useHistory()
	const classes = useStyles()

	const [title, setTitle] = useState('')
	const [details, setDetails] = useState('')

	const [titleError, setTitleError] = useState(false)
	const [detailsError, setDetailsError] = useState(false)

	const [category, setCategory] = useState('money')

	const submitHandler = (e) => {
		e.preventDefault()

		setTitleError(false)
		setDetailsError(false)

		if (title === '') {
			setTitleError(true)
		}

		if (details === '') {
			setDetailsError(true)
		}

		if (title && details) {
			fetch('http://localhost:8000/notes', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					title,
					details,
					category,
				}),
			}).then(() => history.push('/'))
		}
	}
	return (
		<Container>
			<Typography
				className={classes.title}
				variant='h6'
				component='h2'
				gutterBottom
				color='textSecondary'
			>
				Create a new note
			</Typography>

			<form noValidate autoComplete='off' onSubmit={submitHandler}>
				<TextField
					onChange={(e) => setTitle(e.target.value)}
					className={classes.field}
					label='Notes Title'
					variant='outlined'
					color='secondary'
					fullWidth
					required
					error={titleError}
				/>
				<TextField
					onChange={(e) => setDetails(e.target.value)}
					className={classes.field}
					label='Notes Details'
					variant='outlined'
					color='secondary'
					fullWidth
					required
					multiline
					rows={4}
					error={detailsError}
				/>
				<FormControl className={classes.field}>
					<FormLabel>Note Category</FormLabel>
					<RadioGroup
						value={category}
						onChange={(e) => setCategory(e.target.value)}
					>
						<FormControlLabel control={<Radio />} label='Money' value='money' />
						<FormControlLabel control={<Radio />} label='Todos' value='todos' />
						<FormControlLabel
							control={<Radio />}
							label='Reminders'
							value='reminders'
						/>
						<FormControlLabel control={<Radio />} label='Work' value='work' />
					</RadioGroup>
				</FormControl>
				<Button
					className={classes.btn}
					type='submit'
					color='secondary'
					variant='contained'
					startIcon={<SendIcon />}
					endIcon={<KeyboardArrowRightIcon />}
				>
					Submit
				</Button>
			</form>
		</Container>
	)
}
