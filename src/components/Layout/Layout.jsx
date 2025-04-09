import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";

const Layout = ({
  children,
  title = "Nainika Couture - Shop Now",
  description = "Where Tradition Meets Modern Elegance At Nainika Couture, we blend the timeless beauty of Indian ethnic wear with contemporary fashion to create stunning ensembles for the modern woman. Our collection features exquisite Indo-Western outfits, elegant suits, regal sarees, breathtaking lehengas, and more, designed to celebrate femininity with grace and sophistication. Every piece is crafted with intricate embroidery, luxurious fabrics, and a touch of tradition, ensuring that you make a statement at every occasion. Whether it's a festive celebration, a wedding, or a formal gathering, Nainika Couture brings you styles that exude charm, confidence, and culture. Step into a world where heritage meets haute couture—because elegance is timeless. ✨",
  keywords = "Indo-Western clothing, Ethnic wear for women, Designer suits, Bridal lehengas, Wedding sarees, Luxury couture, Party wear dresses, Festive ethnic wear, Traditional Indian clothing, Designer Indo-Western, Indian fashion brand, Ethnic fusion wear, Handcrafted embroidery, Elegant sarees, Women’s ethnic fashion, Designer lehengas, Modern ethnic wear, Wedding outfits for women, Festive collection, High-end fashion, Best Indo-Western outfits for weddings, Where to buy designer sarees online, Trendy lehenga designs for brides, Latest ethnic wear collection for women, Custom-made traditional outfits, Luxury fashion for Indian weddings, Ethnic wear with modern touch, Stylish Indo-Western fusion dresses, Handmade designer lehengas, Bridal couture collection, Nainika Couture, Nainika ethnic collection, Nainika Indo-Western dresses, Nainika bridal fashion",
  author = "John Doe",
}) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <HelmetProvider>
      <div>
        <Helmet key={title}>
          <meta charSet="utf-8" />
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
          <title>{title}</title>
        </Helmet>
        <Header></Header>
        <main style={{ minHeight: "80vh" }}>
          <Toaster />
          {children}
        </main>
        <Footer></Footer>
      </div>
    </HelmetProvider>
  );
};

export default Layout;
