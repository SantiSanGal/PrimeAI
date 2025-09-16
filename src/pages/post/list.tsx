// TODO: Borrar
// import { PostListHomeView } from 'src/sections/blog/view';
// import { useGetPosts } from 'src/actions/blog';
import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/global-config';

const metadata = { title: `Post list - ${CONFIG.appName}` };

export default function Page() {
  // const { posts, postsLoading } = useGetPosts();

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      {/* <PostListHomeView posts={posts} loading={postsLoading} /> */}
    </>
  );
}
