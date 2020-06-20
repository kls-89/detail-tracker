import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';

const AdminDashboard = props => {
  const [agencies, setAgencies] = useState([]);
  useEffect(() => {
    document.title = 'View All Agencies';
    axios.get('http://localhost:3001/admin/agency').then(result => {
      setAgencies(result.data);
    });
  }, [agencies]);

  const renderAgencies = agencies.map(agency => {
    return (
      <Card
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
    <div>
      <h1>View All Agencies</h1>
      {renderAgencies}
    </div>
  );
};

export default AdminDashboard;
