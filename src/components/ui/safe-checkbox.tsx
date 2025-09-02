
import React, { useCallback, memo } from 'react'
import { Checkbox } from './checkbox'

interface SafeCheckboxProps {
  id: string
  checked: boolean
  onChange: (checked: boolean) => void
  className?: string
  disabled?: boolean
  label?: string
}

// Memoized checkbox component to prevent infinite loops
const SafeCheckbox = memo(function SafeCheckbox({
  id,
  checked,
  onChange,
  className,
  disabled,
  label
}: SafeCheckboxProps) {
  // Use memoized callback to prevent recreating the function on every render
  const handleCheckedChange = useCallback((checkedState: boolean | 'indeterminate') => {
    // Only call onChange when value is a boolean and different from current checked state
    if (typeof checkedState === 'boolean' && checkedState !== checked) {
      onChange(checkedState)
    }
  }, [onChange, checked]) // Include checked in the dependency array

  return (
    <Checkbox
      id={id}
      checked={checked}
      onCheckedChange={handleCheckedChange}
      className={className}
      disabled={disabled}
    />
  )
})

// Prevent unnecessary re-renders
SafeCheckbox.displayName = 'SafeCheckbox'

export { SafeCheckbox }
