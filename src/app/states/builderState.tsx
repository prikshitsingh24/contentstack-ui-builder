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

const horizontalSnapLineState = atom<number[]>({
  key: 'horizontalSnapLineState',
  default: [],
});

const verticalSnapLineState = atom({
  key: 'verticalSnapLineState',
  default: [],
});

const mousePositionState=atom({
  key:'mousePositionState',
  default:{ x: 0, y: 0 }
})

const snapPointsStatus=atom({
  key:'snapPointsState',
  default:{x:0,y:0}
})

export default {previewState,newPageState,newSectionState,zoomState,leftSidebarCollapsedState,rightSidebarCollapsedState,
  horizontalSnapLineState,
  verticalSnapLineState,
  mousePositionState,
  snapPointsStatus
}