/**
 * Currency utility for consistent formatting across the application
 */

// Currency symbol for the Philippine Peso (₱)
export const CURRENCY_SYMBOL = "₱";

/**
 * Formats a number as currency
 * @param amount - The amount to format
 * @param options - Intl.NumberFormat options
 * @returns Formatted currency string
 */
export const formatCurrency = (
  amount: number | string, 
  options: Intl.NumberFormatOptions = {}
): string => {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numericAmount)) {
    return `${CURRENCY_SYMBOL}0.00`;
  }

  return `${CURRENCY_SYMBOL}${numericAmount.toLocaleString('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options
  })}`;
};

/**
 * Formats a price with a plus symbol for "starting from" prices
 * @param amount - The amount to format
 * @returns Formatted price with plus symbol
 */
export const formatPriceWithPlus = (amount: number | string): string => {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numericAmount)) {
    return `${CURRENCY_SYMBOL}0.00+`;
  }

  return `${CURRENCY_SYMBOL}${numericAmount.toLocaleString('en-PH', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })}+`;
};