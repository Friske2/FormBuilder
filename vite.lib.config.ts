import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    dts({
      insertTypesEntry: true,
      outDir: "dist/types",
      tsconfigPath: "./tsconfig.app.json",
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "FormBuilder",
      fileName: (format) => `form-builder.${format}.js`,
      formats: ["es", "umd"],
    },
    rollupOptions: {
      // Externalize deps that shouldn't be bundled
      external: ["vue"],
      output: {
        // Global variables for UMD build
        globals: {
          vue: "Vue",
        },
        // Preserve module structure for better tree-shaking
        exports: "named",
      },
    },
    // Generate sourcemaps for debugging
    sourcemap: true,
    // Clear output directory before build
    emptyOutDir: true,
  },
});
