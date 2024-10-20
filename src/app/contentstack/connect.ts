import { Config, Region, Stack } from "contentstack";

// Initialize the Contentstack Stack
// const Stack = Contentstack.Stack(`${process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY}`, `${process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN}`,`${process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT}`);
export const isBasicConfigValid = () => {
    return (
      !!process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY &&
      !!process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN &&
      !!process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT
    );
  };

  const setRegion = (): Region => {
    let region = "EU" as keyof typeof Region;
    return Region[region];
  };


  export default function initializeContentStackSdk() {
    const isValid = isBasicConfigValid(); // Store the result
    if (!isValid) {
        throw new Error("Please set your .env file before running starter app");
    }
    const stackConfig: Config = {
        api_key: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY as string,
        delivery_token: process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN as string,
        environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT as string,
        region: setRegion(),
        branch: "main",
    };
    return Stack(stackConfig);
}
