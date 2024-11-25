import React, { useState, useEffect } from 'react';
import { Grid, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import InputField from '../InputField';
import SpeedOnGradientDrawer from '../DrawerText/SpeedOnGradientDrawer';
import LengthofgradeDrawer from '../DrawerText/LengthofgradeDrawer';
import TimetocrossDrawer from '../DrawerText/TimetocrossgradeDrawer';
import PDrawer from '../DrawerText/PDrawer';
import ContinuousGradientDrawer from '../DrawerText/ContinuousGradientDrawer';
import GradeabilityDrawer from '../DrawerText/GradeabilityDrawer';
import MaxspeedonlevelroadDrawer from '../DrawerText/Maxspeedonlevelroaddrawer';
import AccelerationfromresttospeedDrawer from '../DrawerText/AccelerationfromresttospeedDrawer';
import TimeToAccelerateDrawer from '../DrawerText/timeToAccelerateDrawer';
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

const PerformanceSpecs = ({ handlePrevious, handleNext }) => {
  const { id } = useParams();
  const [isEditable, setIsEditable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [performanceSpecsData, setPerformanceSpecsData] = useState([]);
  const [inputErrors, setInputErrors] = useState({}); // State to track input errors
  const [editSaveClicks, setEditSaveClicks] = useState([]); // Array to track Edit/Save clicks

  const hardCodedData = [
    { parameterMasterId: 9, range: 'Range: 0 - 7', text: <ContinuousGradientDrawer />, "vehicleTemplateId": 1 },
    { parameterMasterId: 10, range: 'Range: 2 - 60', text: <SpeedOnGradientDrawer />, "vehicleTemplateId": 1 },
    { parameterMasterId: 11, range: 'Range: 20 - 200', text: <MaxspeedonlevelroadDrawer />, "vehicleTemplateId": 1 },
    { parameterMasterId: 12, range: 'Range: 3 - 30', text: <GradeabilityDrawer />, "vehicleTemplateId": 1 },
    { parameterMasterId: 13, range: 'Range: 15 - 25', text: <LengthofgradeDrawer />, "vehicleTemplateId": 1 },
    { parameterMasterId: 14, range: 'Range: 5 - 40', text: <TimetocrossDrawer />, "vehicleTemplateId": 1 },
    { parameterMasterId: 15, range: 'Range: 20 - 100', text: <AccelerationfromresttospeedDrawer />, "vehicleTemplateId": 1 },
    { parameterMasterId: 16, range: 'Range: 1 - 20', text: <TimeToAccelerateDrawer />, "vehicleTemplateId": 1 },
    { parameterMasterId: 17, range: 'Range: 1 - 5', text: <PDrawer />, "vehicleTemplateId": 1 },
  ];

  useEffect(() => {
    const endpoint = 'vehicledynamics-services/vehicledynamics/vehicle/vehicleParameterData';
    const data = {
      parameterCategory: 'EV',
      vehicleTemplateId: 1,
      vehicleMasterId: id,
      parameterCategoryCode: 'PERFORMANCE_SPECS',
      userId: 'venkatesh.j@pilabz.in',
    };

    const getPerformanceSpecsData = async () => {
      try {
        const result = await fetchData(endpoint, data);
        // Modify the result by removing quotes from "parameterValue"
        const modifiedResult = result.map(item => {
          return {
            ...item,
            parameterValue: item.sysDataTypeCode === "INTEGER" || item.sysDataTypeCode === "DOUBLE" ? parseFloat(item.parameterValue) : item.parameterValue,
          };
        });

        setPerformanceSpecsData(modifiedResult);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getPerformanceSpecsData();
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

  // const combinedData = hardCodedData.map((hardCodedItem) => {
  //   const apiItem = performanceSpecsData.find(
  //     (item) => item.parameterMasterId === hardCodedItem.parameterMasterId
  //   );
  //   return { ...hardCodedItem, ...apiItem };
  // });

  const combinedData = hardCodedData.map(hardCodedItem => {
    const apiItem = performanceSpecsData.find(
      item => item.parameterMasterId === hardCodedItem.parameterMasterId
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

  // const handleChange = (parameterMasterId) => async (event) => {
  //   const newValue = event.target.value;
  //   const updatedData = combinedData.map((item) =>
  //     item.parameterMasterId === parameterMasterId
  //       ? { ...item, theValue: newValue }
  //       : item
  //   );

  //   setPerformanceSpecsData(updatedData);

  //   const dataToPost = updatedData.map(({ text, ...rest }) => rest);

  //   try {
  //     const endpoint = 'vehicledynamics-services/vehicledynamics/vehicle/saveParametersSet';
  //     await postData(endpoint, dataToPost);
  //     console.log('Data saved successfully');
  //   } catch (error) {
  //     console.error('Error saving data:', error);
  //   }
  // };

    // Validate input based on parameterMinValue and parameterMaxValue
    const validateInput = (parameterMasterId, value) => {
      const item = combinedData.find(data => data.parameterMasterId === parameterMasterId);
      if (!item || item.parameterMinValue === undefined || item.parameterMaxValue === undefined) return '';
  
      if (value < item.parameterMinValue || value > item.parameterMaxValue) {
        return `Value must be between ${item.parameterMinValue} and ${item.parameterMaxValue}`;
      }
  
      return ''; // No error
    };


  const handleChange = (parameterMasterId) => async (event) => {
    const newValue = event.target.value;

    // Validate input
    const errorText = validateInput(parameterMasterId, newValue);

    // Update the local state to reflect changes in the input field
    setPerformanceSpecsData((prevData) => {
      return prevData.map((item) =>
        item.parameterMasterId === parameterMasterId
          ? { ...item, parameterValue: newValue } // Update only the relevant field
          : item
      );
    });
    

    // Update error state
    setInputErrors((prevErrors) => ({
      ...prevErrors,
      [parameterMasterId]: errorText,
    }));
    // const dataToPost = combinedData.map(({ text, range, parameterCategoryId, parameterCategoryDescription, parameterCode, parameterName, parameterDescription, parameterUnit, parameterOperationType, ...rest }) => rest);

    // try {
    //   const endpoint = 'vehicledynamics-services/vehicledynamics/vehicle/saveParametersSet';
    //   await postData(endpoint, dataToPost);
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

  // const handleSave = async () => {
  //   await saveData();
  // };

  const handleNextWithSave = async () => {
  
    // Check if there are any non-empty error messages in inputErrors
    const hasErrors = Object.values(inputErrors).some(errorMessage => errorMessage !== '');
  
    if (hasErrors) {
      console.log('There are validation errors, cannot proceed.');
      return; // Exit the function if there are errors
    }
  
    // Check if the array length is odd or 0
    if (editSaveClicks.length === 0 || editSaveClicks.length % 2 !== 0) {
      console.log('Odd number or 0, calling saveData()');
      await saveData();
    } else {
      console.log('Even number');
    }
  
    handleNext(); // Proceed to the next step
  };

  const toggleEdit = () => {
    // Append `true` for Edit and `false` for Save
    setEditSaveClicks((prevClicks) => [...prevClicks, isEditable]);
    setIsEditable(!isEditable);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
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
              error={!!inputErrors[data.parameterMasterId]} // Pass error prop if there's an error
              helperText={inputErrors[data.parameterMasterId]} // Display error message
            />
          </Grid>
        ))}
      </Grid>
      <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '800px' }}>
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
          onClick={async () => {
            if (isEditable) {
              // Call save function if it's in edit mode
              const hasErrors = Object.values(inputErrors).some(errorMessage => errorMessage !== '');
  
              if (hasErrors) {
                console.log('There are validation errors, cannot proceed.');
                return; // Exit the function if there are errors
              }
              await saveData(); // Assuming handleSave is the function to save the data
            }
            // Toggle edit mode regardless
            toggleEdit();
          }}
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

export default PerformanceSpecs;
