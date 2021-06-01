import {  makeStyles } from "@material-ui/core";


const useStyles = makeStyles(({
  main: {
    width: '100vw',
    height: '100vh',
    backgroundColor: '#132C33'
  },
  card: {
    width: '40%',
    height: '60%'
  },
  icon: {
    width: '15%',
    height: '15%'
  },
  input: {
    width: '35ch',
    height: '8ch'
  },
  head: {
    marginTop: '5%',
    fontWeight:'bold'
  }
}))

export default useStyles;
