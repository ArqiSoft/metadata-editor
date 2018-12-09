import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, args: string[]): string {
    const argsLength = args && args.length || 0;
    const limit = argsLength > 0 ? parseInt(args[0], 10) : 10;
    const trail = argsLength > 1 ? args[1] : '...';
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}
