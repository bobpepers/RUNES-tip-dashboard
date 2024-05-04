# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.0.49](https://github.com/bobpepers/runes-tip-dashboard/compare/v0.0.48...v0.0.49) (2024-05-04)


### Features

* :sparkles: Project Selection (For BotAdminAuthProxyApi), update actions & reducers, wrap application in selectProject key for forced rerender ([de42b62](https://github.com/bobpepers/runes-tip-dashboard/commit/de42b62229769b80a33445ae2c8e9678c0e97475))

### [0.0.48](https://github.com/bobpepers/runes-tip-dashboard/compare/v0.0.47...v0.0.48) (2024-05-03)


### Bug Fixes

* :bug: fix in coinInfoManagement (ExplorerTransactionPath) ([0ab1a0a](https://github.com/bobpepers/runes-tip-dashboard/commit/0ab1a0acaa8bb9042a5d5ccf386be031594ef0f6))

### [0.0.47](https://github.com/bobpepers/runes-tip-dashboard/compare/v0.0.46...v0.0.47) (2024-05-03)


### Features

* :zap: explorerTransactionPath (coinInfo), fix lingui deprecations, upgrade dependencies ([c8174c0](https://github.com/bobpepers/runes-tip-dashboard/commit/c8174c07877c1150030a92b8c71cda7d2dc803a8))

### [0.0.46](https://github.com/bobpepers/runes-tip-dashboard/compare/v0.0.45...v0.0.46) (2024-05-02)


### Performance

* :zap: ReactParticles disable onClick ([6592d20](https://github.com/bobpepers/runes-tip-dashboard/commit/6592d209d350fa9be8d21ebfc380b2c14d7af3da))

### 0.0.45 (2024-04-26)


### Features

* ✨ Add estimated value to overview, add collect earnings button ([36b8d82](https://github.com/bobpepers/runes-tip-dashboard/commit/36b8d8261850e8f3bcfd525be7188821bf884b59))
* ✨ Add Uncollected ErcBalances (homedash) ([e0061d5](https://github.com/bobpepers/runes-tip-dashboard/commit/e0061d598bdf6b0dd06a3a81dc78e70d4518cb75))
* ✨ CoinInfo editing ([e99faec](https://github.com/bobpepers/runes-tip-dashboard/commit/e99faecc06f1659dba58b85b2fc47a7cc0e52bb1))
* ✨ discordTipMessageChannelId: edit field, action, reducer (server/group) ([e211038](https://github.com/bobpepers/runes-tip-dashboard/commit/e21103847d761eaac56cacf7ffb20e98b1feb147))
* ✨ Editable trivia question & answers ([bf5d3bf](https://github.com/bobpepers/runes-tip-dashboard/commit/bf5d3bf9341db728158fe77402a652702591b2a4))
* ✨ feature settings: include platform & coin fields - add filters ([8da3cee](https://github.com/bobpepers/runes-tip-dashboard/commit/8da3ceee7ac2098bb924a399b3dacad84de48c17))
* ✨ Logs extra ([91023f5](https://github.com/bobpepers/runes-tip-dashboard/commit/91023f5b538b6ff2f79c1bb749f33e9b08a99628))
* ✨ rpc transaction history view ([57053ac](https://github.com/bobpepers/runes-tip-dashboard/commit/57053acda58ee5883d80101df03e5496b2bd7e39))
* ✨ TriviaQuestion Categories ([53275c2](https://github.com/bobpepers/runes-tip-dashboard/commit/53275c219d7ea41b131bffc425df6f621d67470f))
* ✨ Use dp from backend for value calculations ([2dbbf88](https://github.com/bobpepers/runes-tip-dashboard/commit/2dbbf888fc5cd1a04d1bc920560b2caab4021922))
* ➕ add react-final-form dependency ([57f14eb](https://github.com/bobpepers/runes-tip-dashboard/commit/57f14eb59e7b09d95cb8b202c806442c646a3bab))
* 🎨 Add activity message for failed faucet request ([687cf95](https://github.com/bobpepers/runes-tip-dashboard/commit/687cf954474fa1d03edcfcaf492dc2b1ba642be5))
* 🚸 Add support request to activity feed ([c3c6f7f](https://github.com/bobpepers/runes-tip-dashboard/commit/c3c6f7fb5071a0fc843edb9a360a8dd6251fd706))
* Activity feed token compatability, fetch full admin wallet in 1 api call, render adminwallet ([31d30e7](https://github.com/bobpepers/runes-tip-dashboard/commit/31d30e7c8bc15c290048c3acdd687133e1d357a1))


### Bug Fixes

* :arrow_up: up tsparticles v2 -> v3 (address breaking changes) ([a5d183c](https://github.com/bobpepers/runes-tip-dashboard/commit/a5d183cbb312d7ca781d6cb873f10b3db7a6b755))
* :zap: rm tsparticles bg color ([53f276c](https://github.com/bobpepers/runes-tip-dashboard/commit/53f276c44260867c713b6d94c9a1b390729ea463))
* ⚡️ additional activity field ([b6d84ef](https://github.com/bobpepers/runes-tip-dashboard/commit/b6d84efae6eae234987b67f6b34bcb5e098f1fb8))
* ⚡️ dashboard multi-token compat fixes ([8521bc1](https://github.com/bobpepers/runes-tip-dashboard/commit/8521bc135272e96f45b6d9155e0e66c392b38dbb))
* ⚡️ default theme dark, save theme state to localstorage ([aac8b4f](https://github.com/bobpepers/runes-tip-dashboard/commit/aac8b4f91d4d3ec03447147133270e140588bea7))
* ⚡️ Move fetchUser up in the app iniation layer ([a9fec3e](https://github.com/bobpepers/runes-tip-dashboard/commit/a9fec3ec739718910de678dae5ae9a764e4577d2))
* ✨ add hints to coinInfo edit ([bbb6ec3](https://github.com/bobpepers/runes-tip-dashboard/commit/bbb6ec333dc7b831fb2e845d2256e2ff5adff722))
* 🐛 Activity: history render username from spender ([c6a4c1a](https://github.com/bobpepers/runes-tip-dashboard/commit/c6a4c1a99bcd22a01e4286fdad3c0431ee281138))
* 🐛 add a missing dpValue ([0e5b419](https://github.com/bobpepers/runes-tip-dashboard/commit/0e5b419f43196f8a207e15854b5d75a7790aad85))
* 🐛 add missing dpValue for user Specific activity ([65d224b](https://github.com/bobpepers/runes-tip-dashboard/commit/65d224bad6421d4b44bdd305b13baa88868b909e))
* 🐛 Fix an issue with featureSettings editing ([e195836](https://github.com/bobpepers/runes-tip-dashboard/commit/e195836ef111a276fcd1746871e34ff442083d97))
* 🐛 fix dp value withdrawTable ([7095fec](https://github.com/bobpepers/runes-tip-dashboard/commit/7095fec060cf81eea9d20591637a823e6e754931))
* 🐛 fix inexistent activity coin records ([cff535e](https://github.com/bobpepers/runes-tip-dashboard/commit/cff535eab2aa1728846fc3534fa3cd329beab58e))
* 🐛 Fix missed error from recent changes ([d1d575c](https://github.com/bobpepers/runes-tip-dashboard/commit/d1d575c290f8d373b8e665fdcf79756d8071986a))
* 🐛 Fix userInfo view (multi-wallet) ([3313984](https://github.com/bobpepers/runes-tip-dashboard/commit/33139848069c4a34c3816a35b8728d7a8fb1700b))
* 🐛 users table: fix broken wallet display ([d4c5d66](https://github.com/bobpepers/runes-tip-dashboard/commit/d4c5d66e9f56e013c23095e674a10981e40044d4))
* 💄 z-index issue ([4edd81f](https://github.com/bobpepers/runes-tip-dashboard/commit/4edd81fc0ce367988b96e7294a01699d9b542d3a))
* 🩹 correction status grid ([f8265f6](https://github.com/bobpepers/runes-tip-dashboard/commit/f8265f678b3d0a32a596ca79efca5b6aae8d7140))
* 🩹 Fix a dashboard crash (failed tipping activity) ([a322a5c](https://github.com/bobpepers/runes-tip-dashboard/commit/a322a5cc1bfa91f1be1fa5efe2e0eabeba8ae103))
* 🩹 react-hot-loader -> react-refresh | @mui/styles -> tss-react/mui ([8547848](https://github.com/bobpepers/runes-tip-dashboard/commit/85478485f883b358d9f1e3830164cbe0d5044bb7))
* 🚑️ production issue with webpack fast-refresh ([a767e54](https://github.com/bobpepers/runes-tip-dashboard/commit/a767e54b376bb0b1943f621e59ea63b18723a349))
* Add a missing voiceraintip userfield to activity ([3b24312](https://github.com/bobpepers/runes-tip-dashboard/commit/3b243128e9c4b5ea320eab72078bab825ea6d4ac))
* Add history request to activity render ([28958f1](https://github.com/bobpepers/runes-tip-dashboard/commit/28958f15fb4416c99a0a34d8acbdc0cadbda1c3a))
* Fix breaking change (include vm-browserify fallback), upgrade dependencies ([feda88b](https://github.com/bobpepers/runes-tip-dashboard/commit/feda88b20579e68f62ac633b0f92dedece4ad109))
* fix user link deposits, add collected column deposits (erc20) ([a509c12](https://github.com/bobpepers/runes-tip-dashboard/commit/a509c12bd354a902ab81bd33f4c0dcff4500a75b))
* header proptype warning, renderWallet key warning ([76f217f](https://github.com/bobpepers/runes-tip-dashboard/commit/76f217fa1f27e4ba4948bd00127d03b14a17409a))


### Build

* 🔧 add release method ([0872cee](https://github.com/bobpepers/runes-tip-dashboard/commit/0872cee2089a524f0ff1d92702b115334577c200))


### Style

* ♻️ Header use mu5 Appbar instead of bootstrap menu ([db348ea](https://github.com/bobpepers/runes-tip-dashboard/commit/db348eaf0248c4adde6596f18ee5bd58c9e8dea2))


### Refactor

* ♻️ remove actions index.js ([b3d844b](https://github.com/bobpepers/runes-tip-dashboard/commit/b3d844bcd8bbb27d8e17126eaba49d0042237c8f))
* ♻️ Use react-final-form instead of react-redux-form ([254493b](https://github.com/bobpepers/runes-tip-dashboard/commit/254493b42f9c49403b17473e35e11659277d29b7))
* ⚡️ Use BigNumber to calculate frontpage stats ([e6fcebc](https://github.com/bobpepers/runes-tip-dashboard/commit/e6fcebceddb2d6ab5c1ccc8eaf54a2996a0141ad))
* ⚰️ Remove deprecated dp action/reducer ([7f8ea19](https://github.com/bobpepers/runes-tip-dashboard/commit/7f8ea19a4dc9981554d617a3d9875ce1934c740a))
* ⚰️ Remove deprecated start sync ([c45addc](https://github.com/bobpepers/runes-tip-dashboard/commit/c45addce5e9f388dff71cb35889f299d59484e33))
* ⚰️ Remove manual deposit patcher ([b602d1f](https://github.com/bobpepers/runes-tip-dashboard/commit/b602d1fedfe4bc09d586dac5b04fe945170048d3))


### Performance

* ⚡️ No hard reload on login/logout ([4af211d](https://github.com/bobpepers/runes-tip-dashboard/commit/4af211d9dd731849c6416b6c3845a4921665f6ce))
* Prop Types (Activity component) ([a3871ec](https://github.com/bobpepers/runes-tip-dashboard/commit/a3871ec739bf35983f87aebf6d82dcdf3e4a928c))
* Prop Types (Activity container) ([c7381f0](https://github.com/bobpepers/runes-tip-dashboard/commit/c7381f0b66d2dfee85c5764ffbb5bbd2234fdd04))
* Prop Validation (Home) ([8590425](https://github.com/bobpepers/runes-tip-dashboard/commit/85904259d4c14c7bebe3ecb77868f9313a196e3f))

### [0.0.44](https://github.com/bobpepers/runes-tip-dashboard/compare/v0.0.43...v0.0.44) (2023-07-10)

### [0.0.43](https://github.com/bobpepers/runes-tip-dashboard/compare/v0.0.42...v0.0.43) (2023-07-03)

### [0.0.42](https://github.com/bobpepers/runes-tip-dashboard/compare/v0.0.41...v0.0.42) (2023-04-17)

### [0.0.41](https://github.com/bobpepers/runes-tip-dashboard/compare/v0.0.40...v0.0.41) (2023-04-03)

### [0.0.40](https://github.com/bobpepers/runes-tip-dashboard/compare/v0.0.39...v0.0.40) (2023-03-07)

### [0.0.39](https://github.com/bobpepers/runes-tip-dashboard/compare/v0.0.38...v0.0.39) (2023-02-28)


### Bug Fixes

* 🩹 Fix a dashboard crash (failed tipping activity) ([a322a5c](https://github.com/bobpepers/runes-tip-dashboard/commit/a322a5cc1bfa91f1be1fa5efe2e0eabeba8ae103))

### [0.0.38](https://github.com/bobpepers/runes-tip-dashboard/compare/v0.0.37...v0.0.38) (2023-02-25)

### [0.0.37](https://github.com/bobpepers/runes-tip-dashboard/compare/v0.0.36...v0.0.37) (2023-02-10)


### Features

* ✨ Logs extra ([91023f5](https://github.com/bobpepers/runes-tip-dashboard/commit/91023f5b538b6ff2f79c1bb749f33e9b08a99628))

### [0.0.36](https://github.com/bobpepers/runes-tip-dashboard/compare/v0.0.35...v0.0.36) (2023-02-09)


### Bug Fixes

* fix user link deposits, add collected column deposits (erc20) ([a509c12](https://github.com/bobpepers/runes-tip-dashboard/commit/a509c12bd354a902ab81bd33f4c0dcff4500a75b))

### [0.0.35](https://github.com/bobpepers/runes-tip-dashboard/compare/v0.0.34...v0.0.35) (2023-02-08)


### Features

* ✨ Add Uncollected ErcBalances (homedash) ([e0061d5](https://github.com/bobpepers/runes-tip-dashboard/commit/e0061d598bdf6b0dd06a3a81dc78e70d4518cb75))

### [0.0.34](https://github.com/bobpepers/runes-tip-dashboard/compare/v0.0.33...v0.0.34) (2023-01-27)


### Bug Fixes

* header proptype warning, renderWallet key warning ([76f217f](https://github.com/bobpepers/runes-tip-dashboard/commit/76f217fa1f27e4ba4948bd00127d03b14a17409a))


### Performance

* Prop Types (Activity component) ([a3871ec](https://github.com/bobpepers/runes-tip-dashboard/commit/a3871ec739bf35983f87aebf6d82dcdf3e4a928c))
* Prop Types (Activity container) ([c7381f0](https://github.com/bobpepers/runes-tip-dashboard/commit/c7381f0b66d2dfee85c5764ffbb5bbd2234fdd04))
* Prop Validation (Home) ([8590425](https://github.com/bobpepers/runes-tip-dashboard/commit/85904259d4c14c7bebe3ecb77868f9313a196e3f))

### [0.0.33](https://github.com/bobpepers/runes-tip-dashboard/compare/v0.0.32...v0.0.33) (2023-01-16)


### Features

* ✨ Add estimated value to overview, add collect earnings button ([36b8d82](https://github.com/bobpepers/runes-tip-dashboard/commit/36b8d8261850e8f3bcfd525be7188821bf884b59))

### [0.0.32](https://github.com/bobpepers/runes-tip-dashboard/compare/v0.0.31...v0.0.32) (2023-01-15)


### Features

* ✨ rpc transaction history view ([57053ac](https://github.com/bobpepers/runes-tip-dashboard/commit/57053acda58ee5883d80101df03e5496b2bd7e39))

### [0.0.31](https://github.com/bobpepers/runes-tip-dashboard/compare/v0.0.30...v0.0.31) (2023-01-11)


### Features

* ✨ TriviaQuestion Categories ([53275c2](https://github.com/bobpepers/runes-tip-dashboard/commit/53275c219d7ea41b131bffc425df6f621d67470f))

### [0.0.30](https://github.com/bobpepers/runes-tip-dashboard/compare/v0.0.29...v0.0.30) (2023-01-08)
