// TODO: Borrar
// import { PostListView } from 'src/sections/blog/view';
import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/global-config';

const metadata = { title: `Post list | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      {/* <PostListView /> */}
    </>
  );
}
