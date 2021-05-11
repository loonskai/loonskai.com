type Props = {
  tag: string
}

export const Tag = ({ tag }: Props): JSX.Element => (
  <span className="bg-skin-base rounded-md p-1 mr-0.5">{tag}</span>
);
