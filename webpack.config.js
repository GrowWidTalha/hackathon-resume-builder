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
        landingStyles: "./src/css/landingpage.css",
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
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
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./index.html",
            chunks: ["main", "styles"],
        }),
        new HtmlWebpackPlugin({
            template: "./src/resume.html",
            filename: "resume.html",
            chunks: ["template", "styles"],
        }),
        new HtmlWebpackPlugin({
            template: "./src/generate.html",
            filename: "generate.html",
            chunks: ["main", "styles"],
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
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
        open: true,
        hot: true,
    },
    mode: "development",
};
