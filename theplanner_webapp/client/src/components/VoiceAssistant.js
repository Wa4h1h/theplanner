import React , {useState, useEffect} from 'react';
import MicRoundedIcon from '@material-ui/icons/MicRounded';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Popover from '@material-ui/core/Popover';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SpeechRecognition, {
	useSpeechRecognition,
} from 'react-speech-recognition';

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
		width: 40,
		height: 40,
	},
	conversation: {},
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

	const [message, setMessage] = useState('');
	const commands = [
		{
			command: 'reset',
			callback: () => resetTranscript(),
		},
		{
			command: 'shut up',
			callback: () => setMessage("I wasn't talking."),
		},
		{
			command: 'Hello',
			callback: () => setMessage('Hi there!'),
		},
        {
            command: 'I would like to order *',
            callback: (food) => setMessage(`Your order is for: ${food}`)
          }
	];
	const {
		transcript,
		interimTranscript,
		finalTranscript,
		resetTranscript,
		listening,
	} = useSpeechRecognition({ commands });
	useEffect(() => {
		if (finalTranscript !== '') {
			console.log('Got final result:', finalTranscript);
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
			continuous: true,
			language: 'en-GB',
		});
	};

	return (
		<React.Fragment>
			<Fab onClick={handleClick} className={classes.fab} color="#132C33">
				<MicRoundedIcon className={classes.icon} />
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
						width: 400,
						height: 240,
					}}
				>
					<IconButton
						style={{
							position: 'relative',
							float: 'right',
							top: -7,
							right: -7,
							color: '#a30000',
						}}
					>
						<CloseIcon />
					</IconButton>
					<div
						style={{
							overflow: 'visible',
							width: 400,
							height: 240,
							backgroundColor: '#DFF7FF',
						}}
					>
						<div>
							<span>listening: {listening ? 'on' : 'off'}</span>
							<div>
								<button type="button" onClick={resetTranscript}>
									Reset
								</button>
								<button type="button" onClick={listenContinuously}>
									Listen
								</button>
								<button type="button" onClick={SpeechRecognition.stopListening}>
									Stop
								</button>
							</div>
						</div>
						<div>{message}</div>
						<div>
							<span>{transcript}</span>
						</div>
					</div>
				</div>
			</Popover>
		</React.Fragment>
	);
};

export default VoiceAssistant;
