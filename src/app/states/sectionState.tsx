import { atom } from "recoil";
import { Section } from "../types/types";




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