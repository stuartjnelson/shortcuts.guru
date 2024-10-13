import { useMemo } from "react";
import { escapeHtml } from "../utils/escapeHtml";

const useCreateInlineCodeFromStr = (legendStr: string): string => {
  const formattedLegend = useMemo(() => {
    const escapedStr = escapeHtml(legendStr);

    // Replace backticks with a styled <code> element for keyboard key appearance
    return escapedStr.replace(
      /`([^`]+)`/g,
      "<code class='inline-block bg-gray-300 border border-gray-300 text-gray-900 font-mono text-sm px-2 py-1 rounded-md shadow-sm mx-1'>$1</code>"
    );
  }, [legendStr]);

  console.log("useCreateInlineCodeFromStr");

  return formattedLegend;
};

export default useCreateInlineCodeFromStr;
