import { getContentTypes, getEntry } from "../contentstack";



export const getAllEntries = async (contentType:string): Promise<any> => {
    const response:any = (await getEntry({
      contentTypeUid: contentType,
      referenceFieldPath: undefined,
      jsonRtePath: undefined,
    }));
    return response[0]['0'];
  };

  export const getAllContentTypes = async () => {
    const response=await getContentTypes();
    return response;
  };