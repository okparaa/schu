export type ParamsProps = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
  params: Promise<{ [key: string]: string | undefined }>;
};

export type Writeable<T> = { -readonly [P in keyof T]: T[P] };
