import { Grid } from "@mui/material";
import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

function GridContainer() {
  
   const layouts = {lg:[
        { i: "a", x: 0, y: 0, w: 1, h: 2, isBounded: true, isResizeable: true},
        { i: "b", x: 1, y: 0, w: 3, h: 2, isBounded: true, isResizeable: true},
        { i: "c", x: 4, y: 0, w: 1, h: 2, isBounded: true, isResizeable: true}
    ]};

  return (
    <Grid sx={{width: '100%', height: '100%'}}>
        <ResponsiveGridLayout
            allowOverlap={true}
            className="layout"
            compactType="horizontal"
            layouts={layouts}
            breakpoints={{ lg: 250 }}
            cols={{ lg: 25}}
        >
            <Grid key="a" sx={{width:'100px', backgroundColor: 'black'}}>a</Grid>
            <Grid key="b" sx={{width:'200px', backgroundColor: 'green'}}>b</Grid>
            <Grid key="c" sx={{width:'200px', backgroundColor: 'blue'}}>c</Grid>
        </ResponsiveGridLayout>
    </Grid>

  );
}

export default GridContainer;