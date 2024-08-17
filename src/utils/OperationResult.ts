export type OperationResult<Data, Error> =
  | {
      isSuccess: false;
      error: Error;
    }
  | {
      isSuccess: true;
      data: Data;
    };
