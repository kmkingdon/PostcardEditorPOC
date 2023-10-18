import { Delete, FlipToBack, FlipToFront } from '@mui/icons-material';
import { ButtonGroup, Grid, IconButton } from '@mui/material';
import { JSXElementConstructor, ReactElement } from 'react';


function GridItemMenu(props: { handleDelete:(elementId:string)=>void, handleRearrange:(elementId:string, forward:boolean)=>void, elementId:string, children: ReactElement<any, string | JSXElementConstructor<any>> | null  }) {

  return (
    <Grid display='flex' sx={{width: '100%', height: '100%'}}>
        <Grid sx={{position:'absolute', top:0, left:0}}>
            <ButtonGroup className=".showOnHover" orientation="vertical" sx={{p:1}}>
                <IconButton onClick={()=> props.handleDelete(props.elementId)}>
                    <Delete sx={{fontSize: 15, color:"#ffffff"}} />
                </IconButton>
                <IconButton onClick={()=> props.handleRearrange(props.elementId, true)}>
                    <FlipToFront sx={{fontSize: 15, color:"#ffffff"}} />
                </IconButton>
                <IconButton onClick={()=> props.handleRearrange(props.elementId, false)}>
                    <FlipToBack sx={{fontSize: 15, color:"#ffffff"}} />
                </IconButton>
            </ButtonGroup>
        </Grid>
        {props.children}
    </Grid>
  );
}

export default GridItemMenu;