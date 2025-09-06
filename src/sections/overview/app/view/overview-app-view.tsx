import { _appAuthors, _appRelated, _appFeatured, _appInvoices, _appInstalled } from 'src/_mock';
import { AppTopInstalledCountries } from '../app-top-installed-countries';
import { AppCurrentDownload } from '../app-current-download';
import { svgColorClasses } from 'src/components/svg-color';
import { DashboardContent } from 'src/layouts/dashboard';
import { AppAreaInstalled } from '../app-area-installed';
import { AppWidgetSummary } from '../app-widget-summary';
import { AppTopAuthors } from '../app-top-authors';
import { AppNewInvoice } from '../app-new-invoice';
import { AppTopRelated } from '../app-top-related';
import { useTheme } from '@mui/material/styles';
import { useMockedUser } from 'src/auth/hooks';
import { AppWidget } from '../app-widget';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';

// ----------------------------------------------------------------------

export function OverviewAppView() {
  const { user } = useMockedUser();

  const theme = useTheme();

  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <AppWidgetSummary
            title="Sales"
            percent={2.6}
            total={18765}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [15, 18, 12, 51, 68, 11, 39, 37],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <AppWidgetSummary
            title="New Customers"
            percent={0.2}
            total={4876}
            chart={{
              colors: [theme.palette.info.main],
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [20, 41, 63, 33, 28, 35, 50, 46],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <AppWidgetSummary
            title="Cart Abandonment Rate"
            percent={-0.1}
            total={678}
            chart={{
              colors: [theme.palette.error.main],
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [18, 19, 31, 8, 16, 37, 12, 33],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AppCurrentDownload
            title="Sales by Channel"
            subheader="Share of sales via WhatsApp, Instagram, Facebook & Telegram"
            chart={{
              series: [
                { label: 'WhatsApp', value: 12244 },
                { label: 'Instagram', value: 53345 },
                { label: 'Facebook', value: 44313 },
                { label: 'Telegram', value: 78343 },
              ],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AppAreaInstalled
            title="Sales by Channel"
            subheader="Monthly totals — +43% YoY"
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              series: [
                {
                  name: '2025',
                  data: [
                    { name: 'WhatsApp', data: [12, 10, 18, 22, 20, 12, 8, 21, 20, 14, 15, 16] },
                    { name: 'Instagram', data: [8, 7, 12, 15, 13, 9, 6, 14, 12, 10, 9, 11] },
                    { name: 'Facebook', data: [5, 6, 7, 8, 6, 5, 4, 7, 6, 5, 6, 6] },
                    { name: 'Telegram', data: [3, 4, 5, 6, 5, 4, 3, 6, 5, 4, 4, 5] },
                  ],
                },
                {
                  name: '2024',
                  data: [
                    { name: 'WhatsApp', data: [6, 18, 14, 9, 20, 6, 22, 19, 8, 22, 8, 17] },
                    { name: 'Instagram', data: [4, 10, 9, 8, 12, 7, 11, 10, 6, 12, 6, 9] },
                    { name: 'Facebook', data: [3, 6, 5, 4, 6, 4, 7, 6, 4, 6, 5, 6] },
                    { name: 'Telegram', data: [2, 3, 4, 3, 5, 3, 4, 3, 2, 4, 3, 4] },
                  ],
                },
                {
                  name: '2023',
                  data: [
                    { name: 'WhatsApp', data: [6, 20, 15, 18, 7, 24, 6, 10, 12, 17, 18, 10] },
                    { name: 'Instagram', data: [5, 12, 10, 11, 6, 13, 5, 8, 9, 12, 11, 8] },
                    { name: 'Facebook', data: [4, 7, 6, 7, 4, 8, 4, 5, 6, 8, 7, 5] },
                    { name: 'Telegram', data: [2, 4, 3, 4, 3, 5, 2, 3, 3, 4, 4, 3] },
                  ],
                },
              ],
            }}
          />

        </Grid>

        <Grid size={{ xs: 12, lg: 8 }}>
          <AppNewInvoice
            title="New invoice"
            tableData={_appInvoices}
            headCells={[
              { id: 'id', label: 'Invoice ID' },
              { id: 'category', label: 'Category' },
              { id: 'price', label: 'Price' },
              { id: 'status', label: 'Status' },
              { id: '' },
            ]}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AppTopRelated title="Related applications" list={_appRelated} />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AppTopInstalledCountries title="Top installed countries" list={_appInstalled} />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AppTopAuthors title="Top authors" list={_appAuthors} />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
            <AppWidget
              title="Conversion"
              total={38566}
              icon="solar:user-rounded-bold"
              chart={{ series: 48 }}
            />

            <AppWidget
              title="Applications"
              total={55566}
              icon="fluent:mail-24-filled"
              chart={{
                series: 75,
                colors: [theme.vars.palette.info.light, theme.vars.palette.info.main],
              }}
              sx={{ bgcolor: 'info.dark', [`& .${svgColorClasses.root}`]: { color: 'info.light' } }}
            />
          </Box>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
