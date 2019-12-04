import { ErrorHandler } from '@angular/core';

export class AppErrorHandler implements ErrorHandler {
  handleError(e) {
    // alert(' an unexpected error occured!');
    console.log(e);
  }
} 