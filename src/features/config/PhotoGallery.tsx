import { Grid, IconButton, ImageList, ImageListItem, Popover } from '@mui/material';
import { Add } from '@mui/icons-material';


import photos from '../../common/photos.json';
import { useAppDispatch } from '../../app/hooks';
import { addImageToLayoutConfig } from './configSlice';


function  PhotoGallery() {
  const imageList = photos.images;
  const dispatch = useAppDispatch();

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
                    <IconButton onClick={()=>{dispatch(addImageToLayoutConfig(item))}}sx={{position:'absolute', top: '0', left: '0', backgroundColor:'#ffffff'}}>
                        <Add sx={{ fontSize: 10 }}/>
                    </IconButton>
                </ImageListItem>
            ))}
        </ImageList>
    </Grid>
  );
}

export default  PhotoGallery;