import type { FC } from 'react';
import { GroupContainer, RadioButton } from './RadioGroup.styles';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  /** Field name for form integration */
  name: string;
  /** Array of radio options */
  options: RadioOption[];
  /** Currently selected value */
  value: string;
  /** Callback when selection changes */
  onChange: (value: string) => void;
  /** Accessible label for the group */
  ariaLabel?: string;
  /** Show error styling */
  hasError?: boolean;
}

/**
 * Button-style radio group for mutually exclusive selections.
 * Renders as styled buttons with proper ARIA attributes.
 */
export const RadioGroup: FC<RadioGroupProps> = ({
  name,
  options,
  value,
  onChange,
  ariaLabel,
  hasError = false,
}) => {
  return (
    <GroupContainer
      role="radiogroup"
      aria-label={ariaLabel}
      hasError={hasError}
    >
      {options.map((option) => (
        <RadioButton
          key={option.value}
          type="button"
          isSelected={value === option.value}
          onClick={() => onChange(option.value)}
          role="radio"
          aria-checked={value === option.value}
          name={name}
        >
          {option.label}
        </RadioButton>
      ))}
    </GroupContainer>
  );
};
