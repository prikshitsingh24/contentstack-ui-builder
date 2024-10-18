import { getContentTypes, getEntry, getTemplate } from "../contentstack";



export const getAllEntries = async (contentType:string): Promise<any> => {
    const response:any = (await getEntry({
      contentTypeUid: contentType,
      referenceFieldPath: undefined,
      jsonRtePath: undefined,
    }));
    return response[0];
  };

  export const getAllContentTypes = async () => {
    const response=await getContentTypes();
    return response;
  };


  export const getReferenceTemplate =async (templateUid:string[]): Promise <any>=>{
    const response:any = (await getTemplate({
      templateUid: templateUid,
      referenceFieldPath: undefined,
      jsonRtePath: undefined,
    }));
    return response[0];
  }


  export const idGen=()=>{
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    return randomNumber;
  }