import { atom } from "recoil";


const contextMenuState = atom({
    key: 'contextMenuState',
    default: false,  // Set an empty array as the default state
  });

const resizingModeState=atom({
    key:'resizingModeState',
    default:false
})


export default {contextMenuState,resizingModeState}