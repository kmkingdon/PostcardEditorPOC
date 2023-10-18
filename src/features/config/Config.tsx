import { useCallback, useState } from 'react';
import { Autocomplete, Divider, Grid, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectBackgroundColor, selectMargin, selectSize, setBackgroundColorConfig, setMarginConfig, setSizeConfig } from './configSlice';
import ColorPicker from './ColorPicker';
import PhotoGallery from './PhotoGallery';


const postcardSizes = {
    "4.2'' X 5.5''": "4.2'' X 5.5''",
    "5.5'' X 8.5''": "5.5'' X 8.5''",
    "4'' X 6''": "4'' X 6''",
    "5'' X 7''": "5'' X 7''",
    "6'' X 9''": "6'' X 9''"
}
const marginSizes = {
    "0''": "0''",
    "0.25''":"0.25''",
    "0.5''": "0.5''",
    "1.0''": "1.0''"
}

function  Config() {
  const dispatch = useAppDispatch();


  //size
  const postcardSize = useAppSelector(selectSize);
  const [ size, setSize ] = useState<string|null>(postcardSize || null);
  const setPostcardSize = (value:string | null) => {
    setSize(value)
    if(value){
      dispatch(setSizeConfig(value))
    }
  }

  //margin
  const marginSize = useAppSelector(selectMargin);
  const [ margin, setMargin ] = useState<string|null>(marginSize || null);
  const setMarginSize = (value:string | null) => {
    setMargin(value)
    if(value){
      dispatch(setMarginConfig(value))
    }
  }

  //background color
  const backgroundColor = useAppSelector(selectBackgroundColor);
  const setBackgroundColor = useCallback((value:string | null) => {
    if(value){
      dispatch(setBackgroundColorConfig(value))
    }
  }, [])

  return (
    <Grid container  display="flex" flexDirection="column" flexWrap="nowrap" sx={{width:'100%', height:'100vh', borderLeft: '1px solid grey', overflowY: 'scroll', overflowX: 'hidden'}}>
        <Grid item display="flex" justifyContent="center" alignItems="center" sx={{mt:2}}>        
            <Typography color='grey' variant="h6">Postcard Editor POC</Typography>
        </Grid>
        <Divider sx={{m:1}}/>
        <Grid item display="flex" justifyContent="flex-start" alignItems="center" sx={{mt:1, ml: 3}}>        
            <Typography color='grey' variant="body1">Layout</Typography>
        </Grid>
        <Grid item display="flex" justifyContent="center" alignItems="center" sx={{mt:2}}>
            <Autocomplete
                disablePortal
                id="size"
                options={Object.keys(postcardSizes)}
                sx={{width: '80%'}}
                renderInput={(params) => <TextField {...params} label="Size" />}
                onChange={(e,value) => setPostcardSize(value)}
                value={size}
            />
        </Grid>
        <Grid item display="flex" justifyContent="center" alignItems="center" sx={{mt:2}}>
            <Autocomplete
                disablePortal
                id="marginS"
                options={Object.keys(marginSizes)}
                sx={{width: '80%'}}
                renderInput={(params) => <TextField {...params} label="Outside Margin" />}
                onChange={(e,value) => setMarginSize(value)}
                value={margin}
            />
        </Grid>
        <Divider sx={{m:1}}/>
        <Grid item display="flex" justifyContent="flex-start" alignItems="center" sx={{mt:1, ml: 3}}>        
            <Typography color='grey' variant="body1">Background Color</Typography>
        </Grid>
        <ColorPicker backgroundColor={backgroundColor} setBackgroundColor={setBackgroundColor}/>
        <Divider sx={{m:1}}/>
        <Grid item display="flex" justifyContent="flex-start" alignItems="center" sx={{mt:1, ml: 3}}>        
            <Typography color='grey' variant="body1">Images</Typography>
        </Grid>
        <PhotoGallery />
    </Grid>
  );
}

export default  Config;