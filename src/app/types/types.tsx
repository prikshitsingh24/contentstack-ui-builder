
export interface Style {
    value?:string;
    placeholder?:string;
    backgroundColor?:string;
    fontSize?: string;
    fontStyle?: string;
    fontWeight?:string;
    color?: string;
    textAlign?: string;
  }
  
export  interface Content {
    id?: string;
    type?: string;
    content?: string;
    over?:string;
    style?: Style;
    width?:number;
    height?:number;
  }
  
  export  interface DroppedContent {
    id?: string;
    type?: string;
    content?: string;
    over?:string;
    style?: Style;
    position?:{x:number,y:number}
    width?:number;
    height?:number;
  }
  
  export  interface Section {
    id?:string;
    headerBackgroundColor?:string;
    contentBackgroundColor?:string;
    footerBackgroundColor?:string;
    children?:DroppedContent[]
  }
  
  
  export  interface Page{
    id?:string;
    children?:Section[]
  }