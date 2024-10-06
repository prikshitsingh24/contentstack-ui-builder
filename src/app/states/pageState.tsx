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

interface Page{
    id?:string;
    children?:Section[]
}


const pageState = atom<Page[]>({
    key: 'pageState',
    default: [],  // Set an empty array as the default state
  });


export default {pageState}