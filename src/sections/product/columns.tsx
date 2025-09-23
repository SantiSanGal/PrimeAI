// columns.tsx
import { RenderCellCreatedAt, RenderCellPrice, RenderCellProduct } from './product-table-row';
import type { GridColDef } from '@mui/x-data-grid';
import { paths } from 'src/routes/paths';

export const columns: GridColDef[] = [
    {
        field: 'name',
        headerName: 'Product',
        flex: 1,
        minWidth: 360,
        hideable: false,
        renderCell: (params) => (
            <RenderCellProduct params={params} href={paths.dashboard.product.details(params.row.id)} />
        ),
    },
    {
        field: 'description',
        headerName: 'Description',
        flex: 1,
        minWidth: 300,
        // si quieres truncar, puedes usar valueGetter + valueFormatter o un renderCell simple
    },
    {
        field: 'createdAt',
        headerName: 'Created at',
        width: 180,
        renderCell: (params) => <RenderCellCreatedAt params={params} />,
    },
    {
        field: 'quantity',
        headerName: 'Quantity',
        width: 120,
        type: 'number',
    },
    {
        field: 'sellPrice',
        headerName: 'Sell price',
        width: 140,
        renderCell: (params) => <RenderCellPrice params={params} />,
    },
    // Puedes dejar acciones si quieres:
    // { ...acciones }
];
