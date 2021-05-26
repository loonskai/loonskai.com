import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { Tag } from './ui/tag';
import { PostType } from '../components/post';
import BookIcon from '../public/assets/icons/book.svg';

type Props = {
  post: PostType;
}

const StyledDetailsStatement = styled.span`
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  font-style: italic;
  margin-right: 1rem;
`;

export const PostPreviewPublicationInfo = ({ post }: Props): JSX.Element => {
  const theme = useTheme();

  return (
    <div
      css={css`
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin-bottom: 0.25rem;
      `}
    >
      <StyledDetailsStatement>{dayjs(post.date).format('MMMM D, YYYY')}</StyledDetailsStatement>
      <StyledDetailsStatement>
        <BookIcon
          css={css`
            width: 1.4rem;
            height: 1.4rem;
            fill: ${theme.text.primary};
            margin-right: 0.2rem;
            transition: all ease 0.3s;
          `}
        />
        {post.estimated} read
      </StyledDetailsStatement>
      <div
        css={css`
          width: 100%;
          margin: 0.5rem 0;
        `}
      >
        <StyledDetailsStatement>
          Tags: {post.keywords.map((keyword, idx) => <Tag key={idx} tag={keyword} />)}
        </StyledDetailsStatement>
      </div>
    </div>
  );
};
