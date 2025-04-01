import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function classNames(...inputs: string[]) {
  return inputs.join(' ');
}

export function predictionLabel(prediction: number) {
  switch (prediction) {
    case 1:
      return 'Positive';
    case 0:
      return 'Negative';
    default:
      return 'Neutral';
  }
}
