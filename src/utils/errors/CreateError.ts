import BadRequest from './BadRequest';
import NotFound from './NotFound';
import Unauthorized from './Unauthorized';
import InternalServer from './InternalServer';

class CreateError {
  public static BadRequestError = (message?: string): BadRequest => {
    return new BadRequest(message);
  };

  public static UnauthorizedError = (message?: string): Unauthorized => {
    return new Unauthorized(message);
  };

  public static NotFoundError = (message?: string): NotFound => {
    return new NotFound(message);
  };

  public static InternalServerError = (): InternalServer => {
    return new InternalServer();
  };
}

export default CreateError;
