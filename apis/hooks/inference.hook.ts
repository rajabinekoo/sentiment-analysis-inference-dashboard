import { useMutation } from '@tanstack/react-query';
import { inference } from '@/apis/services/inference.service';

export function useInference() {
  return useMutation({
    mutationKey: ['inference'],
    mutationFn: inference,
  });
}
