import { ProductListView } from 'src/sections/product/view';
import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/global-config';

const metadata = { title: `Product list | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title} </title>
      </Helmet>

      <ProductListView />
    </>
  );
}
