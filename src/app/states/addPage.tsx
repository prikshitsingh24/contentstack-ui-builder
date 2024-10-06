import { atom } from "recoil";


const addPagePanelState = atom({
    key: 'addPagePanelState',
    default: false,  // Set an empty array as the default state
  });


export default {addPagePanelState}