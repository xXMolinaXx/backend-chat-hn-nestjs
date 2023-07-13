export interface answerPeticionsInterface {
  statusCode: number;
  message: string;
  data?: any;
}
export interface userLoginInterface {
  userName: string;
  password: string;
}

export interface answerEndPoint {
  success: boolean;
  message: string;
  data?: any;
}
