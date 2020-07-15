import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import AppCard from '../components/AppCard';

const BASE_URL = 'http://localhost:3001/admin';

const AdminDashboard = props => {
  const [agencies, setAgencies] = useState([]);
  const token = localStorage.getItem("token")

  useEffect(() => {
    axios
      .get(`${BASE_URL}/agency`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      .then(result => {
        console.log(result.data);
        setAgencies(result.data.agencies);
      })
      .catch(error =>
        console.log('error fetching agencies in admin dashboard', error)
      );
  }, []);

  const renderAgencies = agencies.map(agency => {
    console.log(agency);
    return (
      <AppCard
        {...props}
        key={agency.doc.id}
        id={agency.doc.id}
        name={agency.doc.name}
        address={agency.doc.streetAddress || agency.doc.address}
        phoneNumber={agency.doc.phoneNumber}
        detailRate={agency.detailRate}
      />
    );
  });

  return (
    <Container>
      <h1>View All Agencies</h1>
      <Container className="d-flex">{renderAgencies}</Container>
    </Container>
  );
};

export default AdminDashboard;
