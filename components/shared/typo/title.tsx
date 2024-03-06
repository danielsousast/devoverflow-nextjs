interface Props {
  children: string;
}

export function Title({ children }: Props) {
  return <h1 className="h1-bold text-dark100_light900">{children}</h1>;
}
