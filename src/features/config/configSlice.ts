import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { RootState, AppThunk } from '../../app/store';
import { LayoutItem } from '../../common/types';
import { ELEMENT_TYPES } from '../../common/constants'


export interface ConfigState {
  size: string | null;
  margin: string | null;
  backgroundColor: string | null;
  layout: any[];
}

const initialState: ConfigState = {
  size: null,
  margin: null,
  backgroundColor: null,
  layout: []
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
// export const incrementAsync = createAsyncThunk(
//   'counter/fetchCount',
//   async (amount: number) => {
//     const response = await fetchCount(amount);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );

export const configSlice = createSlice({
  name: 'config',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setSizeConfig: (state, action: PayloadAction<string>) => {
      state.size = action.payload;
    },
    setMarginConfig: (state, action: PayloadAction<string>) => {
        state.margin = action.payload;
    },
    setBackgroundColorConfig: (state, action: PayloadAction<string>) => {
        state.backgroundColor = action.payload;
    },
    addImageToLayoutConfig: (state, action: PayloadAction< {
        img: string;
        title: string;
        id: string;
    }>) => {
        const layoutItem = { i: action.payload.id, x: 0, y: 0, w: 2, h: 2, isBounded: true, isResizeable: true, type: ELEMENT_TYPES.IMAGE};
        state.layout = [...state.layout, layoutItem];
    },
    addTextToLayoutConfig: (state) => {
        const textItem = { i: `TEXT-${uuidv4()}`, x: 0, y: 0, w: 2, h: 2, isBounded: true, isResizeable: true, type: ELEMENT_TYPES.TEXT};
        state.layout = [...state.layout, textItem];
    },
    updateLayoutConfig: (state, action: PayloadAction<LayoutItem[]>) => {
        state.layout = [...action.payload];
    }
  },
});

export const { setSizeConfig, setMarginConfig, setBackgroundColorConfig, addImageToLayoutConfig, updateLayoutConfig, addTextToLayoutConfig} = configSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectSize = (state: RootState) => state.config.size;
export const selectMargin = (state: RootState) => state.config.margin;
export const selectBackgroundColor = (state: RootState) => state.config.backgroundColor;
export const selectLayout = (state: RootState) => state.config.layout;


export default configSlice.reducer;
