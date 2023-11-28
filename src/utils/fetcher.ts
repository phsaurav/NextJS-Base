import { RequestInfo } from 'undici-types';

// noinspection JSUnusedGlobalSymbols
class Fetcher {
  private token?: string;
  private logger = console;
  private log = true;
  private baseHeader: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  private formHeader: Record<string, string> = {
    Accept: 'application/json',
  };

  constructor(
    _token?: string,
    _log = true,
    _baseHeader?: Record<string, string>
  ) {
    if (_token) this.token = _token;
    if (_baseHeader) this.baseHeader = _baseHeader;
    this.log = _log;
  }

  private getHeader(form = false): Record<string, string> {
    if (form) {
      return {
        ...this.formHeader,
        Authorization: this.token ? `token ${this.token}` : '',
      };
    }
    return {
      ...this.baseHeader,
      Authorization: this.token ? `token ${this.token}` : '',
    };
  }

  private fetch_data<T>(_url: RequestInfo | URL, _option: any): Promise<T> {
    return new Promise((resolve, reject) => {
      let statusCode = -1;
      let is_error = false;
      fetch(_url, _option)
        .then((response) => {
          statusCode = response.status;
          if (!response.ok) {
            is_error = true;
            return response.json().then((data) => {
              const error = {
                status: response.status,
                message: response.statusText,
                error_data: data,
              };
              if (this.log) {
                this.logger.groupCollapsed(
                  `%c[${_option.method}] ${_url}`,
                  'color:red'
                );
                this.logger.error(error);
                this.logger.groupEnd();
              }
              reject(error);
            });
          }
          return response.json();
        })
        .then((result) => {
          const data = {
            ...result,
            statusCode: statusCode,
          };
          if (this.log && !is_error) {
            this.logger.groupCollapsed(
              `%c[${_option.method}] ${_url}`,
              'color:yellow'
            );
            this.logger.table(data);
            this.logger.groupEnd();
          }
          resolve(data);
        })
        .catch((error) => {
          if (this.log) {
            this.logger.groupCollapsed(
              `%c[${_option.method}] ${_url}`,
              'color:red'
            );
            this.logger.error(error);
            this.logger.groupEnd();
          }
          reject(error);
        });
    });
  }

  get<T>(_url: RequestInfo | URL): Promise<T> {
    return this.fetch_data(_url, {
      method: 'GET',
      headers: this.getHeader(),
    });
  }

  post<T>(_url: RequestInfo | URL, _body: any, form = false): Promise<T> {
    return this.fetch_data(_url, {
      method: 'POST',
      headers: this.getHeader(form),
      body: form ? _body : JSON.stringify(_body),
    });
  }

  put<T>(_url: RequestInfo | URL, _body: any, form = false): Promise<T> {
    return this.fetch_data(_url, {
      method: 'PUT',
      headers: this.getHeader(form),
      body: form ? _body : JSON.stringify(_body),
    });
  }

  patch<T>(_url: RequestInfo | URL, _body: any): Promise<T> {
    return this.fetch_data(_url, {
      method: 'PATCH',
      headers: this.getHeader(),
      body: JSON.stringify(_body),
    });
  }

  delete<T>(_url: RequestInfo | URL, _body?: any): Promise<T> {
    return this.fetch_data(_url, {
      method: 'DELETE',
      headers: this.getHeader(),
      body: _body && JSON.stringify(_body),
    });
  }
}

export default Fetcher;
