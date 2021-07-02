import React, { useState, useEffect, useRef, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Popover from '@material-ui/core/Popover';
import { Grid, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import SpeechRecognition, {
	useSpeechRecognition,
} from 'react-speech-recognition';
import InputAdornment from '@material-ui/core/InputAdornment';
import SendIcon from '@material-ui/icons/Send';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from '../utils';
import { ReloadContext } from '../contexts/ReloadContext';
const loadImage = require.context('../img', true);

const useStyles = makeStyles((theme) => ({
	fab: {
		position: 'fixed',
		bottom: theme.spacing(3),
		right: theme.spacing(3),
		width: 70,
		height: 70,
		color: '#132C33',
		backgroundColor: '#DDFCF8',
		'&:hover': {
			backgroundColor: '#62F9E6',
		},
	},
	icon: {
		width: 60,
		height: 80,
	},
	humanBubble: {
		borderRadius: '48px 48px 8px 48px',
		padding: 16,
		backgroundColor: '#D5DEDE',
		color: 'black',
	},
	botBubble: {
		borderRadius: '48px 48px 48px 8px',
		padding: 16,
		paddingBottom: '16px',
		backgroundColor: '#132C33',
		color: 'white',
	},
}));

const VoiceAssistant = () => {
	const classes = useStyles();

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	const [history, setHistory] = React.useState([]);
	const { reload, setReload } = useContext(ReloadContext);
	const textfield_ref = useRef();

	useEffect(() => {
		if (textfield_ref.current) {
			textfield_ref.current.scrollIntoView({ behavior: 'smooth' });
		}
	});

	// loading indicator state
	const [isLoading, setIsLoading] = React.useState(false);

	const {
		transcript,
		interimTranscript,
		finalTranscript,
		resetTranscript,
		listening,
	} = useSpeechRecognition();

	useEffect(() => {
		if (finalTranscript !== '') {
			console.log('Got final result:', finalTranscript);
			handleSend();
		}
	}, [interimTranscript, finalTranscript]);
	if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
		return null;
	}
	if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
		console.log(
			'Your browser does not support speech recognition software! Try Chrome desktop, maybe?'
		);
	}
	const listenContinuously = () => {
		SpeechRecognition.startListening({
			language: 'en-GB',
		});
	};

	const chat = () => {
		setHistory((history) => [
			...history,
			{ sender: localStorage.getItem('userId'), msg: transcript },
		]);
		sendToRasa({ sender: localStorage.getItem('userId'), message: transcript });
		SpeechRecognition.stopListening();
		resetTranscript();
	};

	const handleSend = (event) => {
		chat();
	};

	const sendToRasa = (data) => {
		setIsLoading(true);

		fetch('http://localhost:5005/webhooks/rest/webhook', {
			method: 'post',
			body: JSON.stringify(data),
		})
			.then(function (response) {
				console.log(response);
				return response.json();
			})
			.then(function (data) {
				let botMessages = data.map((response) => {
					if (response.custom) {
						let obj = response.custom;
						if (obj.save_task) {
							var task = {
								date: obj.save_task.date.slice(0, 10),
								end_time:
									parseInt(obj.save_task.start_time) +
									parseInt(obj.save_task.duration),
								start_time: parseInt(obj.save_task.start_time),
								title: obj.save_task.title,
								state: false,
							};
							try {
								axios
									.post(`tasks/?user=${localStorage.getItem('userId')}`, task)
									.then((res) => {
										console.log(res);
										setReload(!reload);
									});
							} catch (err) {
								console.log(err);
							}
						} else if (obj.search_tasks_by_date) {
						}
						return { sender: -1, msg: response.custom.text };
					} else {
						return { sender: -1, msg: response.text };
					}
				});
				setTimeout(() => {
					setIsLoading(false);
					setHistory((history) => [...history, ...botMessages]);
				}, 1000);
			})
			.catch((err) => console.log(err));
	};

	const chatHistory = history.map((chat, i) => {
		return (
			<Grid
				key={i}
				container
				item
				direction="column"
				alignItems={chat.sender > 0 ? 'flex-end' : 'flex-start'}
			>
				<Grid item xs={6}>
					<div
						className={
							chat.sender > 0 ? classes.humanBubble : classes.botBubble
						}
					>
						{chat.msg}
						{chat.sender < 0 && ' speech'}
					</div>
				</Grid>
			</Grid>
		);
	});

	let messages = (
		<Grid item>
			<Card>
				<CardContent>There is no conversation yet!</CardContent>
			</Card>
		</Grid>
	);

	if (chatHistory.length > 0) {
		messages = chatHistory;
	}

	let loadingIndicator = null;
	if (isLoading) {
		loadingIndicator = (
			<Grid container item justify="flex-start">
				<Grid item xs={2}>
					<CircularProgress />
				</Grid>
			</Grid>
		);
	}

	return (
		<React.Fragment>
			<Fab onClick={handleClick} className={classes.fab} color="#132C33">
				<img className={classes.icon} src={loadImage('./voice.svg').default} />
			</Fab>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				className={classes.conversation}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
			>
				<div
					style={{
						width: 500,
						height: '100%',
						maxHeight: 600,
						overflowY: 'scroll',
						overflowX: 'hidden',
					}}
				>
					<IconButton
						style={{
							position: 'relative',
							float: 'right',
							color: '#132C33',
						}}
						onClick={handleClose}
					>
						<CloseIcon />
					</IconButton>
					<div
						style={{
							overflow: 'visible',
							width: 500,
							height: '100%',
							padding: 20,
							backgroundColor: '#DFF7FF',
						}}
					>
						<Grid container direction="column" spacing={1}>
							{messages}
							{loadingIndicator}
						</Grid>
						<Grid container spacing={1}>
							<Grid item ref={textfield_ref} xs={10}>
								<TextField
									id="User_message"
									label="Your message"
									multiline
									rowsMax={4}
									value={transcript}
									InputProps={{
										readOnly: true,
										startAdornment: (
											<InputAdornment position="start">
												<IconButton
													style={{ width: 25, height: 25, color: '#132C33' }}
													onClick={resetTranscript}
												>
													<CloseIcon />
												</IconButton>
											</InputAdornment>
										),
									}}
									style={{ width: '100%', height: '100%', marginTop: 20 }}
									variant="outlined"
									size="small"
								/>
							</Grid>
							<Grid item xs={2}>
								<Fab
									style={{
										position: 'absolute',
										bottom: 22,
										right: 35,
										width: 40,
										height: 40,
										color: '#132C33',
										backgroundColor: listening ? '#FF616D' : '#DDFCF8',
										'&:hover': {
											backgroundColor: '#62F9E6',
										},
									}}
									onClick={
										listening
											? SpeechRecognition.stopListening
											: listenContinuously
									}
								>
									<img
										style={{ width: 25, height: 25, color: '#132C33' }}
										src={
											listening
												? loadImage('./stop.svg').default
												: loadImage('./start.svg').default
										}
									/>
								</Fab>
							</Grid>
						</Grid>
					</div>
				</div>
			</Popover>
		</React.Fragment>
	);
};

export default VoiceAssistant;
