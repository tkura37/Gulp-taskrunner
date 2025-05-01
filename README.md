## 概要
Gulpで構築したフロントエンドタスクランナー

## 機能
各種ファイル保存時に、以下を自動実行
- .html
  - dist/にそのままコピー
  - minifyは非対応(既存パッケージに脆弱性があるため)
- .scss
  - CSSへのトランスパイル、ベンダープレフィックス追加、minify、SourceMap生成
  - style.css、style.min.css、style.min.css.mapを生成
  - dist/css/に出力
- .js
  - minify
  - dist/js/に出力
- ブラウザのリロード

## ディレクトリ構成
```text
Gulp-taskrunner/
├── dist/                             # ビルド生成物を格納(初回実行時に自動生成)
│   ├── css/
│   │   ├── style.css
│   │   ├── style.min.css
│   │   └── style.min.css.map
│   ├── js/
│   │   └── (minifyされたjsファイル)
│   └── (htmlファイルのコピー)
├── src/                              # ソースファイルを格納
│   ├── js/
│   ├── scss/
│   │   └── style.scss
│   └── (htmlファイル)
├── gulpfile.js                       # Gulpの設定ファイル
└── ...
```

## コマンド
| コマンド             | 動作                                 |
| :------------------ | :----------------------------------- |
| `npm install`       | 依存関係をインストール                 |
| `npx gulp`          | タスクランナーを起動                   |

## パッケージ導入(npm)
```bash
npm install --save-dev gulp gulp-sass sass gulp-plumber gulp-rename gulp-postcss autoprefixer cssnano gulp-sourcemaps gulp-uglify browser-sync
```
