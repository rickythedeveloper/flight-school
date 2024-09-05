import { SegmentedControl as MantineSegmentedControl } from "@mantine/core";
import type { ReactElement } from "react";

interface ValueOption<Value> {
  value: Value;
  label: string;
}

interface SegmentedControlProps<Value> {
  value: Value;
  setValue: (newValue: Value) => void;
  options: ValueOption<Value>[];
}

export const SegmentedControl = <Value extends string>({
  value,
  setValue,
  options,
}: SegmentedControlProps<Value>): ReactElement => {
  return (
    <MantineSegmentedControl
      value={value}
      onChange={(newValue) => {
        // The options are constrained to have a value of type Value
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        setValue(newValue as Value);
      }}
      data={options}
    />
  );
};
