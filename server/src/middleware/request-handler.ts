import { Request, Response, NextFunction, RequestHandler } from "express";
import { ZodError } from "zod";
import { BadRequestError } from "../errors/bad-request-error";
import { ForbiddenError } from "../errors/forbidden-error";
import { NotFoundError } from "../errors/not-found-error";

export function requestHandler(
  handler: (req: Request, res: Response, next: NextFunction) => Promise<void>,
): RequestHandler {
  return (req, res, next) => {
    handler(req, res, next).catch((error) => {
      if (error instanceof ZodError) {
        res.status(400).json({
          message: "Validation error",
          errors: error.flatten((i) => i.message).fieldErrors,
        });
        return;
      }

      if (error instanceof BadRequestError) {
        res.status(400).json({
          message: error.message,
        });
        return;
      }

      if (error instanceof ForbiddenError) {
        res.status(403).json({
          message: error.message,
        });
        return;
      }

      if (error instanceof NotFoundError) {
        res.status(404).json({
          message: error.message,
        });
        return;
      }

      next(error);
    });
  };
}
