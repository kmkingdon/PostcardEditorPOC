import { Grid } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { selectBackgroundColor, selectMargin, selectSize } from '../config/configSlice';
import GridContainer from './GridLayout';

type sizeValues = {
    height: string;
    width: string;
}

const postcardPageSizes: { [key: string]: sizeValues} =  {
    "4.2'' X 5.5''": {height:'403px', width: '528px'},
    "5.5'' X 8.5''": {height:'528px', width: '816px'},
    "4'' X 6''": {height:'384px', width: '576px'},
    "5'' X 7''": {height:'480px', width: '672px'},
    "6'' X 9''": {height:'576px', width: '864px'}
}

const postcardMarginSizes: { [key: string]: string} =  {
    "0''": '0px',
    "0.25''": '24px',
    "0.5''": '48px',
    "1.0''": '96px',
}

const calculateHeightWidth = (pageSizes: sizeValues, margins: string):{height:number, width: number} => {
    const {height, width } = pageSizes;
    const numericHeight = parseInt(height.split('px')[0]);
    const numericWidth = parseInt(width.split('px')[0]);
    const numericMargin = parseInt(margins.split('px')[0])*2;

    return {height: numericHeight - numericMargin, width: numericWidth - numericMargin};
}


function Layout() {
// size is null set to default size
const size = useAppSelector(selectSize);
const pageSize = size ? postcardPageSizes[size] : {height:'403px', width: '528px'};

// margin is null set to default size
const margin = useAppSelector(selectMargin);
const marginSize = margin ? postcardMarginSizes[margin] : '0px';

// background color is null set to default color
const backgroundColor = useAppSelector(selectBackgroundColor);
const background = backgroundColor || '#ffffff';

//calculate grid canvas height/width with margins
const {height, width} = calculateHeightWidth(pageSize, marginSize)

  return (
    <Grid container  display='flex'>
        <Grid item id="pageBackground" sx={{width:'100%', height:'calc(100vh - 48px)', backgroundColor: 'rgb(189,199,203)', overflow:'scroll'}} display="flex" justifyContent="center" alignItems="center">
            <Grid item id="page" sx={{width:pageSize.width, height:pageSize.height, backgroundColor: background}}>
                <Grid item id="outsidemMargin" sx={{ height: '100%', padding: marginSize}}>
                   <GridContainer height={height} width={width}/>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
  );
}

export default Layout;