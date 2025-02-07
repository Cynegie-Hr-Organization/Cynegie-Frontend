import { Compiler, Stats } from 'webpack';

export interface ReporterOptions {
  clearConsole?: boolean;
  showAssets?: boolean;
}

export class CustomStatsReporter {
  private options: ReporterOptions;

  constructor(options: ReporterOptions = {}) {
    this.options = {
      clearConsole: true,
      showAssets: true,
      ...options
    };
  }

  apply(compiler: Compiler): void {
    compiler.hooks.done.tap('CustomStatsReporter', (stats: Stats) => {
      const { startTime, endTime } = stats;
      const buildTime = endTime - startTime;

      if (this.options.clearConsole) {
        console.clear();
      }

      console.log('\n🚀 Build completed!');
      console.log(`⏱️  Build time: ${buildTime}ms`);

      if (this.options.showAssets) {
        console.log(`📦 Total assets: ${stats.compilation.assets.size}`);
      }

      if (stats.hasErrors()) {
        console.log('\n❌ Build errors:');
        stats.compilation.errors.forEach((error: { message: any; }) => {
          console.log(`  - ${error.message}`);
        });
      }
    });
  }
}