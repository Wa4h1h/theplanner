import React from 'react'
import { Box, Button, Card, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from "@material-ui/core";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useState } from "react";
import { Link } from "react-router-dom";
import useStyles from './StylesLoginAndRegister';


const LoginPage = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const changeUserInfo = (e) => {
    if (e.target.id === 'username-input')
      setUsername(e.target.value);
    if (e.target.id === 'password-input')
      setPassword(e.target.value);

  }

  return (
    <div className={classes.main}>
      <Box width='100%' height='100%' display='flex' justifyContent='center' alignItems='center'>
        <Card className={classes.card} elevation={3}>
          <Box p={3} display='flex' flexDirection='column' alignItems='center'>
            <AccountCircleIcon className={classes.icon} />
            <Typography className={classes.head} align='center' color='primary' variant='body2'>Login with your username and password</Typography>
            <Box mt={5} display='flex' flexDirection='column' justifyContent='space-between'>
              <FormControl className={classes.input} size='small' variant='outlined'>
                <InputLabel htmlFor='username-input'>username</InputLabel>
                <OutlinedInput value={username} onChange={changeUserInfo} id='username-input' labelWidth={70} />
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
            <Button variant='contained' color='secondary'>Login</Button>
          </Box>
          <Box display='flex' width='100%' mb={0} justifyContent='flex-end' alignItems='center'>
            <Link style={{ textDecoration: 'none' }} to='/register'>
              <Box p={2}>
                <Typography color='secondary' variant='caption'>Dont have an account?then register </Typography>
              </Box>
            </Link>
          </Box>
        </Card>
      </Box>
    </div>
  );
}

export default LoginPage;