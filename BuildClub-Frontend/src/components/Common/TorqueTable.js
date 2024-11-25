import React from "react";
import { CSmartTable } from "@coreui/react-pro";
import '@coreui/coreui/dist/css/coreui.min.css';

const TorqueTable = ({ data }) => {
  const columns = [
    { key: 'PeakMode', label: 'Peak Mode' },
    { key: 'Speed', label: 'Speed (RPM)' },
    { key: 'Torque', label: 'Torque (Nm)' },
    { key: 'Power', label: 'Power (kW)' },
  ];

  return (
    <div className="CSmartTable">
      <CSmartTable
        activePage={1}
        columns={columns}
        items={data}
        tableProps={{
          className: 'add-this-class',
          responsive: true,
        }}
        tableBodyProps={{
          className: 'align-middle',
        }}
      />
    </div>
  );
};

export default TorqueTable;
