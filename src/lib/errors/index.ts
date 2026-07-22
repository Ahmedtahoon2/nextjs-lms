export class AuthenticationError extends Error {
  readonly statusCode = 401;
  readonly code = "AUTHENTICATION_ERROR";

  constructor(message = "Authentication required") {
    super(message);
    this.name = "AuthenticationError";
  }
}

export class AuthorizationError extends Error {
  readonly statusCode = 403;
  readonly code = "AUTHORIZATION_ERROR";

  constructor(message = "Insufficient permissions") {
    super(message);
    this.name = "AuthorizationError";
  }
}

export class InvalidCredentialsError extends Error {
  readonly statusCode = 401;
  readonly code = "INVALID_CREDENTIALS";

  constructor(message = "Invalid email or password") {
    super(message);
    this.name = "InvalidCredentialsError";
  }
}

export class SessionExpiredError extends Error {
  readonly statusCode = 401;
  readonly code = "SESSION_EXPIRED";

  constructor(message = "Session has expired") {
    super(message);
    this.name = "SessionExpiredError";
  }
}

export class EmailVerificationRequiredError extends Error {
  readonly statusCode = 403;
  readonly code = "EMAIL_VERIFICATION_REQUIRED";

  constructor(message = "Email verification required") {
    super(message);
    this.name = "EmailVerificationRequiredError";
  }
}

export class NotFoundError extends Error {
  readonly statusCode = 404;
  readonly code = "NOT_FOUND";

  constructor(message = "Resource not found") {
    super(message);
    this.name = "NotFoundError";
  }
}

export class ValidationError extends Error {
  readonly statusCode = 400;
  readonly code = "VALIDATION_ERROR";
  readonly errors: Record<string, string[]>;

  constructor(errors: Record<string, string[]>, message = "Validation failed") {
    super(message);
    this.name = "ValidationError";
    this.errors = errors;
  }
}
