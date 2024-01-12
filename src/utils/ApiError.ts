export class ApiError extends Error {
  public status: number;
  public details?: any;
  public stackTrace?: string;

  constructor(
    status: number,
    message: string,
    details?: any,
    includeStackTrace: boolean = false
  ) {
    super(message);
    this.status = status;
    this.details = details;

    if (includeStackTrace && this.stack) {
      this.stackTrace = this.stack;
    }
  }
}
