import Image from "next/image";
import Link from "next/link";

export default function SobreNosotros() {
  return (
    <div className="h-full min-h-screen ">
      {/* Hero Section */}
      <section className="bg-[#F3EFFC] text-white px-10 md:px-20  flex flex-col md:flex-row">
        <div className="container mx-auto text-[#160041] w-full md:w-1/2 py-14 md:py-40">
          <h1 className="text-4xl md:text-6xl font-bold">
            Una menstruación sostenible
          </h1>
          <p className="mt-4 text-lg">
          &quot;Juntos, iluminaremos el camino hacia una generación libre,
            informada y empoderada.&quot; ¡Libertad para Todas!
          </p>
          <Link
            href="/"
            className="mt-8 inline-block bg-[#D2C6FA] text-[#160041] font-semibold py-2 px-6 rounded-full transition hover:bg-indigo-800 hover:text-white"
          >
            Conoce Nuestros Productos
          </Link>
        </div>
        <div className=" w-full md:w-1/2">
          
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-16 bg-gradient-to-b from-[#F3EFFC] to-[#FEF7E7] flex flex-col-reverse md:flex-row md:px-20 px-10"
      >
        <div className="flex w-full md:w-1/2">
          <Image
            src={
              "https://res.cloudinary.com/dfpd4ucjw/image/upload/v1725594293/products/qk8uh1yrkhkf6eyh4dxj.jpg"
            }
            alt="Zazil"
            width={500}
            height={500}
          ></Image>
        </div>
        <div className="container mx-auto flex text-center md:text-right w-full md:w-1/2 items-center md:pb-0 pb-10">
          <div>
            <h2 className="md:text-5xl text-2xl font-bold text-[#160041]">
              ¿Quiénes Somos?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto md:text-xl text-lg text-[#160041]">
              Zazil es una marca comprometida con el bienestar de las mujeres y
              el cuidado del medio ambiente. Su misión es proporcionar
              soluciones innovadoras y sostenibles para el período menstrual.
              ¿Cómo lo hacen? A través de la creación de toallas femeninas
              reutilizables.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="productos" className="py-16 bg-[#FEF7E7] md:px-20 px-10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#160041]">
            Nuestros Productos
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Nuestras toallas femeninas reutilizables están diseñadas para
            ofrecer comodidad y sostenibilidad.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Product 1 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-[#160041]">
                Toallas Reutilizables
              </h3>
              <p className="mt-2 text-gray-600">
                Nuestras toallas reutilizables eliminan el desperdicio asociado
                con las opciones de un solo uso, disminuyendo la cantidad de
                productos menstruales que terminan en vertederos.
              </p>
              <Image className="mt-5"
                src={
                  "https://res.cloudinary.com/dfpd4ucjw/image/upload/v1726773979/products/ogd0mot3olqea9au3bgl.png"
                }
                    alt="Toallas Reutilizables"
                    width={500}
                    height={500}
              />
            </div>

            {/* Product 2 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-[#160041]">
                Impacto Económico
              </h3>
              <p className="mt-2 text-gray-600">
                Al invertir en Zazil, estás invirtiendo en un producto que dura.
                Olvídate de compras mensuales; nuestras toallas son una
                inversión que ahorra dinero con el tiempo
              </p>
              <Image className="mt-5"
                src={
                  "https://res.cloudinary.com/dfpd4ucjw/image/upload/v1726774100/products/tw0folmeyn8s8mn75g39.png"
                }
                    alt="Toallas Reutilizables"
                    width={500}
                    height={500}
              />
            </div>

            {/* Product 3 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-[#160041]">
                Oportunidades de Emprendimiento
              </h3>
              <p className="mt-2 text-gray-600">
                Zazil apoya programas que proporcionan oportunidades de
                emprendimiento para mujeres locales, contribuyendo así al
                empoderamiento económico en comunidades de todo el mundo.
              </p>
              <Image className="mt-5"
                src={
                  "https://res.cloudinary.com/dfpd4ucjw/image/upload/v1726774253/products/fqtbohcidm4qcteb3n6i.png"
                }
                    alt="Toallas Reutilizables"
                    width={500}
                    height={500}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-[#160041] text-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold">Únete a Nuestra Misión</h2>
          <p className="mt-4 text-lg">
            Cada apoyo, voz y esfuerzo cuentan. ¡Juntos, brillamos más fuerte!
          </p>
          <a
            href="#contacto"
            className="mt-8 inline-block bg-white text-[#160041] font-semibold py-2 px-6 rounded-full transition hover:bg-indigo-500 hover:text-white"
          >
            Contáctanos
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#160041]">Contacto</h2>
          <p className="mt-4 text-gray-600">
            ¿Tienes alguna pregunta? ¡Nos encantaría saber de ti!
          </p>

          <div className="mt-8">
            <p className="text-gray-600">Teléfono: +52 56 2808 3883</p>
            <p className="text-gray-600">
              Email: contacto@fundaciontodasbrillamos.org
            </p>

            <div className="mt-6">
              <a
                href="https://www.facebook.com/Toallas.Zazil"
                className="text-indigo-600 hover:underline mx-2"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com/toallas.zazil"
                className="text-indigo-600 hover:underline mx-2"
              >
                Instagram
              </a>
              <a
                href="https://www.tiktok.com/@todas.brillamos"
                className="text-indigo-600 hover:underline mx-2"
              >
                TikTok
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            &copy; 2024 Zazil - Menstruación Sostenible. Todos los derechos
            reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
