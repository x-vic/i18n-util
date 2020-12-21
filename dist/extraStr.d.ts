/// <reference types="node" />
import fs from 'fs';

export declare function extractLang(obj: Object, path?: string, value2key?: Map<any, any>): Map<string, string>;

export declare function handle$t(source: string, pathName: string): void;

declare type HandleFile = (source: fs.PathLike, pathName: string) => void;

export declare function mapDir(dir: string, callback?: HandleFile, finish?: () => void): void;

export declare function replace$t(source: string, handleMatch?: (origin: string, target: string) => string): string;

export { }
