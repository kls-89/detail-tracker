import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';

const NewAgencyForm = props => {
  const formik = useFormik({
    initialValues: {
      agencyName: '',
      address: '',
      phoneNumber: '',
      detailRate: ''
    },
    onSubmit: values => {
      axios
        .post('http://localhost:3001/admin/agency', values)
        .then(response => {
          console.log('success', response);
          props.history.goBack();
        })
        .catch(err => console.log('error making POST request', err));
    }
  });

  console.log(formik.values);

  return (
    <form
      method="POST"
      action="http://localhost:3001/admin/agency"
      onSubmit={formik.handleSubmit}
    >
      <label htmlFor="agencyName">Agency Name: </label>
      <input
        name="agencyName"
        id="agencyName"
        value={formik.values.agencyName}
        onChange={formik.handleChange}
      />
      <label htmlFor="address">Address: </label>
      <input
        name="address"
        id="address"
        onChange={formik.handleChange}
        value={formik.values.address}
      />
      <label htmlFor="phoneNumber">Phone Number: </label>
      <input
        name="phoneNumber"
        id="phoneNumber"
        onChange={formik.handleChange}
        value={formik.values.phoneNumber}
      />
      <label htmlFor="detailRate">Detail Rate: </label>
      <input
        name="detailRate"
        id="detailRate"
        onChange={formik.handleChange}
        value={formik.values.detailRate}
      />
      <button>Add Agency</button>
    </form>
  );
};

export default NewAgencyForm;
