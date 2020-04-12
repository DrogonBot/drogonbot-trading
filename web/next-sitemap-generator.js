const sitemap = require("nextjs-sitemap-generator");

console.log("generating sitemap xml files...");

sitemap({
  baseUrl: "https://empregourgente.com",
  ignoredPaths: ["admin"],
  pagesDirectory: __dirname + "/src/pages",
  targetDirectory: "public/",
  nextConfigPath: __dirname + "/next.config.js",
  ignoredExtensions: ["png", "jpg"],
  pagesConfig: {
    "/login": {
      priority: "0.5",
      changefreq: "daily"
    }
  }
});
