export const successResponse = (res, data, message = 'Success') => {
    res.status(200).json({ status: 'success', message, data });
  };
  
  export const errorResponse = (res, message = 'Error', status = 400) => {
    res.status(status).json({ status: 'error', message });
  };
  