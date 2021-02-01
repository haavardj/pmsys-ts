# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.10.3](https://github.com/haavardj/pmsys-ts/compare/v0.10.2...v0.10.3) (2021-02-01)


### Bug Fixes

* strict type check errors ([6b549a1](https://github.com/haavardj/pmsys-ts/commit/6b549a1c8eabef7d0685275cdb4f0f0911c226a8))

### [0.10.2](https://github.com/haavardj/pmsys-ts/compare/v0.10.1...v0.10.2) (2021-02-01)


### Features

* add IDataPoint type guards ([e7a77d8](https://github.com/haavardj/pmsys-ts/commit/e7a77d81f7cbc906b009875a12daa3138e1101a3))

### [0.10.1](https://github.com/haavardj/pmsys-ts/compare/v0.10.0...v0.10.1) (2020-07-08)


### Bug Fixes

* missing sport of participation schema ([bae1528](https://github.com/haavardj/pmsys-ts/commit/bae15281e57fd6e6f75cc50d4c3059e2e68d02ae))
* missing sport of participation schema ([9cfa721](https://github.com/haavardj/pmsys-ts/commit/9cfa7217a2734db25750639d132c04b2d0b509be))

## [0.10.0](https://github.com/haavardj/pmsys-ts/compare/v0.9.5...v0.10.0) (2020-07-08)


### ⚠ BREAKING CHANGES

* From this version all dates are represented as strings. This makes handling data from persistent
storage and remote servers consistent. It is also what the OMH standard suggest.

This version also removes all object factory methods. Creating objects require application specific
data (e.g., dates and ids) and is better done there.

* change all dates to strings and delete all factory methods ([a5bb609](https://github.com/haavardj/pmsys-ts/commit/a5bb609c77f5b27170f4996e3f8c3301e202aab0))

### [0.9.5](https://github.com/haavardj/pmsys-ts/compare/v0.9.4...v0.9.5) (2020-07-06)


### Bug Fixes

* menstrual headers did not initialize correctly ([c46e2fb](https://github.com/haavardj/pmsys-ts/commit/c46e2fbf48ec5696dafc77bca83cd990c60817e9))
* MENSTRUAL_1_0_SCHEMA was not exported ([cd23058](https://github.com/haavardj/pmsys-ts/commit/cd2305849f8c6d20ce13e452997a6dfe76eba39f))

### [0.9.4](https://github.com/haavardj/pmsys-ts/compare/v0.9.3...v0.9.4) (2020-07-06)


### Features

* add modified and effective date to the IHeader interface ([2823a59](https://github.com/haavardj/pmsys-ts/commit/2823a592723db733d53b383b5d9bd5716e5daf3e))

### [0.9.3](https://github.com/haavardj/pmsys-ts/compare/v0.9.2...v0.9.3) (2020-05-24)


### Bug Fixes

* compute gamePerformance and illness reports ([dd0f407](https://github.com/haavardj/pmsys-ts/commit/dd0f407a91321be506e8f28ba2aab7506dc6ea80))

### [0.9.2](https://github.com/haavardj/pmsys-ts/compare/v0.9.1...v0.9.2) (2020-05-24)


### Bug Fixes

* missing update of corona datapoints ([3e6d810](https://github.com/haavardj/pmsys-ts/commit/3e6d810778569df7685409710ac4da9bf12336e3))

### [0.9.1](https://github.com/haavardj/pmsys-ts/compare/v0.9.0...v0.9.1) (2020-05-24)


### Bug Fixes

* missing computations of new corona and menstrual datapoints ([9b5adf5](https://github.com/haavardj/pmsys-ts/commit/9b5adf53795caba58b068df11391b74666722c04))

## [0.9.0](https://github.com/haavardj/pmsys-ts/compare/v0.8.3...v0.9.0) (2020-05-24)


### Features

* add game performance and illness reports ([#7](https://github.com/haavardj/pmsys-ts/issues/7)) ([34ff13f](https://github.com/haavardj/pmsys-ts/commit/34ff13f0487b098355a507f98ce7e59bed7d4e66))
* corona symptoms check datatype ([#9](https://github.com/haavardj/pmsys-ts/issues/9)) ([a9042eb](https://github.com/haavardj/pmsys-ts/commit/a9042eb000cdd7a6bd483bd629a386e46d567cb8))

### [0.8.3](https://github.com/haavardj/pmsys-ts/compare/v0.8.2...v0.8.3) (2020-05-22)


### Bug Fixes

* incorrect header name ([adf016a](https://github.com/haavardj/pmsys-ts/commit/adf016addfe5e6ed459c4047385955e5a316512f))

### [0.8.2](https://github.com/haavardj/pmsys-ts/compare/v0.8.1...v0.8.2) (2020-05-22)


### Bug Fixes

* export menstrual flow enum ([c40e177](https://github.com/haavardj/pmsys-ts/commit/c40e177f4d07ad863247e75cd42241cd35cd8abc))
* IMenstrual type check is missing ([1872f3d](https://github.com/haavardj/pmsys-ts/commit/1872f3d9dd1d6d7255be4f935819c8d52cfe43b3))

### [0.8.1](https://github.com/haavardj/pmsys-ts/compare/v0.8.0...v0.8.1) (2020-05-22)


### Bug Fixes

* missing menstrual header export ([dd6cacb](https://github.com/haavardj/pmsys-ts/commit/dd6cacb29e1724a3a835f9d3f8b856f37edc808b))

## [0.8.0](https://github.com/haavardj/pmsys-ts/compare/v0.7.0...v0.8.0) (2020-05-20)


### Features

* add menstrual datapoint ([d6f30c9](https://github.com/haavardj/pmsys-ts/commit/d6f30c959c4a09b220077df9d9ac927d70bc2629))


### Bug Fixes

* use snake case ([9c14d04](https://github.com/haavardj/pmsys-ts/commit/9c14d04ea8a0d3c2b0ade7eef8c9ad835dbc499e))

## [0.7.0](https://github.com/haavardj/pmsys-ts/compare/v0.6.0...v0.7.0) (2019-12-11)

<a name="0.6.0"></a>
# [0.6.0](https://github.com/haavardj/pmsys-ts/compare/v0.5.1...v0.6.0) (2018-07-22)



<a name="0.5.1"></a>
## [0.5.1](https://github.com/haavardj/pmsys-ts/compare/v0.5.0...v0.5.1) (2018-05-02)



<a name="0.5.0"></a>
# [0.5.0](https://github.com/haavardj/pmsys-ts/compare/v0.4.1...v0.5.0) (2018-05-02)


### Features

* Add injury schema. ([bf9eae2](https://github.com/haavardj/pmsys-ts/commit/bf9eae2))



<a name="0.4.1"></a>
## [0.4.1](https://github.com/haavardj/pmsys-ts/compare/v0.4.0...v0.4.1) (2018-03-23)


### Bug Fixes

* Only add wellness points within normal range. ([a9b7e7a](https://github.com/haavardj/pmsys-ts/commit/a9b7e7a))
* Remove truncation and averaging of RPE Data. ([67204cc](https://github.com/haavardj/pmsys-ts/commit/67204cc))



<a name="0.4.0"></a>
# [0.4.0](https://github.com/haavardj/pmsys-ts/compare/v0.3.6...v0.4.0) (2018-03-19)


### Features

* Add participation schema. ([f9537c4](https://github.com/haavardj/pmsys-ts/commit/f9537c4))



<a name="0.3.6"></a>
## [0.3.6](https://github.com/haavardj/pmsys-ts/compare/v0.3.5...v0.3.6) (2018-02-19)



<a name="0.3.5"></a>
## [0.3.5](https://github.com/haavardj/pmsys-ts/compare/v0.3.4...v0.3.5) (2018-01-27)


### Bug Fixes

* **UserStatistics:** fixed date issues when handling Session RPE datapoints. ([e835c6e](https://github.com/haavardj/pmsys-ts/commit/e835c6e))



<a name="0.3.4"></a>
## [0.3.4](https://github.com/haavardj/pmsys-ts/compare/v0.3.3...v0.3.4) (2018-01-26)



<a name="0.3.3"></a>
## [0.3.3](https://github.com/haavardj/pmsys-ts/compare/v0.3.2...v0.3.3) (2018-01-26)



<a name="0.3.2"></a>
## [0.3.2](https://github.com/haavardj/pmsys-ts/compare/v0.3.1...v0.3.2) (2018-01-25)


### Bug Fixes

* changed Profile.sub back to Profile.id to match db naming scheme. ([50896e6](https://github.com/haavardj/pmsys-ts/commit/50896e6))



<a name="0.3.1"></a>
## [0.3.1](https://github.com/haavardj/pmsys-ts/compare/v0.3.0...v0.3.1) (2018-01-25)


### Bug Fixes

* change Profile.id to Profile.sub to match TSU API ([fc4c73c](https://github.com/haavardj/pmsys-ts/commit/fc4c73c))



<a name="0.3.0"></a>
# [0.3.0](https://github.com/haavardj/pmsys-ts/compare/v0.2.0...v0.3.0) (2018-01-20)


### Bug Fixes

* **build:** copy js to dist when compililng with ts ([0d09619](https://github.com/haavardj/pmsys-ts/commit/0d09619))
* **config:** change moment and submodule import method ([7a822b4](https://github.com/haavardj/pmsys-ts/commit/7a822b4))


### Features

* **user-statistic:** add getLatest method ([a676076](https://github.com/haavardj/pmsys-ts/commit/a676076))
* **wellness:** Add soreness_area field to Wellness class ([4a840f2](https://github.com/haavardj/pmsys-ts/commit/4a840f2))
* **wellness:** add version specific wellness interfaces ([630af40](https://github.com/haavardj/pmsys-ts/commit/630af40))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/haavardj/pmsys-ts/compare/v0.1.2...v0.2.0) (2018-01-13)


### Bug Fixes

* **time:** fix t == null error ([7ad6b65](https://github.com/haavardj/pmsys-ts/commit/7ad6b65))


### Features

* **build:** add build script for Angular module ([6b08463](https://github.com/haavardj/pmsys-ts/commit/6b08463))



<a name="0.1.2"></a>
## [0.1.2](https://github.com/haavardj/pmsys-ts/compare/v0.1.1...v0.1.2) (2018-01-12)



<a name="0.1.1"></a>
## [0.1.1](https://github.com/haavardj/pmsys-ts/compare/v0.1.0...v0.1.1) (2018-01-12)


### Bug Fixes

* **packaging:** add missing moment package ([0116c13](https://github.com/haavardj/pmsys-ts/commit/0116c13))



<a name="0.1.0"></a>
# [0.1.0](https://github.com/haavardj/pmsys-ts/compare/v0.0.0...v0.1.0) (2018-01-10)


### Features

* **schemas:** Add SchemaVerion class ([c35167c](https://github.com/haavardj/pmsys-ts/commit/c35167c))



<a name="0.0.0"></a>
# [0.0.0](https://github.com/haavardj/pmsys-ts/compare/v0.0.2...v0.0.0) (2018-01-09)



# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.
