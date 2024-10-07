import { atom } from "recoil";
import { Content, DroppedContent, Page, Section } from "../types/types";



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

const selectedPageState=atom<Page>({
  key: 'selectedPageState',
  default:{}
});

const gridVisibilityStatus=atom({
  key: 'gridVisibilityStatus',
  default: true
})


export default {selectedItemState,droppedItemState,gridVisibilityStatus,selectedSectionState,selectedPageState}