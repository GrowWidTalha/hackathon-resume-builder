import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { fileURLToPath } from "url";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    entry: {
        main: "./src/ts/main.ts",
        template: "./src/ts/templates.ts",
        styles: "./src/css/style.css",
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"), // Output directory
    },
    resolve: {
        extensions: [".ts", ".js", ".css"],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(), // Cleans the output directory before each build
        new HtmlWebpackPlugin({
            template: "./index.html", // Your HTML file
        }),
        new MiniCssExtractPlugin({
            filename: "styles.css",
        }),
        new CopyWebpackPlugin({
            patterns: [{ from: "public", to: "" }],
        }),
    ],
    devServer: {
        static: [
            { directory: path.join(__dirname, "dist") },
            { directory: path.join(__dirname, "public") },
        ],
        open: true, // Opens the browser automatically
        hot: true, // Enables hot module replacement
    },
    mode: "development", // Set to 'production' for production builds
};
