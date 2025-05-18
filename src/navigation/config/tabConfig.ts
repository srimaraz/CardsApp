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

enum TABS {
  HOME = 'Home',
  DEBIT_CARD = 'Debit Card',
  PAYMENTS = 'Payments',
  CREDIT = 'Credit',
  PROFILE = 'Profile',
}

export const TAB_CONFIG = [
  {
    name: TABS.HOME,
    component: HomeStack,
    icon: HomeIcon,
    options: {
      headerShown: false,
    },
  },
  {
    name: TABS.DEBIT_CARD,
    component: DebitCardStack,
    icon: DebitCardIcon,
    options: {
      headerShown: false,
    },
  },
  {
    name: TABS.PAYMENTS,
    component: PaymentsStack,
    icon: PaymentsIcon,
    options: {
      headerShown: false,
    },
  },
  {
    name: TABS.CREDIT,
    component: CreditStack,
    icon: CreditIcon,
    options: {
      headerShown: false,
    },
  },
  {
    name: TABS.PROFILE,
    component: ProfileStack,
    icon: UserIcon,
    options: {
      headerShown: false,
    },
  },
];