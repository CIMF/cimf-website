import 'source-map-support/register';
import { join } from 'path';
import koa from 'koa';
import koaViews from 'koa-views';
import koaStatic from 'koa-static';
import koaLocale from 'koa-locale';
import koai18n from 'koa-i18n';
import koaBodyparser from 'koa-bodyparser';
import routes from './routes';

const app = koa();

koaLocale(app);

app.use(koai18n(app, {
  locales:['en', 'zh-CN'],
  directory: join(__dirname, '../../locales'),
  modes: [
    'query',
    'cookie',
    'header',
  ],
}));

app.use(function *(next) {
  try {
    yield next;
  } catch (err) {
    console.error(err.stack);
    this.status = 500;
  }
});

app.use(koaBodyparser());
app.use(koaViews(join(__dirname, '../../template'), {
  extension: 'ejs'
}));
app.use(koaStatic(join(__dirname, '../../public')));
app.use(koaStatic(join(__dirname, '../../source/client')));

app.use(routes);

app.listen(process.env.PORT || 10000, () => console.log('listen on 10000'));
