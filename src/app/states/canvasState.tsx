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

const selectedItemState = atom<Content>({
  key: 'selectedItemState',
  default:{}
});

const droppedItemState = atom<DroppedContent[]>({
  key: 'droppedItemState',
  default: []
});

const sectionBackgroundColorState=atom({
  key: 'sectionBackgroundColorState',
  default: "#FFFFFF"
})

export default {selectedItemState,droppedItemState,sectionBackgroundColorState}