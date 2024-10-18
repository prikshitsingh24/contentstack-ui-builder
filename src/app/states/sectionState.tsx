import { atom } from "recoil";
import { Section } from "../types/types";




const sectionState = atom<Section[]>({
    key: 'sectionState',
    default: [],  // Set an empty array as the default state
  });

const headerBackgroundColorState=atom({
key: 'headerBackgroundColorState',
default: "#ffffff"
})

const contentBackgroundColorState=atom({
key: 'contentBackgroundColorState',
default: "#ffffff"
})

const footerBackgroundColorState=atom({
key: 'footerBackgroundColorState',
default: "#ffffff"
})

  export default {sectionState,headerBackgroundColorState,contentBackgroundColorState,footerBackgroundColorState}