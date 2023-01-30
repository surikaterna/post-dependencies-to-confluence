function humanFileSize(size) {
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return `${(size / Math.pow(1024, i)).toFixed(2) * 1} ${['B', 'kB', 'MB', 'GB', 'TB'][i]}`;
}

const onBuilt = (error, result) => {
  if (error) {
    console.log('---- Build failed ----');
    console.log(error.message);
  } else {
    console.log('---- Build complete ----');

    Object.keys(result.metafile.outputs).forEach((path) => {
      console.log(`${path}: ${humanFileSize(result.metafile.outputs[path].bytes)}`);
    });
  }
};

const getWatchConfig = () => {
  if (process.argv[2] === '--watch') {
    return {
      onRebuild(error, result) {
        onBuilt(error, result);
      }
    };
  }
  return false;
};

require('esbuild')
  .build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    minify: false,
    platform: 'node',
    metafile: true,
    target: 'node16',
    external: ['mongodb-client-encryption'],
    outfile: './lib/index.js',
    watch: getWatchConfig()
  })
  .then((result) => {
    onBuilt(null, result);
  });
