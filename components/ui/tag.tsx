type Props = {
  tag: string
}

export const Tag = ({ tag }: Props): JSX.Element => (
  <span className="border-main border-2 border-solid p-1 mr-0.5 rounded-sm">{tag}</span>
);
