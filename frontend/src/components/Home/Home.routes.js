import Alerts from './../Alerts/Alerts';
import Agents from '../Agents/Agents';
import Rules from '../Rules/Rules';
import Chart from './../Chart/Chart';

const HOME_ROUTES = [
    {
      label: 'Alerts',
      component: Alerts,
      href: '/alerts',
    },
    {
      label: 'Agents',
      component: Agents,
      href: '/agents',
    },
    {
        label: 'Rules',
        component: Rules,
        href: '/rules',
    },
    {
      label: 'Dashboard',
      component: Chart,
      href: '/dashboard',
  }
]

export default HOME_ROUTES;
