import { CategoriesListView } from '@/sections/product/view/product-categories-list-view';
import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/global-config';

const metadata = { title: `Product shop - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title} - Categories</title>
      </Helmet>

      <CategoriesListView />
    </>
  );
}
