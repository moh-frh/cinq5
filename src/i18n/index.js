/* eslint-disable prettier/prettier */
import I18n, {getLanguages} from 'react-native-i18n';

import AsyncStorage from '@react-native-async-storage/async-storage';

import ar from './ar';
import en from './eng';
import fr from './fr';
I18n.fallbacks = true;

I18n.translations = {
  en,
  ar,
  fr,
};

AsyncStorage.getItem('language').then(res => {
  console.warn('lanng:'+res)
  I18n.locale = `${res}-Us`
})

// getLanguages()
//   .then(languages => {
//     // I18nManager.forceRTL(true);
//     console.log('getLanguages', languages); // ['en-US', 'en']
//     if(languages){
//       I18n.locale = 'en-Us';
//     }
//     else{
//       I18n.locale = 'fr-Us';

//     }
//   })
//   .catch(error => {
//     console.log('getLanguages error : ', error);
//   });
export default I18n;
