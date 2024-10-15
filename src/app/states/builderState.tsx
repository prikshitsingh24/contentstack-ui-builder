import { atom } from "recoil";


const previewState = atom({
    key: 'previewState',
    default: false,  // Set an empty array as the default state
  });

const newPageState=atom({
  key:'newPageState',
  default:true
})

const newSectionState=atom({
  key:'newSectionState',
  default:false
})

const zoomState=atom({
  key:'zoomState',
  default:false
})

const leftSidebarCollapsedState=atom({
  key:'leftSidebarCollapsedState',
  default:false
})

const rightSidebarCollapsedState=atom({
  key:'rightSidebarCollapsedState',
  default:false
})

export default {previewState,newPageState,newSectionState,zoomState,leftSidebarCollapsedState,rightSidebarCollapsedState}