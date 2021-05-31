
import { Box, Button, Card, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from "@material-ui/core";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { useState } from "react";
import { Link } from "react-router-dom";
import useStyles from './StylesLoginAndRegister';


const RegisterPage = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('')
  const [showPassword, setShowPassword] = useState(false);

  const changeUserInfo = (e) => {
    if (e.target.id === 'username-input')
      setUsername(e.target.value);
    if (e.target.id === 'password-input')
      setPassword(e.target.value);
    if (e.target.id === 'email-input')
      setEmail(e.target.value);
  }

  return (
    <div className={classes.main}>
      <Box width='100%' height='100%' display='flex' justifyContent='center' alignItems='center'>
        <Card className={classes.card} elevation={3}>
          <Box p={3} display='flex' flexDirection='column' alignItems='center'>
            <AccessTimeIcon className={classes.icon} />
            <Typography className={classes.head} align='center' color='primary' variant='body2'>Sign up</Typography>
            <Box mt={2} display='flex' flexDirection='column' justifyContent='space-between'>
              <FormControl className={classes.input} size='small' variant='outlined'>
                <InputLabel htmlFor='username-input'>username</InputLabel>
                <OutlinedInput value={username} onChange={changeUserInfo} id='username-input' labelWidth={70} />
              </FormControl>
              <FormControl className={classes.input} size='small' variant='outlined'>
                <InputLabel htmlFor='email-input'>email</InputLabel>
                <OutlinedInput value={email} onChange={changeUserInfo} id='email-input' labelWidth={70} />
              </FormControl>
              <FormControl className={classes.input} size='small' variant='outlined'>
                <InputLabel htmlFor='password-input'>password</InputLabel>
                <OutlinedInput value={password} onChange={changeUserInfo} id='password-input' labelWidth={70} endAdornment={
                  <InputAdornment position='end'>
                    <IconButton onClick={() => { setShowPassword(!showPassword) }} edge='end'>
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                }
                  type={showPassword ? 'text' : 'password'}
                />
              </FormControl>
            </Box>
            <Button variant='contained' color='secondary'>Sign up</Button>
          </Box>
        </Card>
      </Box>
    </div>
  );
}

export default RegisterPage;