import { Console } from "console";
import chalk from "chalk";

export default class Logger extends Console {
  shardId: number | undefined;
  clusterId: number | undefined;
  constructor(opts: any) {
    super(process.stdout, process.stderr);

    this.shardId = opts?.shardId;
    this.clusterId = opts?.clusterId;
  }

  public info(input: string, type = "INFO"): void {
    if (type === "BLANK") {
      return this.log(chalk.hidden("-"));
    }
    const mess = chalk.cyan(this._prefix() + "[INFO]" + (type ? "[" + type + "]" : "")) + ": " + input;
    super.log(mess);
  }

  public error(input: string, type?: string): void {
    const mess = chalk.bold.redBright(this._prefix() + "[ERRO]" + (type ? "[" + type + "]" : "")) + ": " + input;
    super.error(mess);
  }

  public warn(input: string, type?: string): void {
    const mess = chalk.bold.yellow(this._prefix() + "[WARN]" + (type ? "[" + type + "]" : "")) + ": " + input;
    super.warn(mess);
  }

  public debug(message: string): void {
    const mess = chalk.magenta(this._prefix() + "[DEBG]") + ": " + message;
    super.log(mess);
  }

  public date(msTimeStamp: number = new Date().getTime()): string {
    const date = new Date(msTimeStamp);

    let minutes = `${date.getMinutes()}`;
    if (minutes.length === 1) minutes = `0${minutes}`;

    let seconds = `${date.getSeconds()}`;
    if (seconds.length === 1) seconds = `0${seconds}`;

    return `[ ${date.getFullYear()}.${
      date.getMonth() + 1
    }.${date.getDate()} - ${date.getHours()}:${minutes}:${seconds} ]`;
  }

  private _prefix(): string {
    return chalk.gray(`[Cluster #${this.clusterId || 0}][Shard #${this.shardId || 0}]`);
  }

  public setClusterId(id: number): Logger {
    this.clusterId = id;
    return this;
  }

  public setShardId(id: number): Logger {
    this.shardId = id;
    return this;
  }
}
