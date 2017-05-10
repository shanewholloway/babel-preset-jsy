#!/usr/bin/env node
'use strict';

const babel_preset_jsy_json = require('../../package.json');
const fs = require('fs');

const argv = process.argv.slice(2);
let jsy_options;
const jsy_option_sets = { no_stage_3: { no_stage_3: true }, all: { stage_3: true,
    targets: { node: true, browser: true }, offside: { check_blocks: '\/node_modules\/|\\node_modules\\/' } } };

if (argv.includes('--help')) {
  console.log(['', '  Usage: jsy-init [options]', '', '  Purpose: Configures the package.json with Babel settings, devDependencies, and common scripts for quickly starting a new project.', '', '  Options:', '', '    --help            output usage information', '    --no_stage_3      add babel config option to exclude stage_3 preset (used to prevent async/await code generation)', '    --options         add all babel config options for JSY for later editing', ''].join('\n'));
} else {
  if (argv.includes('--no_stage_3' || argv.includes('--no_stage3'))) {
    jsy_options = Object.assign({}, jsy_options, jsy_option_sets.no_stage_3);
  }

  if (argv.includes('--options')) {
    jsy_options = Object.assign({}, jsy_options, jsy_option_sets.all);
  }

  transformPackageJson();
}

function transformPackageJson(filename = './package.json') {
  new Promise((resolve, reject) => fs.readFile(filename, 'utf-8', (err, content) => err ? reject(err) : resolve(content))).then(content => JSON.parse(content)).then(pkg => {
    console.log(['', `Merging settings into "${filename}":`, JSON.stringify(setupPackageJson({}), null, 2), ''].join('\n'));
    return setupPackageJson(pkg);
  }).then(pkg => JSON.stringify(pkg, null, 2)).then(content => new Promise((resolve, reject) => fs.writeFile(filename, content, err => err ? reject(err) : resolve(content)))).then(content => console.log(`Wrote merged JSY settings into "${filename}"`));
}

function setupPackageJson(pkg) {
  pkg.devDependencies = setupDevDependencies(pkg.devDependencies || {});
  pkg.babel = setupBabelPresets(pkg.babel || {});
  pkg.scripts = setupScripts(pkg.scripts || {});
  return pkg;
}

function setupDevDependencies(devDependencies) {
  devDependencies['babel-cli'] = babel_preset_jsy_json.devDependencies['babel-cli'];
  devDependencies['babel-preset-jsy'] = `^${babel_preset_jsy_json.version}`;
  devDependencies['nodemon'] = '*';
  return devDependencies;
}

function setupBabelPresets(babel) {
  if (!babel.presets) {
    babel.presets = [];
  } else if ('string' === babel.presets) {
    babel.presets = [babel.presets];
  }

  if (!babel.presets.find(e => e == 'jsy' || e[0] == 'jsy')) {
    babel.presets.push(jsy_options ? ['jsy', jsy_options] : 'jsy');
  }

  return babel;
}

function setupScripts(scripts) {
  if (!scripts.start) {
    scripts.start = 'node dist';
  }

  if (!scripts['start:dev']) {
    scripts['start:dev'] = 'nodemon -d 2 dist';
  }

  if (!scripts.build) {
    scripts.build = 'babel -s inline -x .js,.jsy code -d dist';
  }

  if (!scripts.watch) {
    scripts.watch = 'npm -s run build -- --watch';
  }

  if (!scripts.pretest) {
    scripts.pretest = 'npm -s run build';
  }

  if (!scripts.testone) {
    scripts.testone = 'babel-node test/example.jsy';
  }

  return scripts;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvZGUvYmluL2pzeS1pbml0LmpzIl0sIm5hbWVzIjpbImJhYmVsX3ByZXNldF9qc3lfanNvbiIsInJlcXVpcmUiLCJmcyIsImFyZ3YiLCJwcm9jZXNzIiwic2xpY2UiLCJqc3lfb3B0aW9ucyIsImpzeV9vcHRpb25fc2V0cyIsIm5vX3N0YWdlXzMiLCJhbGwiLCJzdGFnZV8zIiwidGFyZ2V0cyIsIm5vZGUiLCJicm93c2VyIiwib2Zmc2lkZSIsImNoZWNrX2Jsb2NrcyIsImluY2x1ZGVzIiwiY29uc29sZSIsImxvZyIsImpvaW4iLCJPYmplY3QiLCJhc3NpZ24iLCJ0cmFuc2Zvcm1QYWNrYWdlSnNvbiIsImZpbGVuYW1lIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJyZWFkRmlsZSIsImVyciIsImNvbnRlbnQiLCJ0aGVuIiwiSlNPTiIsInBhcnNlIiwicGtnIiwic3RyaW5naWZ5Iiwic2V0dXBQYWNrYWdlSnNvbiIsIndyaXRlRmlsZSIsImRldkRlcGVuZGVuY2llcyIsInNldHVwRGV2RGVwZW5kZW5jaWVzIiwiYmFiZWwiLCJzZXR1cEJhYmVsUHJlc2V0cyIsInNjcmlwdHMiLCJzZXR1cFNjcmlwdHMiLCJ2ZXJzaW9uIiwicHJlc2V0cyIsImZpbmQiLCJlIiwicHVzaCIsInN0YXJ0IiwiYnVpbGQiLCJ3YXRjaCIsInByZXRlc3QiLCJ0ZXN0b25lIl0sIm1hcHBpbmdzIjoiOztBQUNBLE1BQU1BLHdCQUF3QkMsUUFBUSxvQkFBUixDQUE5QjtBQUNBLE1BQU1DLEtBQUtELFFBQVEsSUFBUixDQUFYOztBQUVBLE1BQU1FLE9BQU9DLFFBQVFELElBQVIsQ0FBYUUsS0FBYixDQUFtQixDQUFuQixDQUFiO0FBQ0EsSUFBSUMsV0FBSjtBQUNBLE1BQU1DLGtCQUNKLEVBQUlDLFlBQ0UsRUFBSUEsWUFBWSxJQUFoQixFQUROLEVBRUlDLEtBQ0UsRUFBSUMsU0FBUyxJQUFiO0FBQ0lDLGFBQVMsRUFBSUMsTUFBTSxJQUFWLEVBQWdCQyxTQUFT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QUFRVyxPQUFSLEdBQWtCLDZCQUFsQjtBQUErQzs7QUFFakQsU0FBT1gsT0FBUDtBQUFjIiwiZmlsZSI6ImpzeS1pbml0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5jb25zdCBiYWJlbF9wcmVzZXRfanN5X2pzb24gPSByZXF1aXJlKCcuLi8uLi9wYWNrYWdlLmpzb24nKVxuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpXG5cbmNvbnN0IGFyZ3YgPSBwcm9jZXNzLmFyZ3Yuc2xpY2UoMilcbmxldCBqc3lfb3B0aW9uc1xuY29uc3QganN5X29wdGlvbl9zZXRzID1cbiAgQHt9IG5vX3N0YWdlXzM6XG4gICAgICAgIEB7fSBub19zdGFnZV8zOiB0cnVlXG4gICAgLCBhbGw6XG4gICAgICAgIEB7fSBzdGFnZV8zOiB0cnVlXG4gICAgICAgICAgLCB0YXJnZXRzOiBAe30gbm9kZTogdHJ1ZSwgYnJvd3NlcjogdHJ1ZVxuICAgICAgICAgICwgb2Zmc2lkZTogQHt9IGNoZWNrX2Jsb2NrczogJ1xcL25vZGVfbW9kdWxlc1xcL3xcXFxcbm9kZV9tb2R1bGVzXFxcXC8nXG5cbmlmIGFyZ3YuaW5jbHVkZXMgQCAnLS1oZWxwJyA6OlxuICBjb25zb2xlLmxvZyBAXG4gICAgQFtdICcnXG4gICAgICAsICcgIFVzYWdlOiBqc3ktaW5pdCBbb3B0aW9uc10nXG4gICAgICAsICcnXG4gICAgICAsICcgIFB1cnBvc2U6IENvbmZpZ3VyZXMgdGhlIHBhY2thZ2UuanNvbiB3aXRoIEJhYmVsIHNldHRpbmdzLCBkZXZEZXBlbmRlbmNpZXMsIGFuZCBjb21tb24gc2NyaXB0cyBmb3IgcXVpY2tseSBzdGFydGluZyBhIG5ldyBwcm9qZWN0LidcbiAgICAgICwgJydcbiAgICAgICwgJyAgT3B0aW9uczonXG4gICAgICAsICcnXG4gICAgICAsICcgICAgLS1oZWxwICAgICAgICAgICAgb3V0cHV0IHVzYWdlIGluZm9ybWF0aW9uJ1xuICAgICAgLCAnICAgIC0tbm9fc3RhZ2VfMyAgICAgIGFkZCBiYWJlbCBjb25maWcgb3B0aW9uIHRvIGV4Y2x1ZGUgc3RhZ2VfMyBwcmVzZXQgKHVzZWQgdG8gcHJldmVudCBhc3luYy9hd2FpdCBjb2RlIGdlbmVyYXRpb24pJ1xuICAgICAgLCAnICAgIC0tb3B0aW9ucyAgICAgICAgIGFkZCBhbGwgYmFiZWwgY29uZmlnIG9wdGlvbnMgZm9yIEpTWSBmb3IgbGF0ZXIgZWRpdGluZydcbiAgICAgICwgJydcbiAgICAuam9pbignXFxuJylcblxuZWxzZSA6OlxuICBpZiBhcmd2LmluY2x1ZGVzIEAgJy0tbm9fc3RhZ2VfMycgfHwgYXJndi5pbmNsdWRlcyBAICctLW5vX3N0YWdlMycgOjpcbiAgICBqc3lfb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24gQCB7fSwganN5X29wdGlvbnMsIGpzeV9vcHRpb25fc2V0cy5ub19zdGFnZV8zXG5cbiAgaWYgYXJndi5pbmNsdWRlcyBAICctLW9wdGlvbnMnIDo6XG4gICAganN5X29wdGlvbnMgPSBPYmplY3QuYXNzaWduIEAge30sIGpzeV9vcHRpb25zLCBqc3lfb3B0aW9uX3NldHMuYWxsXG4gICAgXG4gIHRyYW5zZm9ybVBhY2thZ2VKc29uKClcblxuXG5mdW5jdGlvbiB0cmFuc2Zvcm1QYWNrYWdlSnNvbihmaWxlbmFtZT0nLi9wYWNrYWdlLmpzb24nKSA6OlxuICBuZXcgUHJvbWlzZSBAIChyZXNvbHZlLCByZWplY3QpID0+XG4gICAgZnMucmVhZEZpbGUgQCBmaWxlbmFtZSwgJ3V0Zi04JyxcbiAgICAgIChlcnIsIGNvbnRlbnQpID0+IGVyciA/IHJlamVjdChlcnIpIDogcmVzb2x2ZShjb250ZW50KVxuXG4gIC50aGVuIEAgY29udGVudCA9PiBKU09OLnBhcnNlIEAgY29udGVudFxuXG4gIC50aGVuIEAgcGtnID0+IDo6XG4gICAgY29uc29sZS5sb2cgQFxuICAgICAgQFtdICcnLCBgTWVyZ2luZyBzZXR0aW5ncyBpbnRvIFwiJHtmaWxlbmFtZX1cIjpgXG4gICAgICAgICwgSlNPTi5zdHJpbmdpZnkgQCBzZXR1cFBhY2thZ2VKc29uKHt9KSwgbnVsbCwgMlxuICAgICAgICAsICcnXG4gICAgICAuam9pbignXFxuJylcbiAgICByZXR1cm4gc2V0dXBQYWNrYWdlSnNvbihwa2cpXG5cbiAgLnRoZW4gQCBwa2cgPT4gSlNPTi5zdHJpbmdpZnkocGtnLCBudWxsLCAyKVxuXG4gIC50aGVuIEAgY29udGVudCA9PlxuICAgIG5ldyBQcm9taXNlIEAgKHJlc29sdmUsIHJlamVjdCkgPT5cbiAgICAgIGZzLndyaXRlRmlsZSBAIGZpbGVuYW1lLCBjb250ZW50LFxuICAgICAgICAoZXJyKSA9PiBlcnIgPyByZWplY3QoZXJyKSA6IHJlc29sdmUoY29udGVudClcblxuICAudGhlbiBAIGNvbnRlbnQgPT4gY29uc29sZS5sb2cgQCBgV3JvdGUgbWVyZ2VkIEpTWSBzZXR0aW5ncyBpbnRvIFwiJHtmaWxlbmFtZX1cImBcblxuXG5mdW5jdGlvbiBzZXR1cFBhY2thZ2VKc29uKHBrZykgOjpcbiAgcGtnLmRldkRlcGVuZGVuY2llcyA9IHNldHVwRGV2RGVwZW5kZW5jaWVzIEAgcGtnLmRldkRlcGVuZGVuY2llcyB8fCB7fVxuICBwa2cuYmFiZWwgPSBzZXR1cEJhYmVsUHJlc2V0cyBAIHBrZy5iYWJlbCB8fCB7fVxuICBwa2cuc2NyaXB0cyA9IHNldHVwU2NyaXB0cyBAIHBrZy5zY3JpcHRzIHx8IHt9XG4gIHJldHVybiBwa2dcblxuXG5mdW5jdGlvbiBzZXR1cERldkRlcGVuZGVuY2llcyhkZXZEZXBlbmRlbmNpZXMpIDo6XG4gIGRldkRlcGVuZGVuY2llc1snYmFiZWwtY2xpJ10gPSBiYWJlbF9wcmVzZXRfanN5X2pzb24uZGV2RGVwZW5kZW5jaWVzWydiYWJlbC1jbGknXVxuICBkZXZEZXBlbmRlbmNpZXNbJ2JhYmVsLXByZXNldC1qc3knXSA9IGBeJHtiYWJlbF9wcmVzZXRfanN5X2pzb24udmVyc2lvbn1gXG4gIGRldkRlcGVuZGVuY2llc1snbm9kZW1vbiddID0gJyonXG4gIHJldHVybiBkZXZEZXBlbmRlbmNpZXNcblxuXG5mdW5jdGlvbiBzZXR1cEJhYmVsUHJlc2V0cyhiYWJlbCkgOjpcbiAgaWYgISBiYWJlbC5wcmVzZXRzIDo6XG4gICAgYmFiZWwucHJlc2V0cyA9IFtdXG4gIGVsc2UgaWYgJ3N0cmluZycgPT09IGJhYmVsLnByZXNldHMgOjpcbiAgICBiYWJlbC5wcmVzZXRzID0gW2JhYmVsLnByZXNldHNdXG4gIFxuICBpZiAhIGJhYmVsLnByZXNldHMuZmluZCBAIGUgPT4gZT09J2pzeScgfHwgZVswXT09J2pzeScgOjpcbiAgICBiYWJlbC5wcmVzZXRzLnB1c2ggQCBqc3lfb3B0aW9ucyA/IFsnanN5JywganN5X29wdGlvbnNdIDogJ2pzeSdcblxuICByZXR1cm4gYmFiZWxcblxuZnVuY3Rpb24gc2V0dXBTY3JpcHRzKHNjcmlwdHMpIDo6XG4gIGlmICFzY3JpcHRzLnN0YXJ0IDo6XG4gICAgc2NyaXB0cy5zdGFydCA9ICdub2RlIGRpc3QnXG5cbiAgaWYgIXNjcmlwdHNbJ3N0YXJ0OmRldiddIDo6XG4gICAgc2NyaXB0c1snc3RhcnQ6ZGV2J10gPSAnbm9kZW1vbiAtZCAyIGRpc3QnXG5cbiAgaWYgIXNjcmlwdHMuYnVpbGQgOjpcbiAgICBzY3JpcHRzLmJ1aWxkID0gJ2JhYmVsIC1zIGlubGluZSAteCAuanMsLmpzeSBjb2RlIC1kIGRpc3QnXG5cbiAgaWYgIXNjcmlwdHMud2F0Y2ggOjpcbiAgICBzY3JpcHRzLndhdGNoID0gJ25wbSAtcyBydW4gYnVpbGQgLS0gLS13YXRjaCdcblxuICBpZiAhc2NyaXB0cy5wcmV0ZXN0IDo6XG4gICAgc2NyaXB0cy5wcmV0ZXN0ID0gJ25wbSAtcyBydW4gYnVpbGQnXG5cbiAgaWYgIXNjcmlwdHMudGVzdG9uZSA6OlxuICAgIHNjcmlwdHMudGVzdG9uZSA9ICdiYWJlbC1ub2RlIHRlc3QvZXhhbXBsZS5qc3knXG5cbiAgcmV0dXJuIHNjcmlwdHNcblxuIl19