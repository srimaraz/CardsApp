import {HomeStack} from '@navigation/Stacks/HomeStack';
import {DebitCardStack} from '@navigation/Stacks/DebitCardStack';
import {PaymentsStack} from '@navigation/Stacks/PaymentsStack';
import {CreditStack} from '@navigation/Stacks/CreditStack';
import {ProfileStack} from '@navigation/Stacks/ProfileStack';
import HomeIcon from '@assets/icons/Home';
import DebitCardIcon from '@assets/icons/DebitCard';
import PaymentsIcon from '@assets/icons/Payments';
import CreditIcon from '@assets/icons/Credit';
import UserIcon from '@assets/icons/User';

export const TAB_CONFIG = [
  {
    name: 'Home',
    component: HomeStack,
    icon: HomeIcon,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'Debit Card',
    component: DebitCardStack,
    icon: DebitCardIcon,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'Payments',
    component: PaymentsStack,
    icon: PaymentsIcon,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'Credit',
    component: CreditStack,
    icon: CreditIcon,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'Profile',
    component: ProfileStack,
    icon: UserIcon,
    options: {
      headerShown: false,
    },
  },
];