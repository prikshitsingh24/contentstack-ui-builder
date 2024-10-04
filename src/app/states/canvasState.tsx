import { atom } from "recoil";

interface Style {
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
  style?: Style;
}

interface DroppedContent {
  id?: string;
  type?: string;
  content?: string;
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

export default {selectedItemState,droppedItemState}