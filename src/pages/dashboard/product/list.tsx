// import { ProductListView } from 'src/sections/product/view';
import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/global-config';
import { useItems } from 'src/hooks/useItems';

const metadata = { title: `Product list | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  const { data } = useItems();

  console.log('data', data)

  return (
    <>
      <Helmet>
        <title> {metadata.title} </title>
      </Helmet>

      {/* <ProductListView /> */}
    </>
  );
}
