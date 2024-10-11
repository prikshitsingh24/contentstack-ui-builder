
export interface Style {
    value?:string;
    placeholder?:string;
    backgroundColor?:string;
    fontSize?: string;
    fontStyle?: string;
    fontWeight?:string;
    color?: string;
    textAlign?: string;
    borderRadius?:string;
    borderColor?:string;
    width?:string;
    height?:string;
  }
  
export  interface Content {
    id?: string;
    type?: string;
    content?: string;
    over?:string;
    style?: Style;
    src?:string;
    
  }
  
  export  interface DroppedContent {
    id?: string;
    type?: string;
    content?: string;
    over?:string;
    style?: Style;
    position?:{x:number,y:number}
  }
  
  export  interface Section {
    id?:string;
    children?:DroppedContent[]
    contentBackgroundColor?:string;
  }

  
  
  export  interface Page{
    id?:string;
    children?:Section[];
    header?:DroppedContent[];
    footer?:DroppedContent[];
    headerBackgroundColor?:string;
    footerBackgroundColor?:string;
  }