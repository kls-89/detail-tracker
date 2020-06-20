import React, { useState } from 'react';
import axios from 'axios';

// TODO: Refactor with Formik or other library.

const NewAgencyForm = props => {
  const [agencyName, setAgencyName] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    // DUMMY DATA
    const newAgency = {
      name: agencyName,
      address: '123 Test Street',
      phoneNumber: '978-999-1234',
      detailRate: '40.00'
    };

    axios
      .post('http://localhost:3001/admin/agency', newAgency)
      .then(response => {
        console.log('success', response);
        props.history.goBack();
      })
      .catch(err => console.log('error making POST request', err));
  };

  const handleChange = e => {
    setAgencyName(e.target.value);
  };
  return (
    <form
      method="POST"
      action="http://localhost:3001/admin/agency"
      onSubmit={handleSubmit}
    >
      <label htmlFor="agencyName">Agency Name:</label>
      <input
        name="agencyName"
        id="agencyName"
        value={agencyName}
        onChange={handleChange}
      />
      <button>Add Agency</button>
    </form>
  );
};

export default NewAgencyForm;
