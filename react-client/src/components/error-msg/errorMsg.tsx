type Props = {
  errorMsg: string | null;
};

export const ErrorMSG = ({ errorMsg }: Props) => {
  return errorMsg && <p className="text-sm text-red-500">{errorMsg}</p>;
};
