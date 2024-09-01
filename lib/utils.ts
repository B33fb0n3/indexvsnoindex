import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import IdGenerator from "stripe-id-generator";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const allowedUUIDPrefix = ['acc_no', 'acc_with'] as const
export const generateUuid = (prefix: typeof allowedUUIDPrefix[number]) => {
  const generator = new IdGenerator(allowedUUIDPrefix as any);
  return generator.new(prefix);
}