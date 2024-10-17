import { getContentTypes, getEntry } from "../contentstack";



export const getAllEntries = async (contentType:string): Promise<any> => {
    const response:any = (await getEntry({
      contentTypeUid: contentType,
      referenceFieldPath: undefined,
      jsonRtePath: undefined,
    }));
    console.log(response[0])
    return response[0];
  };

  export const getAllContentTypes = async () => {
    const response=await getContentTypes();
    return response;
  };


  export const idGen=()=>{
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    return randomNumber;
  }