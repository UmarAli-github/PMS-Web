export interface NextErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
