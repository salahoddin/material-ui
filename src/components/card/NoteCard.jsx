import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import DeleteOutlined from '@material-ui/icons/DeleteOutlined'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import { pink, yellow, green, blue } from '@material-ui/core/colors'

const useStyles = makeStyles({
	avatar: {
		background: (note) => {
			if (note.category === 'work') {
				return yellow[700]
			}
			if (note.category === 'money') {
				return green[500]
			}
			if (note.category === 'todos') {
				return pink[700]
			}
			// category = reminder
			return blue[500]
		},
	},
})
const NoteCard = ({ note, deleteHandler }) => {
	const classes = useStyles(note)
	return (
		<div>
			<Card elevation={2}>
				<CardHeader
					avatar={
						<Avatar className={classes.avatar}>
							{note.category[0].toUpperCase()}
						</Avatar>
					}
					action={
						<IconButton onClick={() => deleteHandler(note.id)}>
							<DeleteOutlined />
						</IconButton>
					}
					title={note.title}
					subheader={note.category}
				/>
				<CardContent>
					<Typography variant='body2' color='textSecondary '>
						{note.details}
					</Typography>
				</CardContent>
			</Card>
		</div>
	)
}

export default NoteCard
