type MsgType =
  | string
  | Record<string, string>
  | Array<Record<string, string>>;

export class ResponseVo<Data> {
  error?: string;
  msg?: MsgType;
  data?: Data;

  public static success<Data>(data: Data): ResponseVo<Data> {
    const responseVo = new ResponseVo<Data>();
    responseVo.msg = 'success';
    responseVo.data = data;

    return responseVo;
  }

  public static error(error: string, msg: MsgType): ResponseVo<null> {
    const responseVo = new ResponseVo<null>();
    responseVo.error = error;
    responseVo.msg = msg;

    return responseVo;
  }
}
