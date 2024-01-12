export const apiResponse = (
  data: any,
  message: string = "",
  success: boolean = true
) => {
  return {
    success,
    data,
    message,
  };
};
