# Postcard Editor POC

POC quick build focusing on a Postcard Editor experience. 

## DEMO


## POC Functionality

**WYSIWYG Page Layout**: Responsive layout page allowing users to see difference between different size postcards, outside margins, and overall background color.

**Add Images**: Add image elements to postcard. In a Production application, this would tie to the user's image API. Once an image is added, the user can not add the same image again. 

**Add Text**: Add text elements to postcard. In a Production application, this would tie to the user's image API.

**Move, Resize, and Rearrange Elements**: Users can move images and text around the postcard, resize elements, and rearrange element layers. 

**Remove Elements**: Users can remove image and text elements from the postcard. 


## Next Steps

1. User Journey Experience Improvements and Additional Functionality 
- **Images**- Continue to add functionality like locking Aspect ratios. 
- **Text**- Add style functionality to adjust text size, font style, font type, etc. Connect text style and value to redux config state. 
- **Resize and Elemement Buttons**- Show resize and Delete/Rearrange buttons on hover or selection. 
- **Address Defects**- Address defects like the 'readOnly' Typeerror caused by rage clicking on an element. Test for and address additional defects. 

2. Performance: Improve overall App and GridLayout performance. In particular, the Grid Layout is re-rendering whenever the layout changes. Optimizations could improve the number of re-renders and help support larger scale projects like multi-page books. 

3. Project Config: Project configs could be saved to enable opening projects later. The config will also need to work for printing. The final "postcard" or project will need to be in a format that is accepted by the printers (ie. PDF, JPEG, etc). The configuration should be shared between the FE editor and the service that creates the print version. 

4. Quality: Add unit and component jests tests.



## Running Locally

Clone project, enter project directory, and install node_modules.

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


## Library Integrations

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) TS template.

- Component Library: [MaterialUI](https://mui.com/)
- React Grid/Canvas: [React Grid Layout](https://github.com/react-grid-layout/react-grid-layout)
