import React, { useState } from 'react';
import { Button, Grid, Popover } from '@mui/material';
import { Sketch } from '@uiw/react-color';


const hoverButtonSX = {
    "&:hover": {
        backgroundColor: '#ffffff'
    },
  };

type ColorPickerParams = {
    backgroundColor: string | null;
    setBackgroundColor: (hex: string) => void;
}

function  ColorPicker(params: ColorPickerParams) {
  const {backgroundColor, setBackgroundColor} = params;
  // popover menu
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'color-picker-modal' : undefined;


  //color selection
  const [hex, setHex] = useState(backgroundColor || "#ffffff");

  return (
    <Grid display="flex" justifyContent="center" alignItems="center">
        <Button aria-describedby={id} variant="contained" onClick={handleClick} sx={{ backgroundColor: hex, width: '50px', height: '30px', ...hoverButtonSX}} />
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            >
            <Sketch
              color={hex}
              onChange={(color) => {
                setHex(color.hex);
                setBackgroundColor(color.hex)
              }}
            />
        </Popover>
    </Grid>

  );
}

export default  ColorPicker;