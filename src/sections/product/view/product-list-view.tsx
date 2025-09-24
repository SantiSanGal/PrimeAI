import { useState, useEffect, forwardRef, useCallback, useMemo } from 'react';
import { ProductTableFiltersResult } from '../product-table-filters-result';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { useBoolean, useSetState } from 'minimal-shared/hooks';
import { ProductTableToolbar } from '../product-table-toolbar';
import type { IProductTableFilters } from 'src/types/product';
import type { UseSetStateReturn } from 'minimal-shared/hooks';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { EmptyContent } from 'src/components/empty-content';
import type { Theme, SxProps } from '@mui/material/styles';
import { DashboardContent } from 'src/layouts/dashboard';
import ListItemIcon from '@mui/material/ListItemIcon';
import { RouterLink } from 'src/routes/components';
import { PRODUCT_STOCK_OPTIONS } from 'src/_mock';
import { Iconify } from 'src/components/iconify';
import { toast } from 'src/components/snackbar';
import { useItems } from 'src/hooks/useItems';
import MenuItem from '@mui/material/MenuItem';
import { paths } from 'src/routes/paths';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import { columns } from '../columns';
import Box from '@mui/material/Box';
import {
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
  GridToolbarContainer,
  GridToolbarExport,
  gridClasses,
  DataGrid,
} from '@mui/x-data-grid';
import type {
  GridColumnVisibilityModel,
  GridActionsCellItemProps,
  GridRowSelectionModel,
  GridSlotProps,
} from '@mui/x-data-grid';

import { mapItemsToRows, type ProductRow } from '../adapter';

const HIDE_COLUMNS = { category: false };
const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

export function ProductListView() {
  // ✅ Solo backend
  const { data, isLoading } = useItems();
  const confirmDialog = useBoolean();

  // Mapeamos la respuesta del backend a filas planas para el DataGrid
  const rowsFromApi = useMemo(() => mapItemsToRows(data), [data]);

  const [tableData, setTableData] = useState<ProductRow[]>(rowsFromApi);
  const [selectedRowIds, setSelectedRowIds] = useState<GridRowSelectionModel>([]);
  const [filterButtonEl, setFilterButtonEl] = useState<HTMLButtonElement | null>(null);

  const filters = useSetState<IProductTableFilters>({ publish: [], stock: [] });
  const { state: currentFilters } = filters;

  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>(HIDE_COLUMNS);

  // Cuando llega nueva data del backend, refrescamos la tabla
  useEffect(() => {
    setTableData(rowsFromApi);
    setSelectedRowIds([]);
  }, [rowsFromApi]);

  const canReset = currentFilters.publish.length > 0 || currentFilters.stock.length > 0;

  // Aplica los filtros del toolbar sobre los datos actuales de la tabla
  const dataFiltered = applyFilter({ inputData: tableData, filters: currentFilters });

  const handleDeleteRows = useCallback(() => {
    if (!selectedRowIds.length) return;

    const idSet = new Set(selectedRowIds as string[]);
    const deleteRows = tableData.filter((row) => !idSet.has(row.id));

    toast.success('Delete success!');

    setTableData(deleteRows);
  }, [selectedRowIds, tableData]);

  const CustomToolbarCallback = useCallback(
    () => (
      <CustomToolbar
        filters={filters}
        canReset={canReset}
        selectedRowIds={selectedRowIds}
        setFilterButtonEl={setFilterButtonEl}
        filteredResults={dataFiltered.length}
        onOpenConfirmDeleteRows={confirmDialog.onTrue}
      />
    ),
    [currentFilters, selectedRowIds, dataFiltered.length, confirmDialog.onTrue]
  );

  const getTogglableColumns = () =>
    columns
      .filter((column) => !HIDE_COLUMNS_TOGGLABLE.includes(column.field))
      .map((column) => column.field);

  const renderConfirmDialog = () => (
    <ConfirmDialog
      open={confirmDialog.value}
      onClose={confirmDialog.onFalse}
      title="Delete"
      content={
        <>
          Are you sure want to delete <strong> {selectedRowIds.length} </strong> items?
        </>
      }
      action={
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            handleDeleteRows();
            confirmDialog.onFalse();
          }}
        >
          Delete
        </Button>
      }
    />
  );

  return (
    <>
      <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <CustomBreadcrumbs
          heading="List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Product', href: paths.dashboard.product.root },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.product.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New product
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card
          sx={{
            minHeight: 640,
            flexGrow: { md: 1 },
            display: { md: 'flex' },
            height: { xs: 800, md: '1px' },
            flexDirection: { md: 'column' },
          }}
        >
          <DataGrid
            checkboxSelection
            disableRowSelectionOnClick
            rows={dataFiltered}
            columns={columns}
            loading={isLoading}
            getRowHeight={() => 'auto'}
            pageSizeOptions={[5, 10, 20, { value: -1, label: 'All' }]}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            onRowSelectionModelChange={(newSelectionModel) => setSelectedRowIds(newSelectionModel)}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
            slots={{
              toolbar: CustomToolbarCallback,
              noRowsOverlay: () => <EmptyContent />,
              noResultsOverlay: () => <EmptyContent title="No results found" />,
            }}
            slotProps={{
              toolbar: { setFilterButtonEl },
              panel: { anchorEl: filterButtonEl },
              columnsManagement: { getTogglableColumns },
            }}
            sx={{ [`& .${gridClasses.cell}`]: { alignItems: 'center', display: 'inline-flex' } }}
          />
        </Card>
      </DashboardContent>

      {renderConfirmDialog()}
    </>
  );
}

// ----------------------------------------------------------------------

declare module '@mui/x-data-grid' {
  interface ToolbarPropsOverrides {
    setFilterButtonEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
  }
}

type CustomToolbarProps = GridSlotProps['toolbar'] & {
  canReset: boolean;
  filteredResults: number;
  selectedRowIds: GridRowSelectionModel;
  filters: UseSetStateReturn<IProductTableFilters>;

  onOpenConfirmDeleteRows: () => void;
};

function CustomToolbar({
  filters,
  canReset,
  selectedRowIds,
  filteredResults,
  setFilterButtonEl,
  onOpenConfirmDeleteRows,
}: CustomToolbarProps) {
  return (
    <>
      <GridToolbarContainer>
        <ProductTableToolbar
          filters={filters}
          options={{
            stocks: PRODUCT_STOCK_OPTIONS,
          }}
        />

        <GridToolbarQuickFilter />

        <Box
          sx={{
            gap: 1,
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          {!!selectedRowIds.length && (
            <Button
              size="small"
              color="error"
              startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
              onClick={onOpenConfirmDeleteRows}
            >
              Delete ({selectedRowIds.length})
            </Button>
          )}

          <GridToolbarColumnsButton />
          <GridToolbarFilterButton ref={setFilterButtonEl} />
          <GridToolbarExport />
        </Box>
      </GridToolbarContainer>

      {canReset && (
        <ProductTableFiltersResult
          filters={filters}
          totalResults={filteredResults}
          sx={{ p: 2.5, pt: 0 }}
        />
      )}
    </>
  );
}

// ----------------------------------------------------------------------

type GridActionsLinkItemProps = Pick<GridActionsCellItemProps, 'icon' | 'label' | 'showInMenu'> & {
  href: string;
  sx?: SxProps<Theme>;
};

export const GridActionsLinkItem = forwardRef<HTMLLIElement, GridActionsLinkItemProps>(
  (props, ref) => {
    const { href, label, icon, sx } = props;

    return (
      <MenuItem ref={ref} sx={sx}>
        <Link
          component={RouterLink}
          href={href}
          underline="none"
          color="inherit"
          sx={{ width: 1, display: 'flex', alignItems: 'center' }}
        >
          {icon && <ListItemIcon>{icon}</ListItemIcon>}
          {label}
        </Link>
      </MenuItem>
    );
  }
);

// ----------------------------------------------------------------------
// Ajustamos applyFilter para tu tipo de fila del backend

type ApplyFilterProps = {
  inputData: ProductRow[];
  filters: IProductTableFilters;
};

function applyFilter({ inputData, filters }: ApplyFilterProps) {
  const { stock, publish } = filters;

  let data = inputData;

  if (stock.length) {
    data = data.filter(
      (product) => !!product.inventoryType && stock.includes(product.inventoryType)
    );
  }

  if (publish.length) {
    data = data.filter((product) => !!product.publish && publish.includes(product.publish));
  }

  return data;
}
