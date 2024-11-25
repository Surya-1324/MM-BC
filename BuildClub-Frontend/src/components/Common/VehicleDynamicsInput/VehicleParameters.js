import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Button } from '@mui/material';
import InputField from '../InputField';
import WheelRadiusDrawer from '../DrawerText/WheelRadiusDrawer';
import BatteryVoltageDrawer from '../DrawerText/BatteryVoltageDrawer';
import GrossVehicleWeightDrawer from '../DrawerText/Grossvehicleweight';
import FrontalAreaDrawer from '../DrawerText/FrontalAreaIcon';
import DragCoefficientDrawer from '../DrawerText/DragCoefficientDrawer';
import GearRatioDrawer from '../DrawerText/GearRatio';
import RollingResistanceDrawer from '../DrawerText/RollingResistanceDrawer';
import GearEfficiencyDrawer from '../DrawerText/GearEfficiencyDrawer';
import { ReactComponent as ArrowBackIcon } from '../../../assets/images/icons/previousleft.svg';
import { ReactComponent as ArrowForwardIcon } from '../../../assets/images/icons/nextright.svg';
import { ReactComponent as EditIcon } from '../../../assets/images/icons/edit.svg';
import { ReactComponent as SaveIcon } from '../../../assets/images/icons/save.svg';
import { fetchData, postData } from '../../../services/api';
import GeneralError from '../ErrorComponents/GeneralError';
import Error400 from '../ErrorComponents/400Error';
import Error401 from '../ErrorComponents/401Error';
import Error403 from '../ErrorComponents/403Error';
import Error404 from '../ErrorComponents/404Error';
import Error500 from '../ErrorComponents/500Error';
import Error503 from '../ErrorComponents/503Error';


const inputGridStyle = {
  display: 'flex',
  justifyContent: 'center',
};

const VehicleParameters = ({ handlePrevious, handleNext }) => {
  const { id } = useParams();
  const [isEditable, setIsEditable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [vehicleParametersData, setVehicleParametersData] = useState([]);

  const hardCodedData = [
    { parameterMasterId: 1, range: 'Range: 1 - 1000', text: <BatteryVoltageDrawer />, "vehicleTemplateId": 1 },
    { parameterMasterId: 2, range: 'Range: 1 - 10000', text: <GrossVehicleWeightDrawer />, "vehicleTemplateId": 1 },
    { parameterMasterId: 3, range: 'Range: 0.1 - 1', text: <WheelRadiusDrawer />, "vehicleTemplateId": 1 },
    { parameterMasterId: 4, range: 'Range: 0.3 - 10', text: <FrontalAreaDrawer />, "vehicleTemplateId": 1 },
    { parameterMasterId: 5, range: 'Range: 0.1 - 1', text: <DragCoefficientDrawer />, "vehicleTemplateId": 1 },
    { parameterMasterId: 6, range: 'Range: 0.1 - 100', text: <GearRatioDrawer />, "vehicleTemplateId": 1 },
    { parameterMasterId: 7, range: 'Range: 0.0001 - 0.03', text: <RollingResistanceDrawer />, "vehicleTemplateId": 1 },
    { parameterMasterId: 8, range: 'Range: 50 - 100', text: <GearEfficiencyDrawer />, "vehicleTemplateId": 1 },
  ];

  useEffect(() => {
    const endpoint = 'vehicledynamics-services/vehicledynamics/vehicle/vehicleParameterData';
    const data = {
      parameterCategory: 'EV',
      vehicleTemplateId: 1,
      vehicleMasterId: id,
      parameterCategoryCode: 'VEHICLE_PARAMETERS',
      userId: 'venkatesh.j@pilabz.in',
    };

    const getVehicleParametersData = async () => {
      try {
        const result = await fetchData(endpoint, data);
        // Modify the result by removing quotes from "parameterValue"
        const modifiedResult = result.map(item => {
          return {
            ...item,
            parameterValue: item.sysDataTypeCode === "INTEGER" || item.sysDataTypeCode === "DOUBLE" ? parseFloat(item.parameterValue) : item.parameterValue,
          };
        });

        setVehicleParametersData(modifiedResult);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getVehicleParametersData();
  }, [id]);

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

  const combinedData = hardCodedData.map((hardCodedItem) => {
    const apiItem = vehicleParametersData.find(
      (item) => item.parameterMasterId === hardCodedItem.parameterMasterId
    );

    // Rename keys in the apiItem if it exists
    const transformedApiItem = apiItem
      ? {
          ...apiItem,
          parameterDataTypeCode: apiItem.sysDataTypeCode,  // Rename sysDataTypeCode to parameterDataTypeCode
          theValue: apiItem.parameterValue === undefined || isNaN(apiItem.parameterValue)
          ? apiItem.parameterDefaultValue
          : apiItem.parameterValue,                // Rename parameterValue to theValue
        }
      : {};
  
    // Remove the original keys after renaming
    delete transformedApiItem.sysDataTypeCode;
    delete transformedApiItem.parameterValue;
  
    // Merge the transformed API data with the hard-coded data
    return { ...hardCodedItem, ...transformedApiItem };
  });

  console.log("Combined Data Vehicle Parameters: ", combinedData);

  const handleChange = (parameterMasterId) => async (event) => {
    const newValue = event.target.value;
    // Update the local state to reflect changes in the input field
    setVehicleParametersData((prevData) => {
      return prevData.map((item) =>
        item.parameterMasterId === parameterMasterId
          ? { ...item, parameterValue: newValue } // Update only the relevant field
          : item
      );
    });

    // try {
    //   const endpoint = 'vehicledynamics-services/vehicledynamics/vehicle/saveParametersSet';
    //   await postData(endpoint, updatedData);
    //   console.log('Data saved successfully');
    // } catch (error) {
    //   console.error('Error saving data:', error);
    // }
  };

  const saveData = async () => {
    const modifiedResult = combinedData.map(item => {
      return {
        ...item,
        theValue: item.parameterDataTypeCode === "INTEGER" || item.parameterDataTypeCode === "DOUBLE" ? parseFloat(item.theValue) : item.theValue,
      };
    });
    console.log("Combined Data inside Save: ", combinedData);
    console.log("Modified Result: ", modifiedResult);
    const dataToPost = modifiedResult.map(({ text, range, parameterCategoryId, parameterCategoryDescription, parameterCode, parameterName, parameterDescription, parameterUnit, parameterOperationType, ...rest }) => rest);
    console.log("Data to post: ",dataToPost);
    try {
      const endpoint = 'vehicledynamics-services/vehicledynamics/vehicle/saveParametersSet';
      await postData(endpoint, dataToPost);
      console.log('Data saved successfully');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleSave = async () => {
    await saveData();
    setIsEditable(false);
  };

  const handleNextWithSave = async () => {
    await saveData();
    handleNext();
  };

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid container spacing={0} maxWidth="800px">
        {combinedData.map((data, index) => (
          <Grid item xs={12} sm={6} key={index} sx={{ ...inputGridStyle }}>
            <InputField
              label={
                <span>
                  {data.parameterName}{' '}
                  {data.parameterUnit && <strong>({data.parameterUnit})</strong>}
                </span>
              }
              value={data.theValue || ''}
              onChange={handleChange(data.parameterMasterId)}
              infoHover={data.parameterDescription}
              infoRange={data.range}
              infoTitle={data.parameterName}
              infoText={data.text}
              readOnly={!isEditable}
            />
          </Grid>
        ))}
      </Grid>
      <div
        style={{
          padding: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '800px',
        }}
      >
        <Button
          variant="contained"
          onClick={handlePrevious}
          style={{
            backgroundColor: '#0069BD',
            borderRadius: '32px',
            color: '#fff',
            textTransform: 'none',
            fontFamily: 'Poppins',
            fontWeight: '400',
          }}
          startIcon={<ArrowBackIcon />}
        >
          Previous
        </Button>

        <Button
          variant="contained"
          onClick={toggleEdit}
          style={{
            backgroundColor: '#0069BD',
            borderRadius: '32px',
            color: '#fff',
            textTransform: 'none',
            fontFamily: 'Poppins',
            fontWeight: '400',
          }}
          startIcon={isEditable ? <SaveIcon /> : <EditIcon />}
        >
          {isEditable ? 'Save' : 'Edit'}
        </Button>

        <Button
          variant="contained"
          onClick={handleNextWithSave}
          style={{
            backgroundColor: '#0069BD',
            borderRadius: '32px',
            color: '#fff',
            textTransform: 'none',
            fontFamily: 'Poppins',
            fontWeight: '400',
          }}
          endIcon={<ArrowForwardIcon />}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default VehicleParameters;
