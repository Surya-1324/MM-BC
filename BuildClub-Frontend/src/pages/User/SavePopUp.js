import React, { useState } from 'react';
import { CModal, CModalHeader, CModalBody, CModalFooter, CButton, CModalTitle } from '@coreui/react';
import SaveIcon from '../../assets/images/icons/save.svg';

const SavePopup = ({ showModal, closeModal }) => {
  return (
    <CModal
      visible={showModal}
      onClose={closeModal}
      className="modal-center"
    >
      <CModalHeader closeButton>
        <img
          src={SaveIcon}
          alt="Save Icon"
          style={{
            width: '4vw', // Adjust the width relative to the viewport
            height: '7vh' // Adjust the height relative to the viewport
          }}
        />
        <CModalTitle>Save</CModalTitle>
      </CModalHeader>
      <CModalBody>
        Are you sure you want to save your changes?
      </CModalBody>
      <CModalFooter className="modal-footer-common-buttons">
        <CButton onClick={closeModal}>Cancel</CButton>
        <CButton onClick={() => { closeModal(); /* Add your save logic here */ }}>Save</CButton>
      </CModalFooter>
    </CModal>
  );
};

export default SavePopup;
