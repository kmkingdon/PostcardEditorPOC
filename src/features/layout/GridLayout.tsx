import { Grid } from "@mui/material";
import GridLayout from "react-grid-layout";


type GridContainerParams = {
    height: number;
    width: number;
}

function GridContainer(params: GridContainerParams) {
   // set width and height of grid canvas, update on size/margin changes
   const {height, width} = params;

   const layout = [
        { i: "a", x: 0, y: 0, w: 1, h: 2, isBounded: true, isResizeable: true},
        { i: "b", x: 1, y: 0, w: 3, h: 2, isBounded: true, isResizeable: true},
        { i: "c", x: 4, y: 0, w: 1, h: 2, isBounded: true, isResizeable: true}
    ];

  return (
    <Grid sx={{width: '100%', height: '100%'}}>
      <GridLayout
        allowOverlap={true}
        maxRows={height}
        compactType="horizontal"
        layout={layout}
        cols={10}
        rowHeight={1}
        width={width}
        margin={[0,0]}
      >
            <Grid key="a" sx={{width:'100px', backgroundColor: 'black'}}>a</Grid>
            <Grid key="b" sx={{width:'200px', backgroundColor: 'green'}}>b</Grid>
            <Grid key="c" sx={{width:'200px', backgroundColor: 'blue'}}>c</Grid>
        </GridLayout>
    </Grid>

  );
}

export default GridContainer;