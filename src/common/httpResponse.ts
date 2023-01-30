export class HttpResponse {
    success: boolean;
    message: string;
    statusCode:number;
    data: {};
  
    constructor(httpresponse: {
      success?: boolean;
      message?: string;
      data?: {};
      statusCode?:number;
    }) {
      this.success = httpresponse.success || false;
      this.message = httpresponse.message || 'ok';
      this.data = httpresponse.data || {};
      this.statusCode = httpresponse.statusCode || 200;
    }
  }
  