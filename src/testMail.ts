import { send } from './services/emailService';

send({
  email: 'zhipaolga@gmail.com',
  subject: 'Listen your husband',
  html: '<h1>СЛУШАЙ СВОЕГО МУЖА ОН ВСЕГДА ПРАВ</h1>',
});
