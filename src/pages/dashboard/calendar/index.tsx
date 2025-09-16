import { CalendarView } from 'src/sections/calendar/view';
import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/global-config';

const metadata = { title: `Calendar | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <CalendarView />
    </>
  );
}
