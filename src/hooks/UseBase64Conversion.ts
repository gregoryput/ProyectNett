import {useCallback } from "react";

function useBase64Conversion(): (file: File) => Promise<Uint8Array | null> {
  const convertToBase64 = useCallback((file: File) => {
    return new Promise<Uint8Array | null>((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const result = reader.result as Uint8Array;
        resolve(result);
      };
    });
  }, []);

  return convertToBase64;
}

export default useBase64Conversion;
