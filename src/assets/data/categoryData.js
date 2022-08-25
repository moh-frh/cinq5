/* eslint-disable prettier/prettier */
import {icons} from '@app/assets/constants';
import I18n from '@app/i18n';

const categoryData = [
  {
    id: 0,
    name: I18n.t('all'),
    icon: icons.allFoods,
  },
  {
    id: 1,
    name: I18n.t('entries'),
    icon: icons.entrees,
  },
  {
    id: 2,
    name: I18n.t('Drinks'),
    icon: icons.drink,
  },
  {
    id: 3,
    name: I18n.t('Aperitif'),
    icon: icons.aperitif,
  },
  {
    id: 4,
    name: I18n.t('Bases'),
    icon: icons.bases,
  },
  {
    id: 5,
    name: I18n.t('Desserts'),
    icon: icons.desserts,
  },
  {
    id: 6,
    name: I18n.t('Dishes'),
    icon: icons.plats,
  },

  {
    id: 9,
    name: I18n.t('plate'),
    icon: icons.assiette,
  },
];

export default categoryData;
