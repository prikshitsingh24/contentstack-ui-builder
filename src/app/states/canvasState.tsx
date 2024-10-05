import { atom } from "recoil";

interface Style {
  value?:string;
  placeholder?:string;
  backgroundColor?:string;
  fontSize?: string;
  fontStyle?: string;
  fontWeight?:string;
  color?: string;
  textAlign?: string;
}

interface Content {
  id?: string;
  type?: string;
  content?: string;
  over?:string;
  style?: Style;
}

interface DroppedContent {
  id?: string;
  type?: string;
  content?: string;
  over?:string;
  style?: Style;
  position?:{x:number,y:number}
}

interface Section {
  id?:string;
  headerBackgroundColor?:string;
  contentBackgroundColor?:string;
  footerBackgroundColor?:string;
  children?:DroppedContent[]
}

const selectedItemState = atom<Content>({
  key: 'selectedItemState',
  default:{}
});

const droppedItemState = atom<DroppedContent[]>({
  key: 'droppedItemState',
  default: []
});

const selectedSectionState=atom<Section>({
  key: 'selectedSectionState',
  default:{}
});

const gridVisibilityStatus=atom({
  key: 'gridVisibilityStatus',
  default: true
})


export default {selectedItemState,droppedItemState,gridVisibilityStatus,selectedSectionState}