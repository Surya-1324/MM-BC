import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ColorToggleButton({ TwoDComponent, ThreeDComponent }) {
  const [alignment, setAlignment] = React.useState('2D');

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <div>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value="2D">2D</ToggleButton>
        <ToggleButton value="3D">3D</ToggleButton>
      </ToggleButtonGroup>

      {alignment === '2D' && <TwoDComponent />}
      {alignment === '3D' && <ThreeDComponent />}
    </div>
  );
}
