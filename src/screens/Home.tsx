import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";
import { useSeeFeedQuery } from "../generated/graphql";

function Home() {
  const { data } = useSeeFeedQuery({ variables: { offset: 1 } });
  return (
    <div>
      <PageTitle title="Home" />
      {data?.seeFeed?.map((photo) => (
        <Photo key={photo?.id} {...photo} />
      ))}
    </div>
  );
}
export default Home;
