import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApplicationConfigService {
  private endpointPrefix = '';
  private API_VERSION = 'v1/'

  setEndpointPrefix(endpointPrefix: string): void {
    this.endpointPrefix = endpointPrefix + 'api/' + this.API_VERSION;
  }

  getEndpointFor(api: string): string {
    return `${this.endpointPrefix}${api}`;
  }
}
