import { Grid } from "@mui/material";
import GridLayout from "react-grid-layout";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectLayout, updateLayoutConfig } from "../config/configSlice";
import photos from '../../common/photos.json';
import { LayoutItem } from "../../common/types";

type GridContainerParams = {
    height: number;
    width: number;
}

function GridContainer(params: GridContainerParams) {
   const dispatch = useAppDispatch();
   
   // set width and height of grid canvas, update on size/margin changes
   const {height, width} = params;
   const imageList = photos.images;

   const layout= useAppSelector(selectLayout);
   
   const updateLayout = (layout:LayoutItem[]) => {
    dispatch(updateLayoutConfig(layout))
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
      >
         { layout.map(item => {
            const source = imageList.find((i) => i.id === item.i );
            return (
            <Grid key={item.i}>
                <img width="100%" src={source?.img} alt={source?.title}/>
            </Grid>
          )})}
        </GridLayout>
    </Grid>

  );
}

export default GridContainer;