import { atom } from "recoil";


const addPagePanelState = atom({
    key: 'addPagePanelState',
    default: false,  // Set an empty array as the default state
  });
const inputState=atom({
  key:"inputState",
  default:true
})

export default {addPagePanelState,inputState}