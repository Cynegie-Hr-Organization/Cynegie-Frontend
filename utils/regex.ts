// utils/regex.ts

// Email regex validation pattern
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Strong password regex validation pattern
export const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/;

// Name validation pattern (Optional: Ensures only alphabets)
export const nameRegex = /^[a-zA-Z]+$/;
