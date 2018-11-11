import { enableProdMode, TRANSLATIONS, TRANSLATIONS_FORMAT } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// 日本語の場合のみ日本語に翻訳する
declare const require;
const translationProviders = (() => {
  // ブラウザの言語を取得
  const browserLanguage: string = (() => {
    if (navigator.languages.length > 0) {
      return navigator.languages[0];
    }
    if (navigator.language) {
      return navigator.language;
    }
    return 'en';
  })();

  // 日本語だったら翻訳設定
  if (browserLanguage.match(/^ja$|^ja-/)) {
    const translations = require('raw-loader!./locale/messages.ja.xlf');
    return [
      {provide: TRANSLATIONS, useValue: translations},
      {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'},
    ];
  }
})();

platformBrowserDynamic().bootstrapModule(AppModule, {
  providers: [].concat(translationProviders) // 翻訳が必要な場合のみ、翻訳に必要なプロバイダーを追加する
}).catch(err => console.log(err));
