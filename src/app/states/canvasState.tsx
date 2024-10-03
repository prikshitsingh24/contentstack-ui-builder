import { atom } from "recoil";


const selectedItemState = atom({
    key: 'selectedItemState', 
    default: 
      {
        id:"",
        content:"",

      }
    , 
  });

export default {selectedItemState}