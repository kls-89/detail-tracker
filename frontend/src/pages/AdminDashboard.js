import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from "react-bootstrap/Container";
import AppCard from '../components/AppCard';

const BASE_URL = 'http://localhost:3001/admin';

const AdminDashboard = props => {
  const [agencies, setAgencies] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/agency`)
      .then(result => {
        setAgencies(result.data);
      })
      .catch(error =>
        console.log('error fetching agencies in admin dashboard', error)
      );
  }, [agencies]);

  const renderAgencies = agencies.map(agency => {
    return (
      <AppCard
        {...props}
        key={agency.id}
        id={agency.id}
        name={agency.name}
        address={agency.address}
        phoneNumber={agency.phoneNumber}
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
