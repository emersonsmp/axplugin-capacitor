# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-01-06

### Added
- Initial release of Capacitor plugin
- Migrated from `cordova-plugin-axplugin` to Capacitor
- TypeScript definitions for better IDE support
- Event-based architecture with `addListener()`
- Promise-based API
- Universal Extensibility support for OutSystems

### Features
- `setup()` - Configure plugin with API key
- `start()` - Start speed test
- `stop()` - Stop speed test
- `isAvailable()` - Check platform availability
- `addListener()` - Register event listeners for speed updates and errors
- `removeAllListeners()` - Clean up all event listeners

### Documentation
- Complete API documentation in README.md
- Migration guide from Cordova (MIGRATION.md)
- Quick start guide (QUICK_START.md)
- Conversion summary (CONVERSION_SUMMARY.md)
- Example HTML file for testing

### Android
- Supports Android API 22+ (Android 5.1+)
- Uses native .aar library (axplugin-release.aar)
- Gradle 8.2.1 support
- AndroidX compatibility

### Developer Tools
- TypeScript configuration
- Rollup bundler setup
- ESLint configuration
- Installation script (install.sh)
- Example implementation

### Breaking Changes from Cordova
- ⚠️ API changed from callbacks to Promises
- ⚠️ Events now use `addListener()` instead of callback parameters
- ⚠️ Method signatures changed to accept objects instead of positional parameters
- ⚠️ Namespace changed from `cordova.plugins.AxPlugin` to `AxPlugin`

### Migration Notes
See MIGRATION.md for detailed migration instructions from the Cordova version.

## [Cordova Version] - Before 2026-01-06

### Cordova Plugin Features (deprecated)
- Cordova-based plugin architecture
- Callback-based API
- `plugin.xml` configuration
- Direct callback parameters for events
- Namespace: `cordova.plugins.AxPlugin`

---

## Upgrading

### From Cordova to Capacitor

1. Remove the old Cordova plugin:
   ```bash
   cordova plugin remove cordova-plugin-axplugin
   ```

2. Install the new Capacitor plugin:
   ```bash
   npm install @capacitor/axplugin
   npx cap sync android
   ```

3. Update your code following the migration guide in MIGRATION.md

### Future Versions

To update to a newer version:
```bash
npm update @capacitor/axplugin
npx cap sync android
```

---

## Version History

- **1.0.0** (2026-01-06) - Initial Capacitor release
- **Cordova** (legacy) - Original Cordova-based implementation
