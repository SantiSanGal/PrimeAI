import { BrandsListView } from '@/sections/product/view/product-brands-list-view';
import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/global-config';

const metadata = { title: `Product shop - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title} - Brands</title>
      </Helmet>

      <BrandsListView />
    </>
  );
}