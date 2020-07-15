import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AgencyPage = props => {
  const agencyId = props.match.params.id;
  const [agency, setAgency] = useState([]);
  // const token = localStorage.getItem('token');
  useEffect(() => {
    document.title = agency.name;
    axios
      .get(`http://localhost:3001/admin/agency/${agencyId}`)
      .then(response => {
        setAgency(response.data);
      })
      .catch(error => {
        throw new Error('Error finding specific agency.', error);
      });
  }, [agencyId, agency]);
  return (
    <div>
      <h1>{agency.name}</h1>
      <h2>{agency.address}</h2>
    </div>
  );
};

export default AgencyPage;

// Object { outOfTownAvailable: true, employees: [], agencyAdministrators: [], details: [], name: "West Newbury Police Department", address: "401 Main Street West Newbury, MA 01985", phoneNumber: "978-363-1212", detailRate: 50, id: "5eedc9489f229f10271d6bde" }
