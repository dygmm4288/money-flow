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
