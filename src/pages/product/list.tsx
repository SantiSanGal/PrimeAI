import { ProductShopView } from 'src/sections/product/view';
import { useGetProducts } from 'src/actions/product';
import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/global-config';

const metadata = { title: `Product shop - ${CONFIG.appName}` };

export default function Page() {
  const { products, productsLoading } = useGetProducts();

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ProductShopView products={products} loading={productsLoading} />
    </>
  );
}
