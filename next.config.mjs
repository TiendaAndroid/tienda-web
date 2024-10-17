/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "png.pngtree.com"],
  },

  basePath: "/zazil/tienda-web", // Esto hace que la app esté en /zazil/tienda-web
  trailingSlash: true,
};

export default nextConfig;
