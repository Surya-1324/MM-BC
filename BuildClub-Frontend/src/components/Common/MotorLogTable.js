import React, { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
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
import MotorCreatetionIcon from '../../assets/images/icons/MotorCreatetionIcon.svg';
import base_url from '../../services/api';
import { useBreadcrumb } from './BreadcrumbContext';

import '../Common/VehicleLogTable.css';

const MotorLogTable = ({ onMotorNameClick, onMotorDescriptionClick }) => {

 
  // localStorage.removeItem('applicationData')
  // localStorage.removeItem('applicationGetData')

  const [searchQuery, setSearchQuery] = useState('');
  const [usersData, setUsersData] = useState([]);

  const [filteredData, setFilteredData] = useState(usersData);
  const [addUserModal, setAddUserModal] = useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const [createVersionConfirmModal, setCreateVersionConfirmModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [selectedMotor, setSelectedMotor] = useState(null);
  const [newMotorName, setNewMotorName] = useState('');
  const [newMotorDescription, setNewMotorDescription] = useState('');
  const [shareEmail, setShareEmail] = useState('');
  const [isHovered, setIsHovered] =  useState({});


  const { setMotorName } = useBreadcrumb();

  const columns = [
    { key: 'serialNum', label: 'S.No', _style: { width: '10%' } },
    {
      key: 'motorName',
      label: 'Application Name',
      _style: { width: '20%' },
      _props: { className: 'clickable-motor-name' },
    },
    { 
      key: 'motorDescription', 
      label: 'Application Description', 
      _style: { width: '30%' },
      _props: { className: 'clickable-motor-description' } 
    },
    { key: 'createdOn', label: 'Created On', _style: { width: '20%' } },
    { key: 'action', label: 'Delete ', _style: { width: '10%' }, filter: false, sorter: false },
  ];

  useEffect(() => {
    console.log("Users Data:", usersData);  // Log the initial usersData
  }, [usersData]);
  
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    console.log("Search Query:", query);
    setSearchQuery(query);
    const filtered = usersData.filter(item =>
      item.motorName.toLowerCase().includes(query) ||
      item.motorDescription.toLowerCase().includes(query)
    );
    setFilteredData(filtered);
    console.log("Filtered Data:", filtered);  // Log the filtered data
  };
  
  const navigate = useNavigate();

  const user_id= sessionStorage.getItem('user_id'); 

  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await fetch(base_url+'/get_all_applications', {
            method: 'POST', // Use POST method
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id }), // Send user_id in the body
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
      }   

            const data = await response.json();

            // Map the fetched data to the required structure
            const formattedData = data.application_names.map((name, index) => ({
                id: index + 1, // or you can use a unique identifier if available
                motorName: name,
                motorDescription: data.application_desc[index],
                createdOn: data.created_at[index],
            }));
            setUsersData(formattedData);
          
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, []);

  const handleDeleteUser = (motor) => {
    const userId = motor.id
    const applicationName = motor.motorName;
    const updatedData = usersData.filter(user => user.id !== userId);
    setUsersData(updatedData);
    setFilteredData(updatedData);
    deleteapplication(applicationName)
    setDeleteConfirmModal(false);
  };

  function deleteapplication(applicationName) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "user_id": user_id,"application_name": applicationName })
    };

    fetch(base_url +"/delete_application", requestOptions)
        .then(response => response.text())
        .then(result => {
            // console.log(result);
        })
        .catch(error => {
            console.error('error', error)});
}


  const handleCreateNewMotor = () => {
    const newMotor = {
      id: usersData.length + 1,
      motorName: newMotorName,
      motorDescription: newMotorDescription,
      createdOn: new Date().toISOString().split('T')[0],
    };

    const updatedData = [...usersData, newMotor];
    setUsersData(updatedData);
    setFilteredData(updatedData);
    setAddUserModal(false);
    setNewMotorName('');
    setNewMotorDescription('');
    setSuccessModal(true);
    setCreateVersionConfirmModal(false);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "user_id": user_id, // Example user_id, replace or modify as necessary
        "application_name": newMotorName,
        // "desc": vehicleDesc
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(base_url +"/create_application", requestOptions)
        .then(response => response.text())
        .then(result => {
            // console.log(result);
        })
        .catch(error => {
            console.log('error', error)});

    
  };

  const isSaveButtonEnabled = () => {
    return newMotorName.trim().length > 0 && 
    newMotorDescription.split(' ').length <= 50;
  };

  const handleShare = () => {
    console.log(`Sharing with ${shareEmail}`);
    setShareModal(false);
    setShareEmail('');
  };

  const UpdateBreadCrumb = (item) => {
    setMotorName(item.motorName); // Update motor name in context
  };

  const handleDescriptionClick = (item) => {
    // if (onMotorDescriptionClick) {
    //   onMotorDescriptionClick(item);
    // }
    handleMotorClick(item)
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    const wordCount = value.split(' ').length;
    if (wordCount <= 50) {
      setNewMotorDescription(value);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && isSaveButtonEnabled()) {
      handleCreateNewMotor();
    }
  };

  

  const handleMotorClick = (motor) => {
   
    const applicationName = motor.motorName;

    localStorage.setItem('applicationName',applicationName)

    fetchapplicationData(applicationName).then((hasData) => {
        if (hasData) {
            const storedData = localStorage.getItem('vehicleData');
            if (storedData) {
                // console.log("Data retrieved from storage:", JSON.parse(storedData));
            } else {
                // console.log("No data found in local storage, unexpected scenario.");
            }
        } else {
            // console.log("Navigating without data.");
        }
        
        navigate("/user/motor-wiz");
    }).catch(error => {
        // Handle any errors from fetchApplicationData
        console.error("Error fetching application data:", error);
    });
};



async function fetchapplicationData(applicationName) {

const emptyData={
  "input": [],
  "output": [],
  "error": "none"
  }

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "user_id": user_id,
    "application_name": applicationName
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  try {
    const response = await fetch(base_url + "/get_application_data", requestOptions);
    const data = await response.json();

    if (data && data.input && !isEmpty(data.input)) {
      localStorage.setItem('applicationData', JSON.stringify(data));
      return true; // Indicate that data was found
    } else {
      createEmptyMotorData();
      console.error('No data found for the vehicle');
      return false; // Indicate no data found
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to complete the operation. Please try again.');
    throw error; // Rethrow the error to handle it in handleMotorClick
  }
}

function isEmpty(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}


function createEmptyMotorData() {
  const applicationGetData = {
      "powerSource": 36,
          "powerType": "1",
          "startingTorque":"Non-Zero",
          "idealDuration":100,
          "controlObjective": "Speed Control",
          "coolingSystem":"Finned Body",
          "duty": ['continuous'],
          "timeIntervals": "0" 
  };

  const applicationData = {
    "input": [],
    "output": [],
    "error": "none"
    }

    localStorage.setItem('applicationData', JSON.stringify(applicationData));
  
  // Store the vehicleGetData object in local storage
  localStorage.setItem('applicationGetData', JSON.stringify(applicationGetData));
  }





  return (
    <div className="CSmartTable" >
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
                <img src={createcta} alt="create cta" style={{ marginRight: '8px', width: '2vw', height: '5vh'  // Adjust the height relative to the viewport
          }} /> 
                Create New Application
              </CButton>
            </div>
          </div>
        </CCol>
      </CRow>
      <CSmartTable
        activePage={1}
        clickableRows
        columns={columns}
        itemsPerPageSelect
        itemsPerPage={10}
        items={filteredData.length > 0 ? filteredData : usersData}
        pagination
        onFilteredItemsChange={(items) => { console.log(items); }}
        scopedColumns={{
          serialNum: (item, index) => (
            <td>{index + 1}</td>
          ),
          motorName: (item) => (
            <td className="clickable-motor-name" onClick={() =>{ handleMotorClick(item); UpdateBreadCrumb(item);}}>
              {item.motorName}
            </td>
          ),
          motorDescription: (item) => (
            <td className="clickable-motor-description" onClick={() => handleDescriptionClick(item)}>
              {item.motorDescription}
            </td>
          ),
          action: (item,index) => (
            <td className="py-2">
        <button 
        className="delete-button" 
        onClick={() => { 
          setDeleteConfirmModal(true); 
          setUserIdToDelete(item); // Assuming item uniquely identifies the item to delete
        }}
        style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
      >
         <img 
      src={Delete} 
      alt="Delete Icon" 
      style={{ 
        width: isHovered[index] ? '3vw' : '3vw',
        height: isHovered[index] ? '3vh' : '2.5vh',
        transition: 'width 0.2s ease, height 0.2s ease',
        cursor: 'pointer',

      }}
      onMouseEnter={() => setIsHovered({ ...isHovered, [index]: true })}
      onMouseLeave={() => setIsHovered({ ...isHovered, [index]: false })}
    />
      </button>
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
          <img src={createvlogo} alt="Logo" style={{ 
            width: '4vw',  // Adjust the width relative to the viewport
            height: '7vh'  // Adjust the height relative to the viewport
          }} />
          <CModalTitle>Create New Application</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <div>
              <CFormLabel htmlFor="motorName">Motor Name <span className="mandatory">*</span></CFormLabel>
              <CFormInput
                id="motorName"
                placeholder="Enter Motor Name"
                value={newMotorName}
                onChange={(e) => setNewMotorName(e.target.value)}
                onKeyPress={handleKeyPress}
                className="createvehinput"
              />
            </div>
            <div>
              <CFormLabel htmlFor="motorDescription">Motor Description</CFormLabel>
              <CFormTextarea
                id="motorDescription"
                rows="3"
                value={newMotorDescription}
                onChange={handleDescriptionChange}
                onKeyPress={handleKeyPress}
                className="createvehinputdes"
              />
              <small>{newMotorDescription.split(' ').length}/50 words</small>
            </div>
            <div>
              <CModalFooter className="cmodalfooter">
                <CButton className="modal-footer-buttons" id="close" onClick={() => setAddUserModal(false)}>Close</CButton>
                <CButton className="modal-footer-buttons" id="submit" onClick={handleCreateNewMotor} disabled={!isSaveButtonEnabled()}>Save</CButton>
              </CModalFooter>
            </div>
          </CForm>
        </CModalBody>
      </CModal>

      <CModal
        visible={deleteConfirmModal}
        onClose={() => setDeleteConfirmModal(false)}
        className="modal-center"
      >
        <CModalHeader closeButton>
          <img src={DeleteIcon1} alt="Logo" style={{ 
            width: '4vw',  // Adjust the width relative to the viewport
            height: '7vh'  // Adjust the height relative to the viewport
          }} />
          <CModalTitle>Delete</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Are you sure you want to delete this motor?
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
          <img src={CreateVersionIcon} alt="Logo" style={{ 
            width: '4vw',  // Adjust the width relative to the viewport
            height: '7vh'  // Adjust the height relative to the viewport
          }} />
          <CModalTitle>Create New Version</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Are you sure you want to create a new version of this motor?
        </CModalBody>
        <CModalFooter className="modal-footer-common-buttons">
          <CButton id="close" onClick={() => setCreateVersionConfirmModal(false)}>Cancel</CButton>
          <CButton id="submit" onClick={handleCreateNewMotor}>Confirm</CButton>
        </CModalFooter>
      </CModal>

      <CModal
        visible={shareModal}
        onClose={() => setShareModal(false)}
        className="modal-center"
      >
        <CModalHeader closeButton>
          <img src={SharedataIcon} alt="Logo" style={{ 
            width: '4vw',  // Adjust the width relative to the viewport
            height: '7vh'  // Adjust the height relative to the viewport
          }} />
          <CModalTitle>Share Motor</CModalTitle>
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
          <img src={MotorCreatetionIcon} alt="Logo" />
          <CModalTitle>Motor Creation</CModalTitle>
        </CModalHeader>
        <CModalBody>
        <p>Motor created successfully</p>
        </CModalBody>
        <CModalFooter className="modal-footer-common-buttons">
          <CButton id="submit" onClick={() => setSuccessModal(false)}>Close</CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default MotorLogTable;
