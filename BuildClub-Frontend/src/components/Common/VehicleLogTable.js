import React, { useState, useEffect } from "react";
import {
  CSmartTable,
  CButton,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CCol,
  CRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormLabel,
  CFormInput,
  CFormTextarea,
} from "@coreui/react-pro";
import '@coreui/coreui/dist/css/coreui.min.css';
import duplicate from '../../assets/images/icons/Duplicate.svg';
import Delete from '../../assets/images/icons/Delete.svg';
import share from '../../assets/images/icons/Share.svg';
import createcta from '../../assets/images/icons/createcta.svg';
import createvlogo from '../../assets/images/icons/createvlogo.svg';
import DeleteIcon1 from '../../assets/images/icons/DeleteIcon1.svg';
import CreateVersionIcon from '../../assets/images/icons/createVersionIcon.svg';
import SharedataIcon from '../../assets/images/icons/SharedataIcon.svg';
import VehicleCreationIcon from '../../assets/images/icons/vehicleCreationIcon.svg';

import '../Common/VehicleLogTable.css';

import { fetchData, putData } from '../../services/api';
import GeneralError from './ErrorComponents/GeneralError';
import Error400 from './ErrorComponents/400Error';
import Error401 from './ErrorComponents/401Error';
import Error403 from './ErrorComponents/403Error';
import Error404 from './ErrorComponents/404Error';
import Error500 from './ErrorComponents/500Error';
import Error503 from './ErrorComponents/503Error';

const VehicleLogTable = ({ onVehicleNameClick, onVehicleDescriptionClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usersData, setUsersData] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [addUserModal, setAddUserModal] = useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const [createVersionConfirmModal, setCreateVersionConfirmModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [newVehicleName, setNewVehicleName] = useState('');
  const [newVehicleDescription, setNewVehicleDescription] = useState('');
  const [shareEmail, setShareEmail] = useState('');
  const [triggerFetch, setTriggerFetch] = useState(false);

  useEffect(() => {
    const endpoint = 'vehicledynamics-services/vehicledynamics/vehicle/all';
    const params = { userId: 'venkatesh.j@pilabz.in' };

    const getUsersData = async () => {
      try {
        const result = await fetchData(endpoint, params);
        // Convert timestamp to DD/MM/YYYY format here
        const formattedData = result.map(item => {
          if (item.createdOn) {
            const date = new Date(item.createdOn);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return { ...item, createdOn: `${day}/${month}/${year}` };
          }
          return item;
        });
        setUsersData(formattedData);
        setFilteredData(formattedData);
        console.log('Response from Server: ', formattedData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getUsersData();
  }, [triggerFetch]);

  if (loading) return <div>Loading...</div>;
  if (error) {
    if (error.response && error.response.status) {
      const { status } = error.response;
      if (status === 400) return <Error400 />;
      if (status === 401) return <Error401 />;
      if (status === 403) return <Error403 />;
      if (status === 404) return <Error404 />;
      if (status === 500) return <Error500 />;
      if (status === 503) return <Error503 />;
    }
    return <GeneralError />;
  }

  const columns = [
    { key: 'serialNum', label: 'S.No', _style: { width: '10%' } },
    {
      key: 'vehicleName',
      label: 'Vehicle Name',
      _style: { width: '20%' },
      _props: { className: 'clickable-vehicle-name' },
    },
    { 
      key: 'vehicleDescription', 
      label: 'Vehicle Description', 
      _style: { width: '40%' },
      _props: { className: 'clickable-vehicle-description' } 
    },
    { key: 'createdOn', label: 'Created On', _style: { width: '20%' } },
    { key: 'action', label: 'Actions', _style: { width: '10%' }, filter: false, sorter: false },
  ];

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = usersData.filter(item =>
      item.vehicleName.toLowerCase().includes(query) ||
      item.vehicleDescription.toLowerCase().includes(query)
    );
    setFilteredData(filtered);
  };

  const handleDeleteUser = (userId) => {
    const updatedData = usersData.filter(user => user.id !== userId);
    setUsersData(updatedData);
    setFilteredData(updatedData);
    setDeleteConfirmModal(false);
  };

  const handleCreateNewVehicle = async () => {
    const endpoint = 'vehicledynamics-services/vehicledynamics/vehicle/add';
    const newVehicle = {
      userId: 'venkatesh.j@pilabz.in',
      id: null,
      templateId: 1,
      vehicleName: newVehicleName,
      vehicleDescription: newVehicleDescription,
      // createdOn: new Date().toISOString().split('T')[0],
    };


    try {
      const response = await putData(endpoint, newVehicle);
      console.log('Vehicle created successfully:', response);
      setTriggerFetch(prev => !prev);  // Trigger re-fetching the table data
      setAddUserModal(false);           // Close the modal after success
      setNewVehicleName('');            // Reset the vehicle name input
      setNewVehicleDescription('');     // Reset the vehicle description input
      setSuccessModal(true);            // Open the success modal
      // Handle successful response (e.g., updating state, UI feedback)
    } catch (error) {
      console.error('Error creating vehicle:', error);
      // Handle error (e.g., show error message to user)
    }

    // const updatedData = [...usersData, newVehicle];
    // setUsersData(updatedData);
    // setFilteredData(updatedData);
    // setAddUserModal(false);
    // setNewVehicleName('');
    // setNewVehicleDescription('');
    // setSuccessModal(true);
    // setCreateVersionConfirmModal(false);
  };

  const isSaveButtonEnabled = () => {
    return newVehicleName.trim().length > 0 && newVehicleDescription.split(' ').length <= 50;
  };

  const handleShare = () => {
    console.log(`Sharing with ${shareEmail}`);
    setShareModal(false);
    setShareEmail('');
  };

  const handleCreateVersion = (vehicle) => {
    setSelectedVehicle(vehicle);
    setCreateVersionConfirmModal(true);
  };

  const handleDescriptionClick = (item) => {
    if (onVehicleDescriptionClick) {
      onVehicleDescriptionClick(item);
    }
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    const wordCount = value.split(' ').length;
    if (wordCount <= 50) {
      setNewVehicleDescription(value);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && isSaveButtonEnabled()) {
      e.preventDefault(); // Prevents the default action (e.g., form submission)
      handleCreateNewVehicle();
    }
  };

  return (
    <div className="CSmartTable">
      <CRow>
        <CCol>
          <div className="search-bar-container">
            <div className="search">
              <CFormInput
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearch}
                className="search-input"
              />
            </div>
            <div>
              <CButton className="create-vehicle-button-container" onClick={() => setAddUserModal(true)}>
                <img src={createcta} alt="create cta" style={{ marginRight: '8px' }} />
                Create New Vehicle
              </CButton>
            </div>
          </div>
        </CCol>
      </CRow>
      <CSmartTable
        activePage={1}
        clickableRows
        columns={columns}
        items={filteredData}
        itemsPerPageSelect
        itemsPerPage={10}
        pagination
        onFilteredItemsChange={(items) => { console.log(items); }}
        scopedColumns={{
          serialNum: (item, index) => (
            <td>{index + 1}</td>
          ),
          vehicleName: (item) => (
            <td className="clickable-vehicle-name" onClick={() => onVehicleNameClick(item)}>
              {item.vehicleName}
            </td>
          ),
          vehicleDescription: (item) => (
            <td className="clickable-vehicle-description" onClick={() => handleDescriptionClick(item)}>
              {item.vehicleDescription}
            </td>
          ),
          action: (item) => (
            <td className="py-2">
              <CDropdown>
                <CDropdownToggle color="secondary" className="custom-dropdown-toggle"></CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem className="custom-dropdown-item" onClick={() => handleCreateVersion(item)}>
                    <img src={duplicate} alt="Duplicate Icon" /> Create Version
                  </CDropdownItem>
                  <CDropdownItem className="custom-dropdown-item" onClick={() => { setShareModal(true); }}>
                    <img src={share} alt="share Icon" /> Share
                  </CDropdownItem>
                  <CDropdownItem className="custom-dropdown-item" onClick={() => { setDeleteConfirmModal(true); setUserIdToDelete(item.id); }}>
                    <img src={Delete} alt="Delete Icon" /> Delete
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </td>
          ),
        }}
        sorterValue={{ column: 'status', state: 'asc' }}
        tableProps={{ className: 'add-this-class' }}
      />

      <CModal
        visible={addUserModal}
        onClose={() => setAddUserModal(false)}
        className="modal-center"
      >
        <CModalHeader closeButton>
          <img src={createvlogo} alt="Logo" />
          <CModalTitle>Create New Vehicle</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <div className="mb-3">
              <CFormLabel htmlFor="vehicleName">Vehicle Name<span className="mandatory">*</span></CFormLabel>
              <CFormInput
                id="vehicleName"
                placeholder="Enter Vehicle Name"
                value={newVehicleName}
                onChange={(e) => setNewVehicleName(e.target.value)}
                onKeyPress={handleKeyPress}
                className="createvehinput"
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="vehicleDescription">Vehicle Description</CFormLabel>
              <CFormTextarea
                id="vehicleDescription"
                rows="3"
                value={newVehicleDescription}
                onChange={handleDescriptionChange}
                onKeyPress={handleKeyPress}
                className="createvehinputdes"
              />
              <small>{newVehicleDescription.split(' ').length}/50 words</small>
            </div>
            <div>
              <CModalFooter className="cmodalfooter">
                <CButton className="modal-footer-buttons" id="close" onClick={() => setAddUserModal(false)}>Close</CButton>
                <CButton className="modal-footer-buttons" id="submit" onClick={handleCreateNewVehicle} disabled={!isSaveButtonEnabled()}>Save</CButton>
              </CModalFooter>
            </div>
          </CForm>
        </CModalBody>
        {/* <CModalFooter>
          <CButton color="secondary" onClick={() => setAddUserModal(false)}>Cancel</CButton>
          <CButton color="primary" onClick={handleCreateNewVehicle} disabled={!isSaveButtonEnabled()}>Save</CButton>
        </CModalFooter> */}
      </CModal>

      <CModal
        visible={deleteConfirmModal}
        onClose={() => setDeleteConfirmModal(false)}
        className="modal-center"
      >
        <CModalHeader closeButton>
          <img src={DeleteIcon1} alt="Logo" />
          <CModalTitle>Delete </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>Are you sure you want to delete this vehicle?</p>
        </CModalBody>
        <CModalFooter className="modal-footer-common-buttons">
          <CButton id="close" onClick={() => setDeleteConfirmModal(false)}>Cancel</CButton>
          <CButton id="submit" onClick={() => handleDeleteUser(userIdToDelete)}>Delete</CButton>
        </CModalFooter>
      </CModal>

      <CModal
        visible={createVersionConfirmModal}
        onClose={() => setCreateVersionConfirmModal(false)}
        className="modal-center"
      >
        <CModalHeader closeButton>
          <img src={CreateVersionIcon} alt="Logo" />
          <CModalTitle>Create New Version </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>Are you sure you want to create a new version of this vehicle?</p>
        </CModalBody>
        <CModalFooter className="modal-footer-common-buttons">
          <CButton id="close" onClick={() => setCreateVersionConfirmModal(false)}>Cancel</CButton>
          <CButton id="submit" onClick={handleCreateNewVehicle}>Confirm</CButton>
        </CModalFooter>
      </CModal>

      <CModal
        visible={shareModal}
        onClose={() => setShareModal(false)}
        className="modal-center"
      >
        <CModalHeader closeButton>
          <img src={SharedataIcon} alt="Logo" />
          <CModalTitle>Share Vehicle</CModalTitle>
        </CModalHeader>
        <CModalBody>
        <CForm>
            <div>
              <CFormLabel htmlFor="shareEmail">Email Address</CFormLabel>
              <CFormInput
                id="shareEmail"
                value={shareEmail}
                onChange={(e) => setShareEmail(e.target.value)}
                required
                className="createvehinput"
              />
            </div>
          </CForm>
        </CModalBody>
        <CModalFooter className="modal-footer-common-buttons">
          <CButton id="close" onClick={() => setShareModal(false)}>Close</CButton>
          <CButton id="submit" onClick={handleShare}>Share</CButton>
        </CModalFooter>
      </CModal>

      <CModal
        visible={successModal}
        onClose={() => setSuccessModal(false)}
        className="modal-center"
      >
        <CModalHeader closeButton>
          <img src={VehicleCreationIcon} alt="Logo" />
          <CModalTitle>Vehicle Creation</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>Vehicle created successfully</p>
        </CModalBody>
        <CModalFooter className="modal-footer-common-buttons">
          <CButton id="submit" onClick={() => setSuccessModal(false)}>Close</CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default VehicleLogTable;
