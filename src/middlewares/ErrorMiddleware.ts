import {
  Middleware,
  ExpressErrorMiddlewareInterface,
} from "routing-controllers";
import { Service } from "typedi";
import { ApiError } from "../utils/ApiError";

@Middleware({ type: "after" })
@Service()
export class GlobalErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, request: any, response: any, next: (err?: any) => any) {
    const isProduction = process.env.NODE_ENV === "production";

    if (error instanceof ApiError) {
      response.status(error.status).json({
        success: false,
        error: {
          message: error.message,
          details: error.details,
          ...(isProduction ? {} : { stack: error.stackTrace }), // Include stack trace if not in production
        },
      });
    } else {
      response.status(500).json({
        success: false,
        error: {
          message: "Internal Server Error",
          ...(isProduction ? {} : { stack: error.stack }),
        },
      });
    }
  }
}
