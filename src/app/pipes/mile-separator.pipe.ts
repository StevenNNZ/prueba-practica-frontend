import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mileSeparator',
  standalone: true,
})
export class MileSeparatorPipe implements PipeTransform {
  transform(value?: number | string | null): string {
    if (!value) {
      return '';
    }

    return value
      .toString()
      .replaceAll('.', '')
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
}
