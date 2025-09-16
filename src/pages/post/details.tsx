// TODO: Borrar
// import { useGetPost, useGetLatestPosts } from 'src/actions/blog';
// import { PostDetailsHomeView } from 'src/sections/blog/view';
// import { useParams } from 'src/routes/hooks';
import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/global-config';

const metadata = { title: `Post details - ${CONFIG.appName}` };

export default function Page() {
  // const { title = '' } = useParams();

  // const { post, postLoading, postError } = useGetPost(title);

  // const { latestPosts } = useGetLatestPosts(title);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      {/* <PostDetailsHomeView
        post={post}
        latestPosts={latestPosts}
        loading={postLoading}
        error={postError}
      /> */}
    </>
  );
}
