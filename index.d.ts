import { Console } from "console";
export default class Logger extends Console {
    shardId: number | undefined;
    clusterId: number | undefined;
    constructor(opts: any);
    info(input: string, type?: string): void;
    error(input: string, type?: string): void;
    warn(input: string, type?: string): void;
    debug(message: string): void;
    date(msTimeStamp?: number): string;
    private _prefix;
    setClusterId(id: number): Logger;
    setShardId(id: number): Logger;
}
