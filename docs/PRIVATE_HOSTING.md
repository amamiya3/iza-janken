# サイト全体を管理人専用へ移行
2026-11-19 JST。ユーザーはDEADだけでなくホーム・通常対戦を含むサイト全体の非公開を指示。

## ホスティング
Sites project_id: appgprj_6afdd06cc3d0819191717490ae12e989
Owner-only custom policy。所有者1名、編集者/外部閲覧者/グループなし。認証はホスティング側で実施。フロントのパスワードやURL非表示で代替しない。
サイトのソースリポジトリと公開設定はSitesで管理。元の開発正本は引き続き amamiya3/iza-janken の main。

## GitHub Pages
元の公開index.htmlは公開停止のお知らせへ置換。ゲーム本体のホームは _private/index.html にそのまま保存。
_config.yml でゲームHTML/JS/画像/試作/文書をPagesビルドから除外。通常のブランチ/Jekyll公開を使用し、.nojekyllは追加しない。ゲーム本体は新しいprivate Siteへだけ配置する。

## 更新手順
mainの _private/index.html を private Site の dist/index.html に配置。他のゲームHTML/JSとassets/prototypesはmainからdistへコピー。サイトmanifestは元GitHubに作らず、Sitesのcheckoutに保持。所有者限定accessを維持してnative private deploy。
フロント変更をpublic root indexへ戻さない。公衆向け公開はユーザーの明示指示がある時だけ。

## 注意
GitHubリポジトリ自体のvisibilityは変更していないため、ソースと過去コミットは公開のまま。サイトへのアクセス制御とコードの公開は別。
別ドメインのためブラウザの戦績・練習用カードは自動共有されない。旧ドメインの端末保存データは削除しない。
