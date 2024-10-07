import { atom } from "recoil";
import { Page } from "../types/types";



const pageState = atom<Page[]>({
    key: 'pageState',
    default: [],  // Set an empty array as the default state
  });


export default {pageState}