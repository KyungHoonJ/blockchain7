declare type TError<R> = {
  isError: true;
  msg: R;
};
// <R> || <T> << 타입을 가져다 사용(호출)할 때 어떤 타입인지 받겠다. 제네릭(Generics)
//   타입에서의 매개변수?

declare type TValue<T> = {
  isError: false;
  value: T;
};

declare type TResult<T, R> = TValue<T> | TError<R>;
// 두 결과를 하나로 합친다.
// TValue<T> 또는 TError<R>이 나오는 type을 설정한다.
