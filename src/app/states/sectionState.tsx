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


const sectionState = atom<Section[]>({
    key: 'sectionState',
    default: [],  // Set an empty array as the default state
  });

const headerBackgroundColorState=atom({
key: 'headerBackgroundColorState',
default: "#FFFFFF"
})

const contentBackgroundColorState=atom({
key: 'contentBackgroundColorState',
default: "#FFFFFF"
})

const footerBackgroundColorState=atom({
key: 'footerBackgroundColorState',
default: "#FFFFFF"
})

  export default {sectionState,headerBackgroundColorState,contentBackgroundColorState,footerBackgroundColorState}