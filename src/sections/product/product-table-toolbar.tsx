import type { IProductTableFilters } from 'src/types/product';
import type { SelectChangeEvent } from '@mui/material/Select';
import type { UseSetStateReturn } from 'minimal-shared/hooks';
import { CustomPopover } from 'src/components/custom-popover';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { usePopover } from 'minimal-shared/hooks';
import { Iconify } from 'src/components/iconify';
import { varAlpha } from 'minimal-shared/utils';
import { useState, useCallback } from 'react';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';

type Props = {
  filters: UseSetStateReturn<IProductTableFilters>;
  options: {
    stocks: { value: string; label: string }[];
  };
};

export function ProductTableToolbar({ filters, options }: Props) {
  const menuActions = usePopover();

  const { state: currentFilters, setState: updateFilters } = filters;

  const [stock, setStock] = useState(currentFilters.stock);

  const handleChangeStock = useCallback((event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;

    setStock(typeof value === 'string' ? value.split(',') : value);
  }, []);

  const handleFilterStock = useCallback(() => {
    updateFilters({ stock });
  }, [updateFilters, stock]);

  const renderMenuActions = () => (
    <CustomPopover
      open={menuActions.open}
      anchorEl={menuActions.anchorEl}
      onClose={menuActions.onClose}
      slotProps={{ arrow: { placement: 'right-top' } }}
    >
      <MenuList>
        <MenuItem onClick={() => menuActions.onClose()}>
          <Iconify icon="solar:printer-minimalistic-bold" />
          Print
        </MenuItem>

        <MenuItem onClick={() => menuActions.onClose()}>
          <Iconify icon="solar:import-bold" />
          Import
        </MenuItem>

        <MenuItem onClick={() => menuActions.onClose()}>
          <Iconify icon="solar:export-bold" />
          Export
        </MenuItem>
      </MenuList>
    </CustomPopover>
  );

  return (
    <>
      <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 200 } }}>
        <InputLabel htmlFor="filter-stock-select">Stock</InputLabel>

        <Select
          multiple
          value={stock}
          onChange={handleChangeStock}
          onClose={handleFilterStock}
          input={<OutlinedInput label="Stock" />}
          renderValue={(selected) => selected.map((value) => value).join(', ')}
          inputProps={{ id: 'filter-stock-select' }}
          sx={{ textTransform: 'capitalize' }}
        >
          {options.stocks.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <Checkbox disableRipple size="small" checked={stock.includes(option.value)} />
              {option.label}
            </MenuItem>
          ))}
          <MenuItem
            onClick={handleFilterStock}
            sx={[
              (theme) => ({
                justifyContent: 'center',
                fontWeight: theme.typography.button,
                bgcolor: varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
                border: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.16)}`,
              }),
            ]}
          >
            Apply
          </MenuItem>
        </Select>
      </FormControl>

      {renderMenuActions()}
    </>
  );
}
