class ApiResponse{
   statusCode: string | number;
   message: string;
   data: any;
   success: boolean;
   constructor(statusCode:number, data:any, message:any="Success"){
      this.statusCode = statusCode;
      this.message = message;
      this.data = data;
      this.success = statusCode<400
   }
}

export {ApiResponse}