import { FC, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FormField, TextInput, SubmitButton, CheckboxGroup } from '@/components/forms';
import { visitorService } from '@/services/visitorService';
import { INTEREST_OPTIONS } from '@/data/interests';
import type { VisitorFormData, VisitorRegistration } from '@/types/visitor';
import {
  FormContainer,
  FieldGroup,
  SectionLabel,
  RequiredAsterisk,
  RadioButtonGroup,
  RadioButton,
  ErrorText,
} from './VisitorForm.styles';

interface VisitorFormProps {
  /** Callback when form is successfully submitted */
  onSuccess: (data: VisitorRegistration) => void;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Visitor registration form with name, email, and first-time visitor selection.
 * Uses react-hook-form for validation and state management.
 */
export const VisitorForm: FC<VisitorFormProps> = ({ onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VisitorFormData>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      isFirstTime: undefined as unknown as boolean,
      interests: [],
    },
  });

  const onSubmit = async (data: VisitorFormData) => {
    setIsSubmitting(true);
    try {
      const response = await visitorService.registerVisitor(data);
      if (response.data) {
        onSuccess(response.data);
      }
    } catch {
      // Error handling would go here
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} noValidate>
      <FieldGroup>
        <FormField
          label="Your Name"
          required
          error={errors.name?.message}
          htmlFor="name"
        >
          <Controller
            name="name"
            control={control}
            rules={{
              required: 'Please enter your name',
              maxLength: {
                value: 100,
                message: 'Name must be less than 100 characters',
              },
            }}
            render={({ field }) => (
              <TextInput
                {...field}
                id="name"
                placeholder="Enter your full name"
                hasError={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
            )}
          />
        </FormField>

        <FormField
          label="Email"
          required
          error={errors.email?.message}
          htmlFor="email"
        >
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Please enter your email',
              pattern: {
                value: EMAIL_PATTERN,
                message: 'Please enter a valid email address',
              },
            }}
            render={({ field }) => (
              <TextInput
                {...field}
                id="email"
                type="email"
                placeholder="your.email@example.com"
                hasError={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
            )}
          />
        </FormField>

        <FormField label="Phone (optional)" htmlFor="phone">
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                id="phone"
                type="tel"
                placeholder="(555) 123-4567"
              />
            )}
          />
        </FormField>

        <div>
          <SectionLabel>
            Is this your first time visiting?
            <RequiredAsterisk aria-hidden="true">*</RequiredAsterisk>
          </SectionLabel>
          <Controller
            name="isFirstTime"
            control={control}
            rules={{
              validate: (value) =>
                value !== undefined ||
                'Please indicate if this is your first visit',
            }}
            render={({ field }) => (
              <RadioButtonGroup role="radiogroup" aria-label="First time visiting">
                <RadioButton
                  type="button"
                  isSelected={field.value === true}
                  onClick={() => field.onChange(true)}
                  role="radio"
                  aria-checked={field.value === true}
                >
                  Yes, first time
                </RadioButton>
                <RadioButton
                  type="button"
                  isSelected={field.value === false}
                  onClick={() => field.onChange(false)}
                  role="radio"
                  aria-checked={field.value === false}
                >
                  I've been before
                </RadioButton>
              </RadioButtonGroup>
            )}
          />
          {errors.isFirstTime && (
            <ErrorText role="alert">{errors.isFirstTime.message}</ErrorText>
          )}
        </div>

        <div>
          <SectionLabel>What would you like to learn more about?</SectionLabel>
          <Controller
            name="interests"
            control={control}
            render={({ field }) => (
              <CheckboxGroup
                name="interests"
                options={INTEREST_OPTIONS.map((opt) => ({
                  value: opt.id,
                  label: opt.label,
                }))}
                values={field.value}
                onChange={field.onChange}
                ariaLabel="Select your interests"
              />
            )}
          />
        </div>
      </FieldGroup>

      <SubmitButton isLoading={isSubmitting}>Submit</SubmitButton>
    </FormContainer>
  );
};
