import { useState, useEffect, forwardRef, useCallback, useMemo } from 'react';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { useBoolean } from 'minimal-shared/hooks';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { EmptyContent } from 'src/components/empty-content';
import type { Theme, SxProps } from '@mui/material/styles';
import { DashboardContent } from 'src/layouts/dashboard';
import ListItemIcon from '@mui/material/ListItemIcon';
import { RouterLink } from 'src/routes/components';
import { Iconify } from 'src/components/iconify';
import { toast } from 'src/components/snackbar';
import MenuItem from '@mui/material/MenuItem';
import { paths } from 'src/routes/paths';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import LoadingButton from '@mui/lab/LoadingButton';

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

import { useBrands, useCreateBrand } from '@/hooks/useBrands';
import { brandsColumns } from '../brands-columns';

const HIDE_COLUMNS: GridColumnVisibilityModel = {};
const HIDE_COLUMNS_TOGGLABLE: string[] = [];

export function BrandsListView() {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const { 
    data: brandsData, 
    isFetching,
  } = useBrands({
    page: paginationModel.page,
    size: paginationModel.pageSize,
  });

  //Para evitar bucle de reinicio de paginacion
  const [rowCount, setRowCount] = useState(0);

  useEffect(() => {
    setRowCount((prevRowCount) =>
      brandsData?.page?.page?.totalElements !== undefined
        ? brandsData.page.page.totalElements
        : prevRowCount
    );
  }, [brandsData]);

  const addBrandModal = useBoolean();
  const { mutate: createBrand, isPending: isCreating } = useCreateBrand();
  const [newBrandName, setNewBrandName] = useState('');

  const confirmDialog = useBoolean();

 const rowsFromApi = useMemo(() => brandsData?.page?.content ?? [], [brandsData]);

  const [selectedRowIds, setSelectedRowIds] = useState<GridRowSelectionModel>([]);
  const [filterButtonEl, setFilterButtonEl] = useState<HTMLButtonElement | null>(null);
  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>(HIDE_COLUMNS);

  const handleCreateBrand = useCallback(async () => {
    if (!newBrandName.trim()) {
      toast.error('Brand name is required');
      return;
    }

    createBrand(
      { name: newBrandName },
      {
        onSuccess: () => {
          addBrandModal.onFalse();
          setNewBrandName('');
        },
      }
    );
  }, [newBrandName, createBrand, addBrandModal]);

  const handleDeleteRows = useCallback(() => {

  }, []);

  const CustomToolbarCallback = useCallback(
    () => (
      <CustomToolbar
        selectedRowIds={selectedRowIds}
        setFilterButtonEl={setFilterButtonEl}
        onOpenConfirmDeleteRows={confirmDialog.onTrue}
      />
    ),
    [selectedRowIds, confirmDialog.onTrue]
  );

  const getTogglableColumns = () =>
    brandsColumns
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
          heading="Brands"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Product', href: paths.dashboard.product.root },
            { name: 'Brands' },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={addBrandModal.onTrue}
            >
              Add Brand
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
            paginationMode="server"
            rowCount={rowCount}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            
            checkboxSelection
            disableRowSelectionOnClick
            rows={rowsFromApi}
            columns={brandsColumns}
            loading={isFetching}
            getRowHeight={() => 'auto'}
            pageSizeOptions={[5, 10, 20]}
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

      <Dialog
        open={addBrandModal.value}
        onClose={addBrandModal.onFalse}
        PaperProps={{
          component: 'form',
          onSubmit: (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            handleCreateBrand();
          },
        }}
      >
        <DialogTitle>New Brand</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            variant="outlined"
            name="name"
            label="Brand Name"
            value={newBrandName}
            onChange={(e) => setNewBrandName(e.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={addBrandModal.onFalse}>
            Cancel
          </Button>
          <LoadingButton type="submit" variant="contained" loading={isCreating}>
            Create
          </LoadingButton>
        </DialogActions>
      </Dialog>
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
  selectedRowIds: GridRowSelectionModel;
  onOpenConfirmDeleteRows: () => void;
};

function CustomToolbar({
  selectedRowIds,
  setFilterButtonEl,
  onOpenConfirmDeleteRows,
}: CustomToolbarProps) {
  return (
    <>
      <GridToolbarContainer>
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