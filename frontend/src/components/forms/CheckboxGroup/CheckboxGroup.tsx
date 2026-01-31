import type { FC } from 'react';
import {
  GroupContainer,
  CheckboxLabel,
  HiddenCheckbox,
  CheckboxVisual,
  CheckIcon,
  LabelText,
} from './CheckboxGroup.styles';

interface CheckboxOption {
  value: string;
  label: string;
}

interface CheckboxGroupProps {
  /** Field name for form integration */
  name: string;
  /** Array of checkbox options */
  options: CheckboxOption[];
  /** Array of currently selected values */
  values: string[];
  /** Callback when selection changes */
  onChange: (values: string[]) => void;
  /** Accessible label for the group */
  ariaLabel?: string;
}

/**
 * Multi-select checkbox group component.
 * Renders styled checkboxes with proper accessibility attributes.
 */
export const CheckboxGroup: FC<CheckboxGroupProps> = ({
  name,
  options,
  values,
  onChange,
  ariaLabel,
}) => {
  const handleChange = (optionValue: string) => {
    const isSelected = values.includes(optionValue);
    if (isSelected) {
      onChange(values.filter((v) => v !== optionValue));
    } else {
      onChange([...values, optionValue]);
    }
  };

  return (
    <GroupContainer role="group" aria-label={ariaLabel}>
      {options.map((option) => {
        const isChecked = values.includes(option.value);
        return (
          <CheckboxLabel key={option.value}>
            <HiddenCheckbox
              type="checkbox"
              name={name}
              value={option.value}
              checked={isChecked}
              onChange={() => handleChange(option.value)}
            />
            <CheckboxVisual isChecked={isChecked}>
              {isChecked && (
                <CheckIcon viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </CheckIcon>
              )}
            </CheckboxVisual>
            <LabelText>{option.label}</LabelText>
          </CheckboxLabel>
        );
      })}
    </GroupContainer>
  );
};
