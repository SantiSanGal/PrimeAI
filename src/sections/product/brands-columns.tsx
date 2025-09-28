import { GridActionsCellItem, type GridColDef } from '@mui/x-data-grid';
import { fDate, fTime } from 'src/utils/format-time';
import { Iconify } from '@/components/iconify';
import { GridActionsLinkItem } from './view';
import { Label } from 'src/components/label';
import Stack from '@mui/material/Stack';
import { paths } from '@/routes/paths';
import Box from '@mui/material/Box';

export type BrandRow = {
    id: string;
    name: string;
    enabled: boolean;
    createdAt: string;
    updatedAt: string;
};

const RenderCellDateTime = ({ value }: { value: string }) => (
    <Stack spacing={0.5}>
        <Box component="span">{fDate(value)}</Box>
        <Box component="span" sx={{ typography: 'caption', color: 'text.secondary' }}>
            {fTime(value)}
        </Box>
    </Stack>
);

const handleDeleteRow = () => { }

export const brandsColumns: GridColDef[] = [
    {
        field: 'name',
        headerName: 'Name',
        flex: 1,
        minWidth: 260,
    },
    {
        field: 'enabled',
        headerName: 'Enabled',
        width: 130,
        type: 'boolean',
        renderCell: (params) => (
            <Label variant="soft" color={params.value ? 'success' : 'default'}>
                {params.value ? 'Enabled' : 'Disabled'}
            </Label>
        ),
    },
    {
        field: 'createdAt',
        headerName: 'Created at',
        width: 180,
        renderCell: (params) => <RenderCellDateTime value={params.value as string} />,
    },
    {
        field: 'updatedAt',
        headerName: 'Updated at',
        width: 180,
        renderCell: (params) => <RenderCellDateTime value={params.value as string} />,
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
            <GridActionsLinkItem
                showInMenu
                icon={<Iconify icon="solar:eye-bold" />}
                label="View"
                href={paths.dashboard.product.details(params.row.id)}
            />,
            <GridActionsLinkItem
                showInMenu
                icon={<Iconify icon="solar:pen-bold" />}
                label="Edit"
                href={paths.dashboard.product.edit(params.row.id)}
            />,
            <GridActionsCellItem
                showInMenu
                icon={<Iconify icon="solar:trash-bin-trash-bold" />}
                label="Delete"
                onClick={() => handleDeleteRow()}
                sx={{ color: 'error.main' }}
            />,
        ],
    },
];
