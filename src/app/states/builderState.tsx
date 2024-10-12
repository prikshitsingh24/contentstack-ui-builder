import { atom } from "recoil";


const previewState = atom({
    key: 'previewState',
    default: false,  // Set an empty array as the default state
  });

const newPageState=atom({
  key:'newPageState',
  default:true
})

export default {previewState,newPageState}