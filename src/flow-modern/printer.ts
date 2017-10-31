import * as t from 'babel-types';
import { parse } from 'babylon';
import generate from 'babel-generator';

type Printable = t.Node | string;

export default class Printer {
  private printQueue: Printable[] = []

  public print(printable: Printable) {
    return this.printQueue.reduce(
      (document: string, printable: Printable) => {
        if (typeof printable === 'string') {
          return document + printable;
        } else {
          return document + generate(printable as t.Node).code;
        }
      },
      ''
    );
  }

  public enqueue(printable: Printable) {
    return this.printQueue.push(printable);
  }
}