import { useImperativeHandle, forwardRef, useCallback, useId } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FormField, TextInput, CheckboxGroup } from '@/components/forms';
import { visitorService } from '@/services/visitorService';
import { INTEREST_OPTIONS } from '@/data/interests';
import type { VisitorFormData, VisitorRegistration } from '@/types/visitor';
import {
  FormCard,
  FormContainer,
  FieldGroup,
  SectionLabel,
  RequiredAsterisk,
  RadioButtonGroup,
  RadioButton,
  ErrorText,
} from './VisitorForm.styles';

export interface VisitorFormRef {
  /** Trigger form submission programmatically */
  submit: () => void;
}

interface VisitorFormProps {
  /** Callback when form is successfully submitted */
  onSuccess: (data: VisitorRegistration) => void;
  /** Callback to report loading state changes */
  onLoadingChange?: (isLoading: boolean) => void;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Visitor registration form with name, email, and first-time visitor selection.
 * Uses react-hook-form for validation and state management.
 * Submit button is external - use the ref to trigger submission.
 */
export const VisitorForm = forwardRef<VisitorFormRef, VisitorFormProps>(
  ({ onSuccess, onLoadingChange }, ref) => {
    // Generate unique IDs for form fields to support multiple form instances
    const formId = useId();

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

    const onSubmit = useCallback(
      async (data: VisitorFormData) => {
        onLoadingChange?.(true);
        try {
          const response = await visitorService.registerVisitor(data);
          if (response.data) {
            onSuccess(response.data);
          }
        } catch {
          // Error handling would go here
          onLoadingChange?.(false);
        }
      },
      [onSuccess, onLoadingChange]
    );

    // Expose submit method via ref
    useImperativeHandle(
      ref,
      () => ({
        submit: () => {
          handleSubmit(onSubmit)();
        },
      }),
      [handleSubmit, onSubmit]
    );

    // Create unique IDs for this form instance
    const nameId = `${formId}-name`;
    const emailId = `${formId}-email`;
    const phoneId = `${formId}-phone`;
    const interestsId = `${formId}-interests`;

    return (
      <FormCard>
        <FormContainer
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          id={`${formId}-form`}
        >
          <FieldGroup>
            <FormField
              label="Your Name"
              required
              error={errors.name?.message}
              htmlFor={nameId}
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
                    id={nameId}
                    placeholder="Enter your full name"
                    hasError={!!errors.name}
                    aria-describedby={errors.name ? `${nameId}-error` : undefined}
                  />
                )}
              />
            </FormField>

            <FormField
              label="Email"
              required
              error={errors.email?.message}
              htmlFor={emailId}
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
                    id={emailId}
                    type="email"
                    placeholder="your.email@example.com"
                    hasError={!!errors.email}
                    aria-describedby={errors.email ? `${emailId}-error` : undefined}
                  />
                )}
              />
            </FormField>

            <FormField label="Phone (optional)" htmlFor={phoneId}>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    id={phoneId}
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
                  <RadioButtonGroup
                    role="radiogroup"
                    aria-label="First time visiting"
                  >
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
              <SectionLabel>
                What would you like to learn more about?
              </SectionLabel>
              <Controller
                name="interests"
                control={control}
                render={({ field }) => (
                  <CheckboxGroup
                    name={interestsId}
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
        </FormContainer>
      </FormCard>
    );
  }
);

VisitorForm.displayName = 'VisitorForm';
