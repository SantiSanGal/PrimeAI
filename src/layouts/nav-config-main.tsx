import type { NavMainProps } from './main/nav/types';
import { Iconify } from 'src/components/iconify';
import { CONFIG } from 'src/global-config';
import { paths } from 'src/routes/paths';

export const navData: NavMainProps['data'] = [
  {
    title: 'Pages',
    path: '/pages',
    icon: <Iconify width={22} icon="solar:file-bold-duotone" />,
    children: [
      {
        subheader: 'Error',
        items: [
          { title: 'Page 403', path: paths.page403 },
          { title: 'Page 404', path: paths.page404 },
          { title: 'Page 500', path: paths.page500 },
        ],
      },
      { subheader: 'Dashboard', items: [{ title: 'Dashboard', path: CONFIG.auth.redirectPath }] },
    ],
  },
];
