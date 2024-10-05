import { atom } from "recoil";

const colorPickerState = atom({
    key: 'colorPickerState',
    default: false
  });

  const backgroundColorPickerState = atom({
    key: 'backgroundColorPickerState',
    default: false
  });
  
  export default {colorPickerState,backgroundColorPickerState}