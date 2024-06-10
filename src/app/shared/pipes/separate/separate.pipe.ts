import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'separate',
})
export class SeparatePipe implements PipeTransform {
  /**
   * It takes a string, splits it into an array of strings, and returns the last element of that array
   * @param {string} value - The value to be transformed.
   * @param {string} [separator=-] - The separator to use to split the string.
   * @returns The last part of the string, separated by the separator.
   */
  transform(value: string, separator: string = '-'): string {
    const parts = value.split(separator);
    return parts[parts.length - 1];
  }
}
