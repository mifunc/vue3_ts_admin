export enum ResultEnum{
    SUCCESS=0,
    ERROR=-1,
    ONAUTH=401,
    TIMEOUT=999
}

export enum ContentTypeEnum{
    JSON="application/json;charset=UTF-8",
    TEXT="text/plain;charset=UTF-8",
    FORM_URLENCODED="application/x-www-form-urlencoded;charset=UTF-8",
    FORM_DATA="multipart/form-data;charset=UTF-8",
    ARRAY_BUFFER="arraybuffer"
}