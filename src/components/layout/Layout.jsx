import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Avatar from '@material-ui/core/Avatar'
import { AddCircleOutlined, SubjectOutlined } from '@material-ui/icons'
import { format } from 'date-fns'

const drawerWidth = 240
const useStyles = makeStyles((theme) => {
	return {
		root: {
			display: 'flex',
		},
		page: {
			background: '#f9f9f9',
			width: '100%',
			padding: theme.spacing(3),
		},
		drawer: {
			width: drawerWidth,
		},
		drawerPaper: {
			width: drawerWidth,
		},
		active: {
			background: '#f4f4f4',
		},
		title: {
			padding: theme.spacing(2),
		},
		appbar: {
			width: `calc(100% - ${drawerWidth}px)`,
		},
		toolbar: theme.mixins.toolbar,
		date: {
			flexGrow: 1,
		},
		avatar: {
			marginLeft: theme.spacing(2),
		},
	}
})
const Layout = ({ children }) => {
	const history = useHistory()
	const location = useLocation()

	const classes = useStyles()
	const menuItems = [
		{
			text: 'My Notes',
			icon: <SubjectOutlined color='secondary' />,
			path: '/',
		},

		{
			text: 'Create Notes ',
			icon: <AddCircleOutlined color='secondary' />,
			path: '/create',
		},
	]

	return (
		<div className={classes.root}>
			{/* app bar */}

			<AppBar elevation={0} className={classes.appbar}>
				<Toolbar>
					<Typography className={classes.date}>
						Today is {format(new Date(), 'do MMMM Y')}
					</Typography>
					<Typography>Mario</Typography>
					<Avatar src='../mario-av.png' className={classes.avatar} />
				</Toolbar>
			</AppBar>

			{/* side drawer */}
			<Drawer
				className={classes.drawer}
				variant='permanent'
				anchor='left'
				classes={{ paper: classes.drawerPaper }}
			>
				<div>
					<Typography variant='h5' className={classes.title}>
						Ninja Notes
					</Typography>
				</div>

				{/* list links */}

				<List>
					{menuItems.map((menuItem) => (
						<ListItem
							className={
								location.pathname === menuItem.path ? classes.active : null
							}
							button
							key={menuItem.text}
							onClick={() => history.push(menuItem.path)}
						>
							<ListItemIcon>{menuItem.icon}</ListItemIcon>
							<ListItemText primary={menuItem.text} />
						</ListItem>
					))}
				</List>
			</Drawer>
			<div className={classes.page}>
				<div className={classes.toolbar}></div>
				{children}
			</div>
		</div>
	)
}

export default Layout
