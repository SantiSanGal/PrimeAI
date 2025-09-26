import { ProductListView } from '@/sections/product/view';
import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/global-config';

const metadata = { title: `Product shop - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title} - Brands</title>
      </Helmet>

      <ProductListView />
    </>
  );
}
