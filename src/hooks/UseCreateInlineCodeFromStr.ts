import React, { useMemo } from "react";
import { escapeHtml } from "../utils/escapeHtml";

const useCreateInlineCodeFromStr = (
  prependText: string,
  appendText: string,
  inlineCodeArray: string[]
): { renderFormattedText: () => React.ReactNode } => {
  const formattedText = useMemo(() => {
    const inlineCodeArrayJoined = inlineCodeArray.length
      ? `\`${inlineCodeArray.join("` + `")}\``
      : "";
    const fomattedStr = `${prependText.trim()} ${inlineCodeArrayJoined} ${appendText.trim()}`;
    const escapedStr = escapeHtml(fomattedStr);

    // Replace backticks with a styled <code> element for keyboard key appearance
    return escapedStr.replace(
      /`([^`]+)`/g,
      "<code class='inline-block bg-gray-300 border border-gray-300 text-gray-900 font-mono text-sm px-2 py-1 rounded-md shadow-sm mx-1'>$1</code>"
    );
  }, [prependText, appendText, inlineCodeArray]);

  // Return a function that generates the element using React.createElement
  const renderFormattedText = (): React.ReactNode => {
    if (!formattedText) {
      return null; // Avoid rendering undefined HTML
    }

    // Use React.createElement to return the <p> element with dangerouslySetInnerHTML
    return React.createElement("p", {
      dangerouslySetInnerHTML: { __html: formattedText },
    });
  };

  return { renderFormattedText };
};

export default useCreateInlineCodeFromStr;
