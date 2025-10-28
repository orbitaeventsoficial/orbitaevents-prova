import sharp from "sharp";

const src = "./public/img/brand/favicon.svg";

await sharp(src).resize(192, 192).toFile("./public/img/brand/favicon-192.png");
await sharp(src).resize(512, 512).toFile("./public/img/brand/favicon-512.png");
await sharp(src).resize(180, 180).toFile("./public/apple-touch-icon.png");

console.log("✅ Iconos generados correctamente.");
