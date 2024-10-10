import { getContentTypes, getEntry } from "../contentstack";



export const getAllEntries = async (contentType:string): Promise<any> => {
    const response:any = (await getEntry({
      contentTypeUid: contentType,
      referenceFieldPath: undefined,
      jsonRtePath: undefined,
    }));
      console.log("asdfdaf",response)
    return response[0];
  };

  export const getAllContentTypes = async () => {
    const response=await getContentTypes();
    console.log(response)
    return response;
  };