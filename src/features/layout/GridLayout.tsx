import { Grid } from "@mui/material";
import GridLayout from "react-grid-layout";
import Textarea from '@mui/joy/Textarea';
import { useState } from "react";
import isEqaul from "lodash/isEqual"

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectLayout, updateLayoutConfig } from "../config/configSlice";
import photos from '../../common/photos.json';
import { LayoutItem } from "../../common/types";
import GridItemMenu from "./GridItemMenu";
import { ELEMENT_TYPES } from "../../common/constants";


type GridContainerParams = {
    height: number;
    width: number;
}

//export for unit testing
export const findIndex = (layout: LayoutItem[], elementId: string) => {
    return layout.findIndex((i) => i.i === elementId);
}


export const createUpdatedLayout = (layout: LayoutItem[], elementId: string, newElement: null | LayoutItem) => {
    const index = findIndex(layout, elementId)
    const updatedLayout = [...layout]
    if(newElement){
      // newElement defined, update layoutItem
      updatedLayout.splice(index, 1, newElement);
    } else {
      // newElement not defined, remove layoutItem 
      updatedLayout.splice(index, 1);
    }
    return updatedLayout;
}

function GridContainer(params: GridContainerParams) {
   const dispatch = useAppDispatch();

   const layout= useAppSelector(selectLayout);
   const [ localLayout, setLocalLayout ] = useState(layout)
   
   // set width and height of grid canvas, update on size/margin changes
   const {height, width} = params;
   const imageList = photos.images;


   const updateLayout = (layout:LayoutItem[]) => {
        // prevent double call of updateLayout after deletion
        if(!isEqaul(layout, localLayout)){
            dispatch(updateLayoutConfig(layout))
        }

   }

   const handleDelete = (elementId:string) => {
        const updatedLayout = createUpdatedLayout(layout, elementId, null)
        setLocalLayout(updatedLayout)
        dispatch(updateLayoutConfig(updatedLayout))
   }

   const handleMove = (item:LayoutItem[]) => {
        const elementId = item[0].i;
        const updatedLayout = createUpdatedLayout(layout, elementId, item[0])
        setLocalLayout(updatedLayout)
        dispatch(updateLayoutConfig(updatedLayout))
   }

   const handleRearrange = (elementId:string, forward:boolean) => {
        const index = findIndex(layout, elementId);
        const updatedLayout = [...layout];

        //remove old element and add at new index
        const elem = updatedLayout.splice(index, 1)[0];
        const newIndex = forward ? index + 1 : index - 1;
        updatedLayout.splice(newIndex, 0, elem );

        setLocalLayout(updatedLayout)
        dispatch(updateLayoutConfig(updatedLayout))
   }

  return (
    <Grid sx={{width: '100%', height: '100%'}}>
      <GridLayout
        allowOverlap={true}
        maxRows={height}
        compactType={null}
        layout={layout}
        cols={10}
        rowHeight={1}
        width={width}
        margin={[0,0]}
        onLayoutChange={(layout) => updateLayout(layout)}
        onDragStop={(i) => handleMove(i)}
      >
         { layout.map(item => {
            // TODO- find another solution for determining type of element in config
            if(item.i.split('-')[0] !== ELEMENT_TYPES.TEXT) {
                const source = imageList.find((i) => i.id === item.i );
                return (
                <Grid key={item.i} sx={{minWidth: 100, minHeight: 100}}>
                    <GridItemMenu handleDelete={handleDelete} handleRearrange={handleRearrange} elementId={item.i}>
                       <img width="100%" src={source?.img} alt={source?.title}/>
                    </GridItemMenu>
                </Grid>
                )
            } else {
                /// Text Element
                //TO DO: move to factory function when need to support more element types
                return (
                <Grid key={item.i} sx={{minWidth: 200, minHeight: 100}}>
                    <GridItemMenu handleDelete={handleDelete} handleRearrange={handleRearrange} elementId={item.i}>
                        <Textarea minRows={2} variant="plain" placeholder="Add Text Here" sx={{width:'100%', height: '100%', fontSize:40, backgroundColor:'transparent', '.MuiTextarea-textarea': {textAlign: 'center'}}} />
                    </GridItemMenu>
                </Grid>
                )
            }

          })}
        </GridLayout>
    </Grid>

  );
}

export default GridContainer;