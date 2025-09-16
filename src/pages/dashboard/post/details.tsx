// TODO: Borrar
// import { PostDetailsView } from 'src/sections/blog/view';
// import { useGetPost } from 'src/actions/blog';
// import { useParams } from 'src/routes/hooks';
import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/global-config';

const metadata = { title: `Post details | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  // const { title = '' } = useParams();

  // const { post, postLoading, postError } = useGetPost(title);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      {/* <PostDetailsView post={post} loading={postLoading} error={postError} /> */}
    </>
  );
}
