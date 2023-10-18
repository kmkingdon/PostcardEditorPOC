import { Grid, IconButton, ImageList, ImageListItem } from '@mui/material';
import { Add } from '@mui/icons-material';


import photos from '../../common/photos.json';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addImageToLayoutConfig, selectLayout } from './configSlice';


function  PhotoGallery() {
  const imageList = photos.images;
  const dispatch = useAppDispatch();

  const layout= useAppSelector(selectLayout);

  const determineIfDisabled = (elementId:string) => {
    const index = layout.findIndex(i => i.i === elementId);
    //return true if element exists in layout already
    return index >= 0
  }

  return (
    <Grid container display="flex" justifyContent="center" alignItems="center" sx={{ml:2, mr:2}}>
        <ImageList sx={{ width: '80%', height: 200 }} cols={2} rowHeight={20}>
            {imageList.map((item) => (
                <ImageListItem key={item.img} sx={{position:'relative'}}>
                    <img
                        srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                        alt={item.title}
                        loading="lazy"
                    />
                    <IconButton onClick={()=>{dispatch(addImageToLayoutConfig(item))}} disabled={determineIfDisabled(item.id)} sx={{position:'absolute', top: '0', left: '0', backgroundColor:'#ffffff'}}>
                        <Add sx={{ fontSize: 10 }}/>
                    </IconButton>
                </ImageListItem>
            ))}
        </ImageList>
    </Grid>
  );
}

export default  PhotoGallery;