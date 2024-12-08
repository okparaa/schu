export const createQStr = (
  searchParams: URLSearchParams,
  name?: string,
  value?: string
) => {
  const params = new URLSearchParams(searchParams.toString());
  if (name && value) {
    params.set(name, value);
  }
  return params.toString();
};
