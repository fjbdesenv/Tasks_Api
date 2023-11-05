import { createLogger, transports, format } from "winston";
import { variables } from "./../Conf";

const pathLogs = variables.MODE === 'development' ? './src' : './build';
const { combine, timestamp, label, printf } = format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});


const logger = createLogger({
  level: "info",
  format: combine(
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.File({ filename: `${pathLogs}/Logs/error.log`, level: 'error', json: true }),
    new transports.File({ filename: `${pathLogs}/Logs/info.log`, level: 'info', json: true }),
  ],
});


if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: combine(
        timestamp(),
        myFormat
      ),
    })
  );
}


export { logger };