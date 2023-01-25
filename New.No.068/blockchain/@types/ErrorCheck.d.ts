declare type TError<R> = {
  isError: true;
  msg: R;
};
// <R> || <T> << 타입을 가져다 사용(호출)할 때 어떤 타입인지 받겠다. 제네릭(Generics)
//   타입에서의 매개변수?

declare type TResult<T> = {
  isError: false;
  value: T;
};
