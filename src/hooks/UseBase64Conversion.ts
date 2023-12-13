import { useCallback } from "react";

function useBase64Conversion(): (file: File) => Promise<string | null> {
  const convertToBase64 = useCallback((file: File) => {
    return new Promise<string | null>((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const result = reader.result as string;
        resolve(result);
      };
    });
  }, []);

  return convertToBase64;
}

export default useBase64Conversion;
