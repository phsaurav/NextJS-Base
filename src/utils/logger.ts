class BaseLogger {
  logLevelList: string[] = [
    'OFF',
    'FATAL',
    'ERROR',
    'WARN',
    'INFO',
    'DEBUG',
    'TRACE',
    'ALL',
  ];
  logLevelText: string = 'ALL';

  constructor(_logLevelText: string = 'ALL') {
    this.logLevelText = _logLevelText.toUpperCase();
  }

  showLog(_level: string): boolean {
    const given = this.getLogLevel(_level.toUpperCase());
    if (given < 1) return false;
    return this.getLogLevel(this.logLevelText) >= given;
  }

  getLogLevel(_logLevelText: string): number {
    return this.logLevelList.findIndex((level) => level === _logLevelText);
  }
}

class Logger extends BaseLogger {
  timeLabel: string = 'START';
  labelText: string = '';

  constructor(_logLevelText: string = 'ALL') {
    super(_logLevelText);
  }

  track(func: () => any, _label: string = 'Execution Time'): any {
    const show = this.showLog('info');
    if (show) {
      console.group(`%cTRACKING ${this.getLabelText()}`, 'color:lightgreen');
      console.time(_label);
    }
    const x = func();
    if (show) {
      console.timeEnd(_label);
      console.groupEnd();
    }
    return x;
  }

  time(_label: string) {
    if (!this.showLog('info')) return;
    this.timeLabel = _label + String(new Date().getTime());
    console.group(`%c${this.timeLabel}`, 'color:green');
    console.time(this.timeLabel);
  }

  timeEnd(_label: string = this.timeLabel) {
    if (!this.showLog('info')) return;
    console.timeEnd(_label);
  }

  error(...args: any[]) {
    if (!this.showLog('error')) return;

    console.group(`%cERROR ${this.getLabelText()}`, 'color:red');
    args.forEach((logIt) => {
      console.error(logIt);
    });
    console.groupEnd();
  }

  table(...args: any[]) {
    if (!this.showLog('info')) return;
    console.group(`%cINFO ${this.getLabelText()}`, 'color:yellow');
    args.forEach((logIt) => {
      console.table(logIt);
    });
    console.groupEnd();
  }

  warn(...args: any[]) {
    if (!this.showLog('warn')) return;

    console.group(`%cWARN ${this.getLabelText()}`, 'color:orange');
    args.forEach((logIt) => {
      console.warn(logIt);
    });
    console.groupEnd();
  }

  trace(_message: any = undefined, _options: any = undefined) {
    if (!this.showLog('trace')) return;

    console.group(`%cTRACE ${this.getLabelText()}`, 'color:blue');
    if (_message)
      if (_options) console.trace(_message, _options);
      else console.trace(_message);
    else console.trace();
    console.groupEnd();
  }

  raw(...args: any[]) {
    if (!this.showLog('info')) return;

    console.log(...args);
  }

  info(...args: any[]) {
    if (!this.showLog('info')) return;

    console.group(`%cINFO ${this.getLabelText()}`, 'color:yellow');
    args.forEach((logIt) => {
      console.log(logIt);
    });
    console.groupEnd();
  }

  print(...args: any[]) {
    if (!this.showLog('all')) return;

    console.group(`%cLOG ${this.getLabelText()}`, 'color:lightblue');
    args.forEach((logIt) => {
      console.log(logIt);
    });
    console.groupEnd();
  }

  log(...args: any[]) {
    if (!this.showLog('all')) return;

    console.group(`%cLOG ${this.getLabelText()}`, 'color:lightblue');
    console.log(...args);
    console.groupEnd();
  }

  getLabelText(): string {
    return `${this.labelText}`;
  }

  label(_label: string) {
    this.labelText = _label;
  }
}

export default Logger;
