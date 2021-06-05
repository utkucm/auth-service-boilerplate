interface IError {
  name: string;
  message: string;
}

interface IErrors {
  validation: IError;
  unauthorized: IError;
  notFound: IError;
  internalServer: IError;
}

const errors: IErrors = {
  validation: {
    name: 'Validation Error',
    message: 'Invalid Request.',
  },
  unauthorized: {
    name: 'Unauthorized Error',
    message: 'You are not authorized.',
  },
  notFound: {
    name: 'Not Found Error',
    message: 'Not found.',
  },
  internalServer: {
    name: 'Internal Server Error',
    message: 'Something went wrong.',
  },
};

export default errors;
