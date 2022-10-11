import { Console } from "console";
import chalk from "chalk";

export default class Logger extends Console {
  shardId: number | undefined;
  constructor(opts: any) {
    super(process.stdout, process.stderr);

    this.shardId = opts?.shardId;
  }

  info(input: string, type = "INFO"): void {
    if (type === "BLANK") {
      return this.log(chalk.hidden("-"));
    }
    const mess = chalk.cyan(`[#${this.shardId || 0}]` + "[INFO]" + (type ? "[" + type + "]" : "")) + ": " + input;
    super.log(mess);
  }

  error(input: string, type?: string): void {
    const mess =
      chalk.bold.redBright(`[#${this.shardId || 0}]` + "[ERRO]" + (type ? "[" + type + "]" : "")) + ": " + input;
    super.error(mess);
  }

  warn(input: string, type?: string): void {
    const mess =
      chalk.bold.yellow(`[#${this.shardId || 0}]` + "[WARN]" + (type ? "[" + type + "]" : "")) + ": " + input;
    super.warn(mess);
  }

  debug(message: string): void {
    const mess = chalk.magenta(`[#${this.shardId || 0}]` + "[DEBG]") + ": " + message;
    super.log(mess);
  }

  date(msTimeStamp: number = new Date().getTime()): string {
    const date = new Date(msTimeStamp);

    let minutes = `${date.getMinutes()}`;
    if (minutes.length === 1) minutes = `0${minutes}`;

    let seconds = `${date.getSeconds()}`;
    if (seconds.length === 1) seconds = `0${seconds}`;

    return `[ ${date.getFullYear()}.${
      date.getMonth() + 1
    }.${date.getDate()} - ${date.getHours()}:${minutes}:${seconds} ]`;
  }

  setShardId(id: number): Logger {
    this.shardId = id;
    return this;
  }
}
