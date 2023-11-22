import { createLogger, transports, format } from "winston";
import { variables } from "./../Conf";


const { MODE } = variables.SERVER;


const pathLogs = MODE === 'development' ? './src' : './build';
const { combine, timestamp, printf } = format;
const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});


const Logger = createLogger({
  
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
  Logger.add(
    new transports.Console({
      format: combine(
        timestamp(),
        myFormat
      ),
    })
  );
}


export { Logger };