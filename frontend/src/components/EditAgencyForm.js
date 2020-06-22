import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:3001/admin';

const EditAgencyForm = props => {
  const agencyId = props.match.params.id;
  const [editFormValues, setEditFormValues] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    detailRate: ''
  });
  const [newAgencyAdministrator, setNewAgencyAdministrator] = useState({
    name: '',
    phoneNumber: '',
    emailAddress: '',
    passwordHash: null,
    isAgencyAdmin: null,
    canWordDetails: null,
    seniority: null,
    agencyAffiliation: agencyId
  });

  // Fetch data for individual agency.
  useEffect(() => {
    axios.get(`${BASE_URL}/agency/${agencyId}`).then(response => {
      setEditFormValues({ ...response.data });
    });
  }, [agencyId]);

  const handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    setEditFormValues({
      ...editFormValues,
      [name]: value
    });
  };

  const handleSetAdministratorChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    setNewAgencyAdministrator({
      ...newAgencyAdministrator,
      [name]: value
    });
  };

  const handleSubmitNewAdministrator = e => {
    console.log(newAgencyAdministrator);
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`${BASE_URL}/agency/${agencyId}`, {
        editFormValues
      })
      .then(response => {
        console.log('success updating agency form.', response);
        props.history.goBack();
      })
      .catch(err =>
        console.log('error making PUT request from edit agency form', err)
      );
  };

  // Create Agency Administrator if not yet established, otherwise, render Edit Agency form.

  const setAgencyAdministratorForm = (
    <form
      method="POST"
      action={`${BASE_URL}/employee/`}
      onSubmit={handleSubmitNewAdministrator}
    >
      <div className="form-group">
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={newAgencyAdministrator.name}
          onChange={handleSetAdministratorChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number: </label>
        <input
          type="text"
          className="form-control"
          id="phoneNumber"
          name="phoneNumber"
          value={newAgencyAdministrator.phoneNumber}
          onChange={handleSetAdministratorChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="emailAddress">Email Address: </label>
        <input
          type="email"
          className="form-control"
          id="emailAddress"
          name="emailAddress"
          value={newAgencyAdministrator.emailAddress}
          onChange={handleSetAdministratorChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={newAgencyAdministrator.password}
          onChange={handleSetAdministratorChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="seniority">Seniority: </label>
        <input
          type="number"
          className="form-control"
          id="seniority"
          name="seniority"
          value={newAgencyAdministrator.seniority}
          onChange={handleSetAdministratorChange}
        />
      </div>

      <div className="form-group">
        Make this employee an Agency Administrator?
        <div className="form-check">
          <label className="form-check-label" htmlFor="radio1">
            <input
              type="radio"
              className="form-check-input"
              id="radio1"
              name="isAgencyAdministrator"
              value="1"
              checked
            />
            Yes
          </label>
        </div>
        <div className="form-check">
          <label className="form-check-label" htmlFor="radio2">
            <input
              type="radio"
              className="form-check-input"
              id="radio2"
              name="isAgencyAdministrator"
              value="0"
            />
            No
          </label>
        </div>
      </div>

      <div className="form-group">
        Can this employee work details?
        <div className="form-check">
          <label className="form-check-label" htmlFor="radio1">
            <input
              type="radio"
              className="form-check-input"
              id="radio1"
              name="canWorkDetails"
              value="1"
              checked
            />
            Yes
          </label>
        </div>
        <div className="form-check">
          <label className="form-check-label" htmlFor="radio2">
            <input
              type="radio"
              className="form-check-input"
              id="radio2"
              name="canWorkDetails"
              value="0"
            />
            No
          </label>
        </div>
      </div>

      <div className="form-group">
        <input
          type="hidden"
          className="form-control"
          id="agencyAffiliation"
          name="agencyAffiliation"
          value={newAgencyAdministrator.agencyAffiliation}
          onChange={handleSetAdministratorChange}
        />
      </div>

      <button type="submit" className="btn btn-warning">
        Set Agency Administrator
      </button>
    </form>
  );

  //   passwordHash,

  //   agencyAffiliation;

  const editAgencyForm = (
    <form
      method="PUT"
      action={`${BASE_URL}/agency/${agencyId}`}
      onSubmit={handleSubmit}
    >
      <div className="form-group">
        <label htmlFor="name">Agency Name: </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={editFormValues.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="name">Address: </label>
        <input
          type="text"
          className="form-control"
          id="address"
          name="address"
          value={editFormValues.address}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number: </label>
        <input
          type="text"
          className="form-control"
          id="phoneNumber"
          name="phoneNumber"
          value={editFormValues.phoneNumber}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="detailRate">Detail Rate: $</label>
        <input
          type="text"
          className="form-control"
          id="detailRate"
          name="detailRate"
          value={editFormValues.detailRate}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-warning">
        Edit Agency
      </button>
    </form>
  );

  return (
    <div className="container">
      <h1>Edit Agency</h1>
      {editFormValues.agencyAdministrators === undefined
        ? editAgencyForm
        : setAgencyAdministratorForm}
    </div>
  );
};

export default EditAgencyForm;
