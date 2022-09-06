import { useCallback, useEffect } from "react";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";
import { useSeeFeedQuery } from "../generated/graphql";

function Home() {
  const { data, fetchMore } = useSeeFeedQuery({ variables: { offset: 0 } });

  const handleScroll = useCallback(async (): Promise<void> => {
    const scrollTop: number = document.documentElement.scrollTop;
    const innerHeight: number = window.innerHeight;
    const scrollHeight: number = document.body.scrollHeight;

    if (scrollTop + innerHeight >= scrollHeight) {
      await fetchMore({
        variables: { offset: data?.seeFeed?.length },
      });
    }
  }, [fetchMore, data?.seeFeed?.length]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

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
