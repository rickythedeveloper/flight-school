export type OperationResult<Data, Error> =
  | (Data extends undefined
      ? { isSuccess: true }
      : { isSuccess: true; data: Data })
  | (Error extends undefined
      ? { isSuccess: false }
      : { isSuccess: false; error: Error });
