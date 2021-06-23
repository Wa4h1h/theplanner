import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from '../../utils';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function DeleteTaskDialog(props) {
	const [openDeleteTaskDialog, setOpenDeleteTaskDialog] = useState(false);
	const [success, setSuccess] = useState(false);

	const handleClickOpenDeleteDialog = () => {
		setOpenDeleteTaskDialog(true);
	};

	const handleCloseDeleteDialog = () => {
		setOpenDeleteTaskDialog(false);
	};

	const handleCloseAlertSuccess = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSuccess(false);
	};

	const handleDeleteTask = async() => {
		try{
			await axios.delete(`tasks/${props.task.id}/`)
			setOpenDeleteTaskDialog(false);
			setSuccess(true);
			props.reload();
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<React.Fragment>
			<IconButton
				title="delete task"
				onClick={() => {
					handleClickOpenDeleteDialog();
				}}
				edge="end"
				aria-label="delete task"
				style={{ color: '#a30000' }}
			>
				<DeleteIcon />
			</IconButton>
			<Dialog
				open={openDeleteTaskDialog}
				onClose={handleCloseDeleteDialog}
				aria-labelledby="list_delete"
			>
				<DialogTitle id="list_delete">Delete Task</DialogTitle>
				<DialogContent>
					<Typography style={{ color: '#132C33' }}>
						{' '}
						Do you really want to delete this task?{' '}
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleCloseDeleteDialog}
						style={{ color: '#707070' }}
					>
						Cancel
					</Button>
					<Button onClick={handleDeleteTask} 
					style={{ color: '#a30000' }}>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
			<Snackbar
				open={success}
				autoHideDuration={6000}
				onClose={handleCloseAlertSuccess}
			>
				<Alert onClose={handleCloseAlertSuccess} severity="success">
					task successfully deleted
				</Alert>
			</Snackbar>
		</React.Fragment>
	);
}

