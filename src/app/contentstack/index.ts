import { Utils } from "contentstack";
import initializeContentStackSdk from "./connect";

type GetEntry = {
    contentTypeUid: string;
    referenceFieldPath: string[] | undefined;
    jsonRtePath: string[] | undefined;
  };

 const Stack = initializeContentStackSdk();

export const getEntry = ({
    contentTypeUid,
    referenceFieldPath,
    jsonRtePath,
  }: GetEntry) => {
    return new Promise((resolve, reject) => {
      const query = Stack.ContentType(contentTypeUid).Query();
      if (referenceFieldPath) query.includeReference(referenceFieldPath);
      query
      .except(["ACL","created_at","created_by","locale","locale","publish_details","tags","updated_at","updated_by","_in_progress","_version"])
        .toJSON()
        .find()
        .then(
          (result) => {
            jsonRtePath &&
              Utils.jsonToHTML({
                entry: result,
                paths: jsonRtePath,
              });
            resolve(result);
          },
          (error) => {
            reject(error);
          }
        );
    });
  };

export const getContentTypes=async ()=>{
  const result = await Stack.getContentTypes({"include_global_field_schema": true});
  return result;
}