interface ValidationErrorDetail {
  message: string;
  name: string;
  properties: {
    message: string;
    type: string;
    min: number;
  };
  kind: string;
  path: string;
  value: unknown;
}

interface ValidationErrorResponse {
  name: string;
  errors: Record<string, ValidationErrorDetail>;
}

export default ValidationErrorResponse;
