import { RenderCellCreatedAt, RenderCellPrice, RenderCellProduct, RenderCellPublish, RenderCellStock } from './product-table-row';
import { PRODUCT_STOCK_OPTIONS } from 'src/_mock';
import { Iconify } from 'src/components/iconify';
import { GridActionsLinkItem } from './view';
import { paths } from 'src/routes/paths';
import type {
    GridColDef,
} from '@mui/x-data-grid';
import {
    GridActionsCellItem,
} from '@mui/x-data-grid';

const handleDeleteRow = () => { }

export const columns: GridColDef[] = [
    { field: 'category', headerName: 'Category', filterable: false },
    {
        field: 'name',
        headerName: 'Product',
        flex: 1,
        minWidth: 360,
        hideable: false,
        renderCell: (params) => (
            <>
                aaa
            </>
            // <RenderCellProduct params={params} href={'paths.dashboard.product.details(params.row.id)'} />
        ),
    },
    {
        field: 'createdAt',
        headerName: 'Create at',
        width: 160,
        // renderCell: (params) => <RenderCellCreatedAt params={params} />,
        renderCell: (params) => <></>,
    },
    {
        field: 'inventoryType',
        headerName: 'Stock',
        width: 160,
        type: 'singleSelect',
        valueOptions: PRODUCT_STOCK_OPTIONS,
        // renderCell: (params) => <RenderCellStock params={params} />,
        renderCell: (params) => <></>,
    },
    {
        field: 'price',
        headerName: 'Price',
        width: 140,
        editable: true,
        // renderCell: (params) => <RenderCellPrice params={params} />,
        renderCell: (params) => <></>,
    },
    {
        type: 'actions',
        field: 'actions',
        headerName: ' ',
        align: 'right',
        headerAlign: 'right',
        width: 80,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        getActions: (params) => [
            <></>,
            <></>
            // <GridActionsLinkItem
            //     showInMenu
            //     icon={<Iconify icon="solar:eye-bold" />}
            //     label="View"
            //     href={paths.dashboard.product.details(params.row.id)}
            // />,
            // <GridActionsLinkItem
            //     showInMenu
            //     icon={<Iconify icon="solar:pen-bold" />}
            //     label="Edit"
            //     href={paths.dashboard.product.edit(params.row.id)}
            // />,
            // <GridActionsCellItem
            //     showInMenu
            //     icon={<Iconify icon="solar:trash-bin-trash-bold" />}
            //     label="Delete"
            //     onClick={() => { handleDeleteRow() }}
            //     sx={{ color: 'error.main' }}
            // />,
        ],
    },
];