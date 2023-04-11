import { LogLevel } from '@nestjs/common/services/logger.service';

const getLogLevels = (isProduction: boolean): LogLevel[] => {
  if (isProduction) {
    return ['log', 'warn', 'error'];
  }
  return ['error', 'warn', 'log', 'verbose', 'debug'];
};

export default getLogLevels;
