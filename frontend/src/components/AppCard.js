import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";

const BASE_URL = 'http://localhost:3001/admin';

const AppCard = props => {
  const { name, address, id } = props;

  const handleDelete = () => {
    return axios
      .delete(`${BASE_URL}/agency/${id}`)
      .then(res => {
        console.log('deleted the agency.');
        props.history.push('/admin/');
      })
      .catch(err => console.log('error deleting the agency', err));
  };

  const handleClick = () => {
    props.history.push(`/agency/${id}/edit`);
  };

  return (

    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{address}</Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the bulk of
          the card's content.
    </Card.Text>
        <div className="d-flex justify-content-around">
          <Button className="btn btn-warning" onClick={handleClick}>Edit</Button>
          <Button className="btn btn-danger" onClick={handleDelete}>Delete</Button>
        </div>
      </Card.Body>
    </Card>
  );
};


export default AppCard;


//   return (
//     <Card className={classes.root} variant="outlined">
//       <CardContent>
//         <Typography variant="h5" color="textPrimary" gutterBottom>
//           {name}
//         </Typography>
//         <Typography variant="h6">{address}</Typography>
//       </CardContent>
//       <CardActions>
//         <Button
//           onClick={handleClick}
//           size="small"
//           variant="contained"
//           color="primary"
//         >
//           Edit
//         </Button>
//    
//       </CardActions>
//     </Card>
//   );
// }
