import _ from "lodash";

export const checkInvalidSignUp = (
  email?: string,
  password?: string,
  passwordConfirm?: string,
) => {
  if (_.some([email, password, passwordConfirm], _.isNil))
    return "모든 내용을 작성하세요";
  if (password !== passwordConfirm) return "비밀번호가 일치하지 않습니다.";
  return "";
};

export const convertError = (error: string) => {
  if (error === "email_address_invalid")
    return "이메일 주소가 올바르지 않습니다.";
  if (error === "email_address_not_authorized")
    return "이메일 주소가 인증되지 않았습니다. 이메일을 메일함을 확인해 주세요";
  if (error === "email_exists") return "이메일 주소가 이미 존재합니다.";
  return "올바르지 않은 정보입니다";
};
