export interface AylaError {
  code: number;
  message: string;
  domain: string;

  underlinedError?: AylaError;
  error_description: string;
}
