import React, { useEffect } from "react";
import { Label, Radio, RadioGroup } from "react-aria-components";
import CheckCircleIcon from "@spectrum-icons/workflow/CheckmarkCircle";
import { escapeHtml } from "../utils/escapeHtml";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";

interface FormRadioGroupProps {
  className: string;
  legend: string;
  //   options: Pick<Shortcut, "multipleChoiseOptions">;
  options: string[];
  onChange: (value: string) => void;
}

export default function FromRadioGroup({
  className,
  legend,
  options,
  onChange,
}: FormRadioGroupProps) {
  const [selected, setSelected] = React.useState("");

  useEffect(() => {
    onChange(selected);
  });

  // @TODO: Make thi dryer using the hook `useCreateInlineCodeFromStr` or making the hook a util function
  const formatLegend = (legendStr: string) => {
    const escapedStr = escapeHtml(legendStr);

    // If there is any text wrapped in backticks then format that as a `<code>` element which looks a little like a keyboard key
    return escapedStr.replace(
      /`([^`]+)`/g,
      "<code class='inline-block bg-gray-300 border border-gray-300 text-gray-900 font-mono text-sm px-2 py-1 rounded-md shadow-sm mx-1'>$1</code>"
    );
  };

  return (
    <div className={`${className} flex justify-center`}>
      <RadioGroup
        className="flex flex-col gap-2 w-full items-center"
        defaultValue="Standard"
        value={selected}
        onChange={setSelected}
      >
        <Label
          className="text-xl font-semibold mb-5"
          dangerouslySetInnerHTML={{ __html: formatLegend(legend) }}
        ></Label>

        <div className="flex flex-col align-center gap-2 w-full max-w-[300px]">
          {options.map((option, i) => {
            return <ShippingOption key={i} name={option} />;
          })}
        </div>
      </RadioGroup>
    </div>
  );
}

function ShippingOption({ name }: { name: string }) {
  return (
    <Radio
      value={name}
      className={({ isFocusVisible, isSelected, isPressed }) => `
      group relative flex cursor-default rounded-lg px-4 py-3 shadow-lg outline-none bg-clip-padding border border-solid
      ${
        isFocusVisible
          ? "ring-2 ring-blue-600 ring-offset-1 ring-offset-white/80"
          : ""
      }
      ${
        isSelected
          ? "bg-blue-600 border-white/30 text-white"
          : "border-transparent"
      }
      ${isPressed && !isSelected ? "bg-blue-50" : ""}
      ${!isSelected && !isPressed ? "bg-white" : ""}
    `}
    >
      <div className="flex w-full items-center justify-between gap-3">
        <div className="flex items-center shrink-0 text-blue-100 group-selected:text-white">
          <CheckCircleIcon size="M" width={24} height={24} />
        </div>
        <div className="text-lg font-semibold text-gray-900 group-selected:text-white text-right text-balance">
          {capitalizeFirstLetter(name)}
        </div>
      </div>
    </Radio>
  );
}
