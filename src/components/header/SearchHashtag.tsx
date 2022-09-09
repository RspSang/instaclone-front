import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";

interface SearchHashtagProps {
  hashtag?: string | null;
  totalPhotos?: number | null;
}

const SearchHashtagInfo = styled.div`
  h2 {
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 5px;
  }
  h3 {
    font-size: 15px;
  }
`;

const HashtagIcon = styled.div`
  width: 47px;
  height: 47px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  margin-right: 13px;
`;

const SearchHashtag = ({ hashtag, totalPhotos }: SearchHashtagProps) => {
  return (
    <Link to={`/hashtags/${hashtag?.replaceAll("#", "")}`}>
      <HashtagIcon>
        <FontAwesomeIcon icon={faHashtag} />
      </HashtagIcon>
      <SearchHashtagInfo>
        <h2>{hashtag}</h2>
        <h3>投稿 {totalPhotos} 件</h3>
      </SearchHashtagInfo>
    </Link>
  );
};

export default SearchHashtag;
