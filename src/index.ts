import { bold, cyan, gray, green, italic, red, yellow } from "colorette";
import { emojify } from "node-emoji";

import replaceBigInts from "./replaceBigInts.js";

export type LogArg = Error | bigint | boolean | number | object | string;

export const LogLevels = {
  0: "Debug",
  1: "Info",
  2: "Warn",
  3: "Error",
  4: "Fatal",
  Debug: 0,
  Error: 3,
  Fatal: 4,
  Info: 1,
  Warn: 2,
};

const prefixes = new Map([
  [0, "DEBUG"],
  [1, "INFO"],
  [2, "WARN"],
  [3, "ERROR"],
  [4, "FATAL"],
  [5, "SUCCESS"],
]);
const noColor = (msg: any) => msg;
const colorFunctions = new Map([
  [0, gray],
  [1, cyan],
  [2, yellow],
  [3, str => red(str)],
  [4, str => red(bold(italic(str)))],
  [5, str => green(str)],
]);

export default class Logger {
  private name?: string;

  constructor(name?: string) {
    this.name = name;
  }

  private log(level = 1, ...args: any[]) {
    const color = colorFunctions.get(level) || noColor;
    const date = new Date();
    const dateString = `[${date.toLocaleDateString()}/${date.toLocaleTimeString()}]`;
    const nameString = this.name ? `[${this.name}] ` : "";

    const primaryPrefix = `${gray(dateString)} {LIST} ${bold(color(prefixes.get(level) ?? "DEBUG"))} > ${nameString}`;
    const secondaryPrefix = `${gray(dateString)} {LIST} ${bold(gray(prefixes.get(level) ?? "DEBUG"))} > ${nameString}`;

    const formattedMessage = args
      .map((arg, index, array) => {
        const processedArg =
          typeof arg === "object" && !(arg instanceof Error)
            ? JSON.stringify(replaceBigInts(arg), null, 2)
            : (arg?.stack ?? arg?.toString?.() ?? arg);

        return emojify("" + processedArg)
          .split("\n")
          .filter(line => line.trim())
          .map((line, i, lines) => {
            const listSymbol =
              lines.length > 1 || array.length > 1
                ? index === 0 && i === 0
                  ? "┌"
                  : index === array.length - 1 && i === lines.length - 1
                    ? "└"
                    : "│"
                : ">";

            const selectedPrefix = i === 0 || i === lines.length - 1 ? primaryPrefix : secondaryPrefix;
            return selectedPrefix.replace("{LIST}", listSymbol) + line;
          })
          .join("\n");
      })
      .join("\n");

    const logMessage = [formattedMessage];

    switch (level) {
      case 0:
        return false && console.debug(...logMessage);
      case 1:
        return console.info(...logMessage);
      case 2:
        return console.warn(...logMessage);
      case 3:
      case 4:
        return console.error(...logMessage);
      default:
        return console.log(...logMessage);
    }
  }

  public debug(...args: LogArg[]) {
    this.log(0, ...args);
  }

  public error(...args: LogArg[]) {
    this.log(3, ...args);
  }

  public fatal(...args: LogArg[]) {
    this.log(4, ...args);
  }

  public info(...args: LogArg[]) {
    this.log(1, ...args);
  }

  public success(...args: LogArg[]) {
    this.log(5, ...args);
  }
  public warn(...args: LogArg[]) {
    this.log(2, ...args);
  }
}
