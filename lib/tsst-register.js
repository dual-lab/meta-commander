const {resolve, join} = require("path");
const root = resolve(__dirname, '..');

const tsst = require("@dual-lab/tsst");

if (tsst.toolchain().withTsconfig(join(root,  'src', 'tsconfig.test.json')).install() !== 0) {
  throw new Error("Failed installing typescript on the fly compiler");
}


