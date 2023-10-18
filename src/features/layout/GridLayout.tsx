import { Grid } from "@mui/material";
import GridLayout from "react-grid-layout";
import { useState } from "react";
import isEqaul from "lodash/isEqual"

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectLayout, updateLayoutConfig } from "../config/configSlice";
import photos from '../../common/photos.json';
import { LayoutItem } from "../../common/types";
import GridItemMenu from "./GridItemMenu";


type GridContainerParams = {
    height: number;
    width: number;
}

//export for unit testing
export const createUpdatedLayout = (layout: LayoutItem[], elementId: string, newElement: null | LayoutItem) => {
    const index = layout.findIndex((i) => i.i === elementId);
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
            const source = imageList.find((i) => i.id === item.i );
            return (
            <Grid key={item.i} sx={{minWidth: 100, minHeight: 100}}>
                <GridItemMenu handleDelete={handleDelete} elementId={item.i}>
                   <img width="100%" src={source?.img} alt={source?.title}/>
                </GridItemMenu>
            </Grid>
          )})}
        </GridLayout>
    </Grid>

  );
}

export default GridContainer;