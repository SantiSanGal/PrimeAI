import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { ProductNewEditForm } from '../product-new-edit-form';
import { DashboardContent } from 'src/layouts/dashboard';
import type { IProductItem } from 'src/types/product';
import { paths } from 'src/routes/paths';

type Props = {
  product?: IProductItem;
};

export function ProductEditView({ product }: Props) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Edit"
        backHref={paths.dashboard.product.root}
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Product', href: paths.dashboard.product.root },
          { name: product?.name },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <ProductNewEditForm currentProduct={product} />
    </DashboardContent>
  );
}
