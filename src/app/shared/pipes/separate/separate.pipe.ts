import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe para separar una cadena de texto y devolver la última parte.
 */
@Pipe({
  name: 'separate',
})
export class SeparatePipe implements PipeTransform {
  /**
   * Toma una cadena de texto, la divide en un array de cadenas y devuelve el último elemento de ese array.
   * @param value La cadena de texto a transformar.
   * @param separator (opcional) El separador a utilizar para dividir la cadena de texto.
   * @returns La última parte de la cadena de texto, separada por el separador especificado.
   */
  transform(value: string, separator: string = '-'): string {
    const parts = value.split(separator);
    return parts[parts.length - 1];
  }
}
