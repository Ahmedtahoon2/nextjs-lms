export type ActionSuccess<T> = {
  success: true;
  data: T;
};

export type ActionFailure = {
  success: false;
  error: string;
  code?: string;
  details?: Record<string, string[]>;
};

export type ActionResult<T = void> = ActionSuccess<T> | ActionFailure;

export function actionSuccess<T>(data: T): ActionSuccess<T> {
  return {
    success: true,
    data,
  };
}

export function actionFailure(
  error: string,
  code?: string,
  details?: Record<string, string[]>,
): ActionFailure {
  return {
    success: false,
    error,
    code,
    details,
  };
}
