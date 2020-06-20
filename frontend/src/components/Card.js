import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275
  }
});

export default function OutlinedCard(props) {
  const classes = useStyles();
  console.log(props);

  const { name, address, id } = props;

  const handleDelete = () => {
    return axios
      .delete(`http://localhost:3001/admin/agency/${id}`)
      .then(res => {
        console.log('deleted the agency.');
        props.history.push('/admin/');
      })
      .catch(err => console.log('error deleting the agency', err));
  };

  const handleClick = () => {
    props.history.push(`/agency/${id}`);
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" color="textPrimary" gutterBottom>
          {name}
        </Typography>
        <Typography variant="h6">{address}</Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={handleClick}
          size="small"
          variant="contained"
          color="primary"
        >
          Edit
        </Button>
        <Button onClick={handleDelete} variant="contained" color="secondary">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
