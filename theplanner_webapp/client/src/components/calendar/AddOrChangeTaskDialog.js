import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Box, Button, Divider, Grid, TextField } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import EditIcon from '@material-ui/icons/Edit';
import axios from '../../utils';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
	textField: {
		width: 250,
	},
}));

export default function AddOrChangeTaskDialog(props) {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [date, setDate] = useState(props.date ? props.date : props.task.date);
	const [start_time, setStartTime] = useState(
		props.task ? props.task.start_time : 12
	);
	const [end_time, setEndTime] = useState(
		props.task ? props.task.end_time : 13
	);
	const [title, setTitle] = useState(props.task ? props.task.title : null);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	const [errorMsg, setErrorMsg] = useState(null);

	const handleSubmitForm = () => {
		const sendReq = async () => {
			try {
				var task = {
					date: date,
					end_time: end_time,
					start_time: start_time,
					title: title,
				};
				console.log(task);
				if (props.function === 'add') {
					await axios.post(
						`tasks/?user=${localStorage.getItem('userId')}`,
						task
					);
				} else {
					await axios.put(
						`tasks/${props.task.id}/properties`,
						task
					);
				}
				setSuccess(true);
				setOpen(false);
				props.reload();
			} catch (err) {
				console.log(err);
			}
		};
		if (title === null || title === '') {
			setError(true);
			setErrorMsg('Title must not be empty');
		} else {
			sendReq();
		}
	};

	const handleTitleChange = (event) => {
		setTitle(event.target.value);
	};

	const handleDateChange = (event) => {
		console.log(event.target.value);
		if (event.target.value < new Date()) {
			setError(true);
			setErrorMsg('Please choose a day from Today!');
		} else {
			setDate(event.target.value);
		}
	};

	const handleStartTimeChange = (event) => {
		setStartTime(event.target.value);
		var endTime = event.target.value;
		setEndTime(++endTime);
	};

	const handleEndTimeChange = (event) => {
		if (event.target.value < start_time) {
			setError(true);
			setErrorMsg(
				'The choosed end time of the task is before your choosed start time !'
			);
		} else {
			setEndTime(event.target.value);
		}
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleCloseAlertError = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setError(false);
	};

	const handleCloseAlertSuccess = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSuccess(false);
	};

	return (
		<React.Fragment>
			{props.function === 'edit' && (
				<IconButton
					onClick={() => {
						handleClickOpen();
					}}
				>
					<EditIcon style={{ color: '#132C33' }} />
				</IconButton>
			)}
			{props.function === 'add' && (
				<Box display="flex" justifyContent={props.taskslength === 0 ? "center" : "right"} width="100%">
					<IconButton
						onClick={() => {
							handleClickOpen();
						}}
					>
						<AddRoundedIcon style={{ width:props.taskslength === 0 ? 70 : 30 , height:props.taskslength === 0 ? 70 : 30, color: '#51C4D3' }} />
					</IconButton>
				</Box>
			)}

			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="Add or Change Task"
			>
				<DialogTitle id="form-dialog-title" onClose={handleClose}>
					{props.function === 'add'
						? 'Add a Task / an activity'
						: 'Change Task'}
				</DialogTitle>
				<Divider />
				<DialogContent style={{ height: '25vh' }}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<TextField
								id="task_title"
								label="Task title"
								value={title}
								onChange={handleTitleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="task_date"
								label="Task date"
								type="date"
								className={classes.textField}
								onChange={handleDateChange}
								defaultValue={date}
								InputLabelProps={{
									shrink: true,
								}}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								id="standard-select-begin-time"
								select
								label="Begin time"
								value={start_time}
								className={classes.textField}
								onChange={handleStartTimeChange}
								SelectProps={{
									native: true,
								}}
							>
								{Array.from(Array(24).keys()).map((option) => (
									<option key={option} value={option}>
										{option}
									</option>
								))}
							</TextField>
						</Grid>
						<Grid item xs={6}>
							<TextField
								id="standard-select-end-time"
								select
								label="End time"
								value={end_time}
								className={classes.textField}
								onChange={handleEndTimeChange}
								SelectProps={{
									native: true,
								}}
							>
								{Array.from(Array(24).keys()).map((option) => (
									<option key={option} value={option}>
										{option}
									</option>
								))}
							</TextField>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} style={{ color: '#132C33' }}>
						Cancel
					</Button>
					<Button style={{ color: '#132C33' }} onClick={handleSubmitForm}>
						Submit
					</Button>
				</DialogActions>
			</Dialog>
			<Snackbar
				open={error}
				autoHideDuration={6000}
				onClose={handleCloseAlertError}
			>
				<Alert onClose={handleCloseAlertError} severity="error">
					{errorMsg}
				</Alert>
			</Snackbar>
			<Snackbar
				open={success}
				autoHideDuration={6000}
				onClose={handleCloseAlertSuccess}
			>
				<Alert onClose={handleCloseAlertSuccess} severity="success">
					{props.function === 'add' ? "Task successfully added" : "Task successfully changed"}
				</Alert>
			</Snackbar>
		</React.Fragment>
	);
}

const styles = (theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: '#132C33',
	},
});

const DialogTitle = withStyles(styles)((props) => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant="h6" style={{ color: '#132C33' }}>
				{children}
			</Typography>
			{onClose ? (
				<IconButton
					aria-label="close"
					className={classes.closeButton}
					onClick={onClose}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});
