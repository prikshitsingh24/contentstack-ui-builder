import { atom } from "recoil";

const colorPickerState = atom({
    key: 'colorPickerState',
    default: false
  });

  const backgroundColorPickerState = atom({
    key: 'backgroundColorPickerState',
    default: false
  });

  const borderColorPickerState = atom({
    key: 'borderColorPickerState',
    default: false
  });
  
  const headerBackgroundColorPickerState = atom({
    key: 'headerBackgroundColorPickerState',
    default: false
  });

  const contentBackgroundColorPickerState = atom({
    key: 'contentBackgroundColorPickerState',
    default: false
  });

  const footerBackgroundColorPickerState = atom({
    key: 'footerBackgroundColorPickerState',
    default: false
  });

  const gridColorPickerState = atom({
    key: 'gridColorPickerState',
    default: false
  });
  
  export default {colorPickerState,backgroundColorPickerState,headerBackgroundColorPickerState,contentBackgroundColorPickerState,footerBackgroundColorPickerState,borderColorPickerState,gridColorPickerState}