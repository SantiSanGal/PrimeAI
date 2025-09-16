// TODO: Borrar
// import { PostEditView } from 'src/sections/blog/view';
// import { useGetPost } from 'src/actions/blog';
// import { useParams } from 'src/routes/hooks';
import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/global-config';

const metadata = { title: `Post edit | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  // const { title = '' } = useParams();

  // const { post } = useGetPost(title);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      {/* <PostEditView post={post} /> */}
    </>
  );
}
