import React, { useState, useEffect } from 'react';
import { 
  Box, TextField, Select, MenuItem, Tooltip, Button, Grid, Radio, RadioGroup, FormControlLabel, Typography, InputLabel, FormControl, IconButton, 
  InputAdornment
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { useNavigate, useLocation } from 'react-router-dom';
import Add from '../../assets/images/icons/AddIcon.svg';
import car from '../../assets/images/icons/car.svg';
import editIcon from '../../assets/images/icons/editicon.svg'; 
import { ReactComponent as ArrowForwardIcon } from '../../assets/images/icons/nextright.svg';
import delIcon from '../../assets/images/icons/delicon.svg'; 
import { ReactComponent as InfoBlueIcon } from '../../assets/images/icons/InfoBlueIcon.svg'; 
import base_url from '../../services/api';
// import SavePopup from './SavePopUp';


const MotorWizComponent = () => {
  const CustomSelect = styled(Select)(({ theme }) => ({
    '& .MuiSelect-icon': {
      right: '35px', // Move the dropdown arrow 10px to the left of its default position
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px', // Set input box radius to 8px
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#0069BD', // Change border color on hover
    },
  }));
  console.log("MotorWizComponent Rendered");
  const location = useLocation(); 

  // Retrieve the JSON string from localStorage
const storedData = localStorage.getItem('applicationData');
const storedGetData = localStorage.getItem('applicationGetData');
// const pathsToWatch = ['/user/settings', '/user/feedback', '/user/motor-log'];

// // Parse the JSON string into an object
const applicationData =JSON.parse(storedData);
const applicationGetData = JSON.parse(storedGetData);
// const [showSavePopup, setShowSavePopup] = useState(false);
// const [hasChanges, setHasChanges] = useState(false);




// const handleNavigation = (nextLocation) => {
//   if (hasChanges && pathsToWatch.includes(location.pathname)) {
//     setShowSavePopup(true); // Show the popup if there are unsaved changes and the path matches
//   } else {
//     navigate(nextLocation); // Navigate to the next location if no unsaved changes
//   }
// };

// // Detect route changes by observing the location
// useEffect(() => {
//   if (hasChanges && pathsToWatch.includes(location.pathname)) {
//     setShowSavePopup(true); // Show the popup if there are unsaved changes
//   }
// }, [location, hasChanges]); // Only trigger this effect when location or changes state changes

// // Handle browser unload event to prevent page leave if changes are unsaved
// useEffect(() => {
//   const handleBeforeUnload = (e) => {
//     if (hasChanges) {
//       e.preventDefault();
//       e.returnValue = ''; // Show browser's unsaved changes warning
//     }
//   };
//   window.addEventListener('beforeunload', handleBeforeUnload);
//   return () => {
//     window.removeEventListener('beforeunload', handleBeforeUnload);
//   };
// }, [hasChanges]);
// const handleInputChange = (e) => {
//   setStartingTorque(e.target.value);
//   setHasChanges(true);
//   setShowSavePopup(true);
// };


// const handleCancel = () => {
//   setShowSavePopup(false);


// };

const isEmpty = (
  applicationData &&
  Array.isArray(applicationData.input) && applicationData.input.length === 0 &&
  Array.isArray(applicationData.output) && applicationData.output.length === 0
);

// // Access the input_power if applicationData exists
const I_inputPower = !isEmpty ? applicationData.input.input_power : applicationGetData.powerSource;
// const I_timeIntervals = applicationData ? applicationData.input.timeIntervals: [];
const I_coolingSystem = !isEmpty ? applicationData.input.coolingSystem : applicationGetData.coolingSystem;
const I_startingTorque = !isEmpty ? applicationData.input.startingTorque : applicationGetData.startingTorque;
const I_controlObjective = !isEmpty ? applicationData.input.controlObjective : applicationGetData.controlObjective;
const I_idealDuration = !isEmpty ? applicationData.input.idealDuration : applicationGetData.idealDuration;


  const [powerSource, setPowerSource] = useState(I_inputPower==230 ? "1 φ AC" : I_inputPower);
  const [startingTorque, setStartingTorque] = useState(I_startingTorque);
  const [controlObjective, setControlObjective] = useState(I_controlObjective);

  const [idealDuration, setIdealDuration] = useState(I_idealDuration); 
  const [coolingSystem, setCoolingSystem] = useState(I_coolingSystem);
  const [timeIntervals, setTimeIntervals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadinggif, setLoadinggif] = useState(true);
  const navigate = useNavigate();
  const [dataAltered, setDataAltered] = useState(false);


  
  const saveToLocalStorage = () => {
    localStorage.setItem('powerSource', powerSource);
    localStorage.setItem('startingTorque', startingTorque);
    localStorage.setItem('controlObjective', controlObjective);
    localStorage.setItem('idealDuration', idealDuration);
    localStorage.setItem('coolingSystem', coolingSystem);
    localStorage.setItem('timeIntervals', JSON.stringify(timeIntervals));
  };

  const   addDefaultTimeIntervals = () => {
    if (idealDuration > 0 && idealDuration <= 250) {
      const intervalLength = Math.floor(idealDuration / 2);
      const newTimeIntervals = [
        { from: 0, to: intervalLength, speed: 0, torque: 0 },
        { from: intervalLength, to: idealDuration, speed: 0, torque: 0 }
      ];
      setTimeIntervals(newTimeIntervals);
    }
  };

  useEffect(() => {
    // Attempt to load timeIntervals from localStorage
    const storedData = localStorage.getItem('applicationData');
    if (storedData.input != []) {
      const parsedData = JSON.parse(storedData);
      if (parsedData.input && parsedData.input.timeIntervals) {
        setTimeIntervals(parsedData.input.timeIntervals);
        setDataAltered(false);
      } else {
        addDefaultTimeIntervals();
        setDataAltered(true);
      }
    } else {
      addDefaultTimeIntervals();
      setDataAltered(true);
    }
    // if (storedData) {
    //   setDataAltered(false);
    // } else {
    //   setDataAltered(true);
    // }
  }, [idealDuration]);

  useEffect(() => {
    // if (!isEditable) {
    //   saveToLocalStorage();
    // }else{
    //   saveToLocalStorage();
    // }
    saveToLocalStorage();
     // Save data to local storage when state changes
  }, [powerSource, startingTorque, controlObjective, idealDuration, coolingSystem, timeIntervals]);


  function makeAPICall() {
    let inputPower = localStorage.getItem('powerSource');
    // const powerType = localStorage.getItem('powerType');
    // const duty = JSON.parse(localStorage.getItem('duty'));
    // const points = JSON.parse(localStorage.getItem('points'));

    const userId = sessionStorage.getItem('user_id');
    
    //For now
    let powerType = ""
    
    if(inputPower=="1 φ AC"){
      inputPower = 230
      powerType = "2"
    }else{
      powerType = "1"
    }

    let duty=['continuous']

    const data = JSON.parse(localStorage.getItem('timeIntervals'));

    const timeIntervalslen = (JSON.parse(localStorage.getItem('timeIntervals'))).length

    let points=[]

    if (timeIntervalslen === 1){
      const speed1 = data[0].speed;
      const torque1 = data[0].torque;

      const pointss = [speed1,torque1]

      points = [pointss]

    }else if(timeIntervalslen === 2){
      // Extract speed and torque, then calculate desired values
      const speed1 = data[0].speed;
      const torque1 = data[0].torque;
      const speed2 = data[1].speed;
      const torque2 = data[1].torque;
      
      const pointss = [speed1,torque1,speed2,torque2]
    
      points = [pointss]

    }else if(timeIntervalslen === 3){
      // Extract speed and torque, then calculate desired values
      const speed1 = data[0].speed;
      const torque1 = data[0].torque;
      const speed2 = data[1].speed;
      const torque2 = data[1].torque;

      const speed3 = data[2].speed;
      const torque3 = data[2].torque;
      
      const points1 = [speed1,torque1,speed2,torque2]

      const points2 = [speed3,torque3]
      
      points = [points1,points2]

    }else{
      // Extract speed and torque, then calculate desired values
      const speed1 = data[0].speed;
      const torque1 = data[0].torque;
      const speed2 = data[1].speed;
      const torque2 = data[1].torque;

      const speed3 = data[2].speed;
      const torque3 = data[2].torque;
      const speed4 = data[3].speed;
      const torque4 = data[3].torque;
      
      const points1 = [speed1,torque1,speed2,torque2]

      const points2 = [speed3,torque3,speed4,torque4]
      
      points = [points1,points2]

    }


    localStorage.setItem('points', JSON.stringify(points));

    const applicationName = localStorage.getItem('applicationName')

    const raw = JSON.stringify({
        "user_id": userId,
        "application_name": applicationName,
        "input_power": parseFloat(inputPower),
        "power_type": powerType,
        "duty": duty,
        "points": points,
        "timeIntervals": data,
        "startingTorque": startingTorque,
        "controlObjective": controlObjective,
        "idealDuration": idealDuration,
        "coolingSystem": coolingSystem
    })

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: raw,
        redirect: "follow"
    };


    fetch(base_url+"/application_dynamics", requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(result => {
            if (result.peak_torque && result.max_no_load_rpm && result.i_max && result.v_dc) {
                // console.log("result",result)
                localStorage.setItem('batteryVoltage', result.v_dc);
                localStorage.setItem('peak_torque', result.peak_torque);
                localStorage.setItem('noLoadSpeed', result.max_no_load_rpm);
                localStorage.setItem('i_max', result.i_max);
                localStorage.setItem('application_type',"application");
                createMotor()
                runSimulation()
                // navigateToNextPage();
            } else {
                console.error('API response is missing required fields:', result);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
};


function createMotor() {

  const vehiName = localStorage.getItem('applicationName')
  const user_id = sessionStorage.getItem('user_id');

  const motorName = vehiName + '_Motor'
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
      "user_id": user_id, // Example user_id, replace or modify as necessary
      "vehicle_name":vehiName,
      "motor_name": motorName,
      "desc": motorName + 'description'
  });

  const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
  };

  fetch(base_url +"/create_motor", requestOptions)
      .then(response => response.text())
      .then(result => {
          // console.log(result);
      })
      .catch(error => {
          console.log('error', error)});

}


function runSimulation() {

  const vehiName = localStorage.getItem('applicationName')
  const user_id = sessionStorage.getItem('user_id');
  const motorName = vehiName + '_Motor'

  
	const aspectRatio = '0.8';
    const noOfPoles = '6';
    const noOfSlots = '9';
    const coilSpan = "1";
    const gAirgap = '0.5';
    const lPm = '5';
    const toothHeight = '0.5';
    const fillFactor = '35';
    const ambientTemperature = '40';
    const htcConv ='30';
    const finAreaFactor = '3.5';
    const housingStackLengthRatio =  '70';
    const htcCondYokeHousing = '20000';
    const htcCondWireYoke = '';
    const wireMaterial = 'COPPER';
    const wireGauge = '24 SWG';
    const magnetType = 'N42';
    const steelType = 'M250-35A';
    const topology = 'IPMSM';
    const trv = '0.1'
    const batterVoltage = localStorage.getItem('powerSource');
    const peak_torque = localStorage.getItem('peak_torque');
    const rated_speed = localStorage.getItem('rated_speed');
    const typeofVehicle = localStorage.getItem('application_type');
    
    // console.log("peak_torque",peak_torque)
    // console.log("rated_speed",rated_speed)
    // console.log("battery",batterVoltage)
    // console.log('aspectRatio:', aspectRatio);
// console.log('noOfPoles:', noOfPoles);
// console.log('noOfSlots:', noOfSlots);
// console.log('coilSpan:', coilSpan);
// console.log('gAirgap:', gAirgap);
// console.log('lPm:', lPm);
// console.log('toothHeight:', toothHeight);
// console.log('fillFactor:', fillFactor);
// console.log('ambientTemperature:', ambientTemperature);
// console.log('htcConv:', htcConv);
// console.log('finAreaFactor:', finAreaFactor);
// console.log('housingStackLengthRatio:', housingStackLengthRatio);
// console.log('htcCondYokeHousing:', htcCondYokeHousing);
// console.log('htcCondWireYoke:', htcCondWireYoke);
// console.log('wireMaterial:', wireMaterial);
// console.log('wireGauge:', wireGauge);
// console.log('magnetType:', magnetType);
// console.log('steelType:', steelType);
// console.log('topology:', topology);
// console.log('trv',trv)

  
    if (topology == "IPMSM"){
        var topo = [topology,"RADIAL","INTERIOR"]
    }else{
      var topo = [topology,"RADIAL","SURFACE"]
    }
  
    var magnet = [magnetType,"RE"]
    var steel = [steelType,"IRON"]
    var wire = [wireGauge,wireMaterial]
   

	const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
    const data = {
        user_id: user_id,
        vehicle_name: vehiName,
        motor_name: motorName,
        peak_torque:  parseInt(localStorage.getItem('peak_torque')),
        rated_speed:3000,
        rated_torque: 4,
        max_no_load_rpm: parseFloat(localStorage.getItem('noLoadSpeed')),
        voltage_limit: parseInt(localStorage.getItem('powerSource')),
        trv: parseFloat(trv),
        aspect_ratio: parseFloat(aspectRatio),
        no_of_poles: parseInt(noOfPoles),
        no_of_slots: parseInt(noOfSlots),
        coil_span: 1,
        g_airgap: parseFloat(gAirgap),
        L_pm: parseFloat(lPm),
        tooth_height: parseFloat(toothHeight),
        fill_factor: parseFloat(fillFactor),
        ambient_temperature: parseFloat(ambientTemperature),
        htc_conv: parseFloat(htcConv),
        fin_area_factor: parseFloat(finAreaFactor),
        housing_stack_length_diff: parseFloat(housingStackLengthRatio),
        htc_cond_yoke_housing: parseFloat(htcCondYokeHousing),
        htc_cond_wire_yoke: "200",  //doubt
        magnet: magnet,
        steel: steel,
        wire: wire,
        topology:topo,
        application_type:typeofVehicle,
    };

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(data),
        redirect: "follow"
    };

    let intervalId;
    let totalTimeElapsed = 0;
    const initialDelay = 60000; // 1 minute
    const subsequentInterval = 5000; // 5 seconds
    const maxTime = 1200000;

    fetch(base_url+ "/motorwiz", requestOptions)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json(); // Assuming response is in JSON format
    })
    .then(result => {
        if (result.status === 'started' && result.error === 'none') {
          setLoading(true)
            setTimeout(()=>{
              motor_get_data();
              intervalId = setInterval(() => {
                    totalTimeElapsed += subsequentInterval;
                    if (totalTimeElapsed >= maxTime) {
                        clearInterval(intervalId);
                        alert('Operation timed out after 20 minutes.');
                        navigate('/user/motor-wiz')
                        return;
                    }
                    motor_get_data();
                }, subsequentInterval);
            },60000)
             // Call every 20 seconds
        } else {
            console.error('Invalid status or error:', result);
            alert('Invalid status or error:', result.error);
            
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert(error);
        
    });
    

    function motor_get_data() {
    fetch(base_url+ "/get_motor_data", requestOptions)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json(); // Assuming response is in JSON format
    })
    .then(result => {
            // console.log(result)
            if (result.status === 'running' && result.error === 'none') {
                // console.log('Status is still running. Retrying in 20 seconds...');
                // Stop the interval
                // Store data in localStorage
                // Do something with the result if needed
            } else {
                // console.log("result",result.output.error)
                // console.log("status",result.output.status)
                let output;
                if (typeof(result.output) === "string"){
                    output = JSON.parse(result.output);
                    // console.log("in motor get dta",output)
                    }
                    else{
                        output=result.output
                    }

                if (output.status==='error'){

                    // console.log(output.error)
                    
                    alert(output.error)
                    clearInterval(intervalId);
                    navigate('/user/motor-wiz')
                }
                else{
                let output;
                try {
                    if (typeof(result.output) === "string"){
                    output = JSON.parse(result.output);
                    // console.log("in motor get dta",output)
                    }
                    else{
                        output=result.output
                    }
                } catch (e) {
                    console.error('Error:', output.error);
                    alert('Error: ' + output.error);
                    clearInterval(intervalId);
                    navigate('/user/motor-wiz')
                    }
                 if (output.status === 'finished' && output.error == 'none') {
                    // console.log('Output:', output);
                    clearInterval(intervalId);
                    localStorage.setItem('motorDataOutput', JSON.stringify(output));
                    localStorage.removeItem('motorDataInput');
                    localStorage.removeItem('motorGetData');
                    localStorage.removeItem('materialEdited');
                    localStorage.removeItem('geometryEdited');
                    localStorage.removeItem('thermalEdited');
                    localStorage.removeItem('topologyEdited');
                    // navigateToNext();

                    const applicationName=localStorage.getItem('applicationName')
 

                    navigate('/user/motor-wiz-output')

                    fetchapplicationData(applicationName)
                } else {
                    console.error('Unexpected output status:', output.status);
                    alert('Unexpected output status: ' + output.status);
                    clearInterval(intervalId);
                }
            }
            }
            
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error'+error);
        clearInterval(intervalId);
        navigate('/user/motor-wiz')
    });
    }

}



async function fetchapplicationData(applicationName) {    
  const user_id=sessionStorage.getItem('user_id')
  
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

    if (data && data.input && !isEmptyy(data.input)) {
      localStorage.setItem('applicationData', JSON.stringify(data));
      return true; // Indicate that data was found
    } else {
      console.error('No data found for the vehicle');
      return false; // Indicate no data found
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to complete the operation. Please try again.');
    throw error; // Rethrow the error to handle it in handleMotorClick
  }
}

function isEmptyy(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}


const handleTimeIntervalChange = (index, field, value) => {
  const updatedIntervals = [...timeIntervals];
  const parsedValue = value !== '' ? parseFloat(value) : '';

  // Set the value for the specified field
  updatedIntervals[index][field] = parsedValue;

  if (field === 'to') {
    // Check if 'to' value matches or exceeds the ideal duration
    if (parsedValue >= idealDuration) {
   

      // Retain only up to the current row if 'to' value exactly matches idealDuration
      if (parsedValue === idealDuration) {
        setTimeIntervals(updatedIntervals.slice(0, index + 1));
      } else {
        setTimeIntervals(updatedIntervals);
      }
    } else {
      // Remove any error if within valid range
      updatedIntervals[index].toError = false;
      updatedIntervals[index].toErrorMessage = "";

      // Sync 'from' field of the next interval for consistency
      if (index < updatedIntervals.length - 1) {
        updatedIntervals[index + 1].from = parsedValue;
      }
      setTimeIntervals(updatedIntervals);
    }
  } else {
    setTimeIntervals(updatedIntervals);
  }
};



function validateTimeInterval(index, validateOnAdd = false) {
  setTimeIntervals((prevIntervals) => {
    const intervals = [...prevIntervals];
    const interval = intervals[index];

    // If not adding, reset the errors
    if (!validateOnAdd) {
      interval.toError = false;
      interval.toErrorMessage = "";
    } else {
      // Perform validation only when adding an interval
      // Check if 'From' is less than 'To'
      if (Number(interval.from) >= Number(interval.to)) {
        interval.toError = true;
        interval.toErrorMessage = "'To' must be greater than 'From'";
      } 

      // Check if 'To' exceeds or equals the ideal duration
      if (Number(interval.to) > idealDuration) {
        interval.toError = true;
        interval.toErrorMessage = " Ideal Duration Exceeded";
      } else if (Number(interval.to) === idealDuration) {
        interval.toError = true;
        interval.toErrorMessage = "Limit Exceeded";
      }
    }

    return intervals;
  });
}


  // Adds new interval row
  const addTimeInterval = () => {
    // Validate the last interval before adding a new one
    const lastIndex = timeIntervals.length - 1;
    validateTimeInterval(lastIndex, true);  // Pass true to indicate validation on add
  
    // Check if there are any errors in the last interval
    const hasErrors = timeIntervals.some((interval) => interval.toError);
  
    // Proceed to add the interval only if there are no errors
    if (!hasErrors) {
      if (timeIntervals.length < 5) {
        const last = timeIntervals[timeIntervals.length - 1];
        if (last.to < idealDuration) {
          const newInterval = {
            from: last.to,
            to: idealDuration,
            speed: 0,
            torque: 0,
            toError: false,
            toErrorMessage: '',
          };
          setTimeIntervals([...timeIntervals, newInterval]);
        }
      } else {
        alert('Max of 5 intervals allowed.');
      }
    } 
  };
  
  const deleteTimeInterval = (index) => {
    const newTimeIntervals = [...timeIntervals];
    const updatedIntervals = timeIntervals.filter((_, i) => i !== index);
    if (index > 0) {
 
      newTimeIntervals[index - 1].to = idealDuration; 
    }
    setTimeIntervals(updatedIntervals);
  };
  




  const [isEditable, setIsEditable] = useState(false);
  const [isEditingComplete, setIsEditingComplete] = useState(false);
  const handleEditClick = () => {
    setIsEditable(!isEditable); 
    setDataAltered(true)
    if (!isEditable) { 
      saveToLocalStorage();
      setIsEditingComplete(true);
    //   setStartingTorque('Non-Zero');
    //   setControlObjective('Speed Control');
    //   setIdealDuration(100);
    //   setCoolingSystem('Finned Body');
    //   addDefaultTimeIntervals();
    }
  };
  
  
  const handleNextClick = () => {


    if (dataAltered) {
      makeAPICall()
      // createMotor()
      // runSimulation();
  } else {
    navigate('/user/motor-wiz-output');
  }

    
  };

  const handleIdealDurationChange = (e) => {
    const value = e.target.value;
    setIdealDuration(value); 
  };
  
  const handleIdealDurationBlur = () => {
    setIdealDuration((prev) => Math.min(Math.max(1, prev), 250));
  };

  useEffect(() => {
    if (startingTorque === 'Zero') {
      setControlObjective('Speed Control');
    }
  }, [startingTorque]);


  useEffect(() => {
    if (loading) {
      // Navigate to a new route when loading is true
      navigate('/user/loading');  // Replace '/loading' with your desired path
    }
  }, [loading, navigate]);
  return (

    <Box sx={{ px: 10, borderRadius: 2, maxWidth: '1200px', margin: 'auto',  fontFamily: 'Poppins' }}>
    {/* {showSavePopup && <SavePopup showModal={showSavePopup} closeModal={handleCancel} />} */}
      <Grid container alignItems="center" py={2} >
        <Grid item  mb={2}>
          <img src={car} alt="Description" style={{ width: '46px', height: '46px', marginRight: '4px' }} />
        </Grid>
        <Grid item mb={1}>
          <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Poppins',color:'#0069BD' }}>
            Active Interval Time
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={3} alignItems="center">
        
      <Grid item xs={12} sm={6} md={6}>
  <FormControl 
  style={{ width: 'clamp(327.06px, 30.944vw, 593.94px)',   // min width, scalable vw, max width
    height: 'clamp(42px, 5.469vh, 70px)',   }}
  >
    <InputLabel 
     shrink={true} 
      sx={{ 
        // color: isEditable ? '#0069BD' : '#9e9e9e',
        color:'#0069bd',
        fontFamily: 'Poppins', 
        fontWeight:'600',
        fontSize: '16px',
  
        '&.Mui-focused': {
          color: '#0069BD', 
        }
      }}
    >
      Power Source (V)
    </InputLabel>
    <CustomSelect
      value={powerSource}
     
      onChange={(e) => setPowerSource(e.target.value)}
      label="Power Source (V).."
      // disabled={!isEditable} 
      endAdornment={
        <InputAdornment position="end" sx={{ opacity:1 }}>
          <Tooltip title="">
            <IconButton edge="end">
              <InfoBlueIcon  />
            </IconButton>
          </Tooltip>
        </InputAdornment>
      }
      sx={{
        '& .MuiSelect-select': {
          // color: isEditable ? '#222222' : '#9e9e9e',
          color:'#222222'
        },
        '&.Mui-disabled .MuiSelect-select': {
          color: '#222222', 
        },
        '& .MuiOutlinedInput-notchedOutline': { // Target the outline border
          // borderColor: isEditable ? '#cccccc' : '#9e9e9e', // Default border color
          borderColor:'#9e9e9e',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#0069BD',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#0069BD', // Change border color when focused
        },
        
      }}
      InputLabelProps={{
        sx: {
          fontFamily: 'Poppins',
          fontSize: '16px',
          fontWeight: '500',
          
          color: 'inherit',
          '&.Mui-focused': {
            color: '#0069BD',
          },
        },
      }}
    >
      <MenuItem value={"1 φ AC"}>1 φ AC</MenuItem>
      <MenuItem value={24}>24-DC</MenuItem>
      <MenuItem value={36}>36-DC</MenuItem>
      <MenuItem value={48}>48-DC</MenuItem>
      <MenuItem value={72}>72-DC</MenuItem>
    </CustomSelect>
  </FormControl>
</Grid>

       

        <Grid item xs={12} sm={6} md={6}>
          <FormControl  style={{width: 'clamp(327.06px, 30.944vw, 593.94px)',
    height: 'clamp(42px, 5.469vh, 70px)',  marginLeft:'2vw' }} >
          <InputLabel 
    sx={{ 
      // color: isEditable ? '#0069BD' : '#9e9e9e', 
      color:'#0069bd',
      fontFamily: 'Poppins',
     fontSize:'16px',
     fontWeight:'600',
      '&.Mui-focused': {
        color: '#0069BD', 
      }
    }}
  >
   Starting Torque (Nm)
  </InputLabel>
         
            <CustomSelect
              value={startingTorque}
              onChange={(e) => {
                setStartingTorque(e.target.value); 
              
              }} 
              label="Starting Torque (Nm)...."
              // disabled={!isEditable} 
              endAdornment={
                <InputAdornment position="end" >
                  <Tooltip title="">
                    <IconButton edge="end">
                      <InfoBlueIcon />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              }
              sx={{
                '& .MuiSelect-select': {
                  color: '#222222', 
                },
                '&.Mui-disabled .MuiSelect-select': {
                  color: '#222222', 
                },
                '& .MuiOutlinedInput-notchedOutline': { // Target the outline border
                  borderColor:'#9e9e9e',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#0069BD',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#0069BD', // Change border color when focused
                },
              }}
        
            >
              <MenuItem value="Non-Zero">Non-Zero</MenuItem>
              <MenuItem value="Zero">Zero</MenuItem>
            </CustomSelect>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
        <FormControl
  style={{
    width: 'clamp(327.06px, 30.944vw, 593.94px)',
    height: 'clamp(42px, 5.469vh, 70px)',
    marginTop: '2.5vh',
    marginBottom: '1vh',
  }}
>
  <InputLabel
    sx={{
      color:'#0069bd',
      fontFamily: 'Poppins',
      fontWeight: '600',
      fontSize: '16px',
      '&.Mui-focused': {
        color: '#0069BD',
      },
    }}
  >
    Control Objective

    
  </InputLabel>

  <CustomSelect
    value={controlObjective}
    onChange={(e) => setControlObjective(e.target.value)}
    label="Control Objective..."
    disabled={startingTorque === 'Zero' && controlObjective !== 'Speed Control'}
    endAdornment={
      <InputAdornment position="end" >
        <Tooltip title="">
          <IconButton edge="end">
            <InfoBlueIcon />
          </IconButton>
        </Tooltip>
      </InputAdornment>
    }
    sx={{
      '& .MuiSelect-select': {
        color: '#222222', 
      },
      '&.Mui-disabled .MuiSelect-select': {
        color: '#222222', 
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor:'#9e9e9e',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#0069BD',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#0069BD',
      },
      '& .MuiSelect-icon': {
        order: 1, // Places the down arrow at the end, allowing us to place the Info icon before it
      },
    }}
  >

    

    <MenuItem value="Speed Control">Speed Control</MenuItem>
    {startingTorque !== 'Zero' && (
      <MenuItem value="Position Control">Position Control</MenuItem>
    )}
  </CustomSelect>
</FormControl>


</Grid>

  
        <Grid item xs={12} sm={6} md={6}>
        <TextField
   style={{ width: 'clamp(327.06px, 30.944vw, 593.94px)',  
    height: 'clamp(42px, 5.469vh, 70px)',   marginTop: '2.5vh',     
    marginBottom: '1vh' ,marginLeft:'2vw' }}
    label={<span>Ideal Duration (s)&nbsp;&nbsp;&nbsp;</span>} 
 
  value={idealDuration}
  onChange={handleIdealDurationChange}
  onBlur={handleIdealDurationBlur}
  // disabled={!isEditable} 
InputProps={{
  endAdornment:(
      <Tooltip title="">
        <IconButton edge="end">
          <InfoBlueIcon />
        </IconButton>
      </Tooltip>
  )
}}
  InputLabelProps={{
    
    sx: { 
      fontFamily: 'Poppins',
      fontSize: '16px',
      fontWeight:'600',
      color:'#0069BD' ,
    }
  }}
  sx={{
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        color: '#222222', 
      },
      '&:hover fieldset': {
        borderColor: '#0069BD', // Change border color on hover
      },
      '&.Mui-focused fieldset': {
        borderColor: '#0069BD', // Change border color when focused
      },
    },
    '& .MuiInputBase-input': {
      color: '#222222', 
    },
  }}
/>

        </Grid>
      </Grid>

<Box
  sx={{
    borderRadius: 2,
    width: 'clamp(675px, 67.5vw, 1186.8px)',
    overflowY: 'auto',
    border: '1px solid #b4b4b4',
    mt: 4,
  }}
>
  <Grid container spacing={0} sx={{ bgcolor: '#e3f2fd', p: 2, borderRadius: '4px', mb: 2, pr: 8 ,borderBottom:'1px solid #b4b4b4' }}>
  <Grid item xs={4} sm={4} md={4}>
  <Typography 
    align="center" 
    variant="h6" 
    sx={{ 
      fontFamily: 'Poppins', 
      fontSize: '1rem', 
      fontWeight: 600, 
      color:'#0069bd'
    }}
  >
    Time Interval(s)
  </Typography>
</Grid>
<Grid item xs={4} sm={4} md={4}>
  <Typography 
    align="center" 
    variant="h6" 
    sx={{ 
      fontFamily: 'Poppins', 
      fontSize: '1rem', 
      fontWeight: 600, 
      color:'#0069bd'
    }}
  >
    Speed (RPM)
  </Typography>
</Grid>
<Grid item xs={4} sm={4} md={4}>
  <Typography 
    align="center" 
    variant="h6" 
    sx={{ 
      fontFamily: 'Poppins', 
      fontSize: '1rem', 
      fontWeight: 600, 
    color:'#0069bd'
    }}
  >
    Torque (Nm)
  </Typography>
</Grid>

  </Grid>

  {timeIntervals.map((interval, index) => (
    <Grid container spacing={2} p={2} px={4} alignItems="center" key={index}>
      <Grid item xs={12} sm={4} md={4}>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6} md={6}>
            <TextField
              label="From (s)"
              value={interval.from}
              onChange={(e) => handleTimeIntervalChange(index, 'from', e.target.value)}
              onBlur={() => validateTimeInterval(index)} // Validate on blur
              InputProps={{ inputProps: { min: 0 }, readOnly: true }}
              // disabled={!isEditable}
              InputLabelProps={{
                shrink: true,
                sx: {
                   color:'#0069bd',
                  fontFamily: 'Poppins',
                  fontWeight:'500'
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor:'#9e9e9e',
                  },
                  '&:hover fieldset': {
                    borderColor: '#0069BD',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#0069BD',
                  },
                },
                '& .MuiInputBase-input': {
                  color: '#222222'
                },
              }}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={6}>
          <TextField
  style={{ marginLeft: '5px' }}
  label={ 'To (s)'} // Short error message in label
  value={interval.to}
  onChange={(e) => handleTimeIntervalChange(index, 'to', e.target.value)}
  onBlur={() => validateTimeInterval(index)} // Validate on blur
  InputProps={{ inputProps: { min: 0 } }}
  // disabled={!isEditable}
  InputLabelProps={{
    sx: {
      color: interval.toError ? 'red' : '#0069BD',
      fontFamily: 'Poppins',
      fontWeight:'500'
    },
  }}
  helperText={interval.toError ? interval.toErrorMessage : ""}
  FormHelperTextProps={{
    sx: {
      color: 'red',
      fontSize: '0.6rem',
      fontFamily: 'Poppins',
    },
  }}
  sx={{
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: interval.toError ? 'red' : '#9e9e9e'
      },
      '&:hover fieldset': {
        borderColor: interval.toError ? 'red' :'#0069BD' ,
      },
      '&.Mui-focused fieldset': {
        borderColor: interval.toError ? 'red' : '#0069BD',
      },
    },
    '& .MuiInputBase-input': {
      color:'#22222',
    },
  }}
/>

          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={4} md={4}>
        <TextField
          style={{ marginLeft: '25px' }}
          label="Speed (RPM)"
          value={String(interval.speed)}
          onChange={(e) => handleTimeIntervalChange(index, 'speed', e.target.value)}
          InputProps={{ inputProps: { min: 0 } }}
          // disabled={!isEditable}
          InputLabelProps={{
            sx: {
              color: '#0069bd',
              fontFamily: 'Poppins',
              fontWeight:'500'
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#9e9e9e',
              },
              '&:hover fieldset': {
                borderColor: '#0069BD',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#0069BD',
              },
            },
            '& .MuiInputBase-input': {
              color:'#222222',
            },
          }}
        />
      </Grid>
      <Grid item xs={12} sm={4} md={4} display="flex" alignItems="center">
        <TextField
          label="Torque (Nm)"
          value={interval.torque}
          onChange={(e) => handleTimeIntervalChange(index, 'torque', e.target.value)}
          InputProps={{ inputProps: { min: 0 } }} // Prevent negative numbers
          // disabled={!isEditable}
          InputLabelProps={{
            sx: {
            color:'#0069BD',
              fontFamily: 'Poppins',
              fontSize: '15px',
              fontWeight:'500'
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#9e9e9e',
              },
              '&:hover fieldset': {
                borderColor: '#0069BD',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#0069BD',
              },
            },
            '& .MuiInputBase-input': {
              color: '#222222',
            },
          }}
        />
       
  <>
    {/* Add Button - always displayed */}
    <IconButton
      onClick={addTimeInterval}
      color="primary"
      aria-label="add interval"
      sx={{
        ml: {lg: 3 }, 
        width: { xs: 24, sm: 28, md: 40, lg: 50 }, // Adjust button size based on screen size
        height: { xs: 24, sm: 28, md: 40, lg: 50 }, // Adjust button size based on screen size
     
      }}
      disabled={timeIntervals.length >= 5} // Disable if max intervals reached
    >
      <img
        src={Add}
        alt="Add"
        style={{
          width: '100%', // Make image fill the button
          height: '100%', // Make image fill the button
        }}
      />
    </IconButton>

    {/* Delete Button - always displayed but disabled for first row */}
    <IconButton
      onClick={() => deleteTimeInterval(index)}
      disabled={index === 0}
      aria-label="delete interval"
      sx={{
      
        width: { xs: 24, sm: 28, md: 40, lg: 50 }, // Adjust button size based on screen size
        height: { md: 40, lg: 50 }, // Adjust button size based on screen size
        opacity: index === 0 ? 0.5 : 1, // Disable opacity for the first row
      }}
    >
      <img
        src={delIcon}
        alt="Delete"
        style={{
          width: '100%', // Make image fill the button
          height: '100%', // Make image fill the button
        }}
      />
    </IconButton>
  </>


      </Grid>
    </Grid>
  ))}
</Box>


      <Box
  sx={{
    mt: 6,
    py: 1.5,
    px: 2,
    width: 'clamp(675px, 67.5vw, 1186.8px)',
    borderRadius: '6px', 
    border: '1px solid #b4b4b4', 
    position: 'relative',
  }}
>
  <Typography
    variant='subtitle2'
    sx={{
      position: 'absolute',
      top: '-11px',
      left: '10px',
      backgroundColor: 'white', 
      padding: '0 2px',
      color: '#0069BD',
      fontFamily: 'Poppins',
      fontWeight:'600'
    }}
   
  >
    Cooling System
  </Typography>
  <RadioGroup
    row
    sx={{
      
      fontFamily: 'Poppins',
      fontWeight:'400'
    }}
    value={coolingSystem}
    onChange={(e) => setCoolingSystem(e.target.value)}
  >
    <FormControlLabel 
      value="Finned Body" 
      control={<Radio />} 
      label="Finned Body" 
    />
    <FormControlLabel 
      value="Tail-fan & cowl" 
      control={<Radio />} 
      label="Tail-fan & cowl" 
    />
  </RadioGroup>
</Box>


      <Box sx={{ mt: 5, display: 'flex', justifyContent: 'end' }}>
      {/* <Button
      onClick={handleEditClick}
      style={{
        borderRadius: '32px',
        width: '12vh',
        height: '5vh',
        backgroundColor: '#0069BD',
        textTransform: 'none',
        fontFamily: 'Poppins',
        fontWeight: '400',
        color:'white',
        opacity: isEditable ? 0.5 : 1, 
      }}
      disabled={isEditingComplete} // Disable the button after the first edit action
    >
      {isEditable ? (
        <>
          Edit
          <img
            src={editIcon}
            alt="Save"
            style={{
              width: 18,
              height: 15,
              marginLeft: 8,
             
            }}
          />
        </>
      ) : (
        <>
          Edit
          <img
            src={editIcon}
            alt="Edit"
            style={{
              width: 18,
              height: 15,
              marginLeft: 10,
              opacity: isEditable ? 0.3 : 1, // Apply opacity for edit icon when editable
            }}
          />
        </>
      )}
    </Button> */}
        <Button onClick={handleNextClick}
        style={{
          backgroundColor: '#0069BD',
          borderRadius: '32px',
          color: '#fff',
          width:'12vh' ,
          height:'5vh',
                   textTransform: 'none',
          fontFamily: 'Poppins',
          fontWeight: '400',
        }}
        endIcon={<ArrowForwardIcon />}
        >Next</Button>
      </Box>
    </Box>
    
  );

};
export default MotorWizComponent;
